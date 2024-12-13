import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../Utiles/firebaseConfig'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, query ,where } from 'firebase/firestore'




export const fetchUserTask = createAsyncThunk('task/fetchUserTask', async ({userId}) => {
  const userTaskCol = collection(db, `users/${userId}/userTask`);
  const usertaskSnapshot = await getDocs(userTaskCol);

const allTask= usertaskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
console.log(allTask , 'fetachhhhh')
return allTask
})

export const addUserTask = createAsyncThunk('task/addUserTask', async ({ userId, todo, id }) => {
  const userTaskDocRef = doc(db, `users/${userId}/userTask`, id);
  await setDoc(userTaskDocRef, todo)
  return { id, ...todo }
})

export const deleteInAlltask = createAsyncThunk('task/deleteInAlltask', async ({ userId, todoId }) => {
  const todoRef = doc(db, `users/${userId}/userTask`, todoId);
  await deleteDoc(todoRef);
  return todoId;
})

export const deleteGroupTask = createAsyncThunk('task/deleteGroupTask', async ({ userId, groupId }) => {
  const todoRef = collection(db, `users/${userId}/userTask`);
  const q= query(todoRef , where('catagory' ,'==' ,groupId))
  const snapShot=await getDocs(q)
  if(snapShot.empty){
    return;
  }
  const deletePromises = snapShot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);

  return groupId;
})
export const updateAllTask = createAsyncThunk('task/updateAllTask', async ({ userId, todoId, updatedTodo }) => {
  const todoRef = doc(db, `users/${userId}/userTask`, todoId);
  await updateDoc(todoRef, updatedTodo);
  return { todoId, updatedTodo };
})



export const fetchGroups = createAsyncThunk('task/fetchGroup', async (userId) => {
  const groupCol = collection(db, `users/${userId}/groups`)
  const groupSnapshot = await getDocs(groupCol)
  return groupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
})

export const addGroup = createAsyncThunk('task/addgroup', async ({ userId, group }) => {
  const groupcol = collection(db, `users/${userId}/groups`)
  const groupRef = await addDoc(groupcol, group);
  return { id: groupRef.id, ...group }
})
export const editGroup= createAsyncThunk('task/editGroup', async ({userId, groupId , updated}) => {
  const groupDoc = doc(db, `users/${userId}/groups` , groupId)
  await updateDoc( groupDoc,updated);
  return updated;
})

export const deleteGroup= createAsyncThunk('task/deleteGroup', async ({userId, groupId } ,{dispatch}) => {
  console.log(groupId,'delete')
  const groupDoc = doc(db, `users/${userId}/groups/${groupId}`)
  await deleteDoc(groupDoc);
  await dispatch(deleteGroupTask({userId,groupId}))
  return groupId;
})



export const fetchTodosByGroup = createAsyncThunk('task/fetchTodosByGroup', async ({ userId, groupId }) => {
  const todosCol = collection(db, `users/${userId}/groups/${groupId}/todos`);
  const todosSnapshot = await getDocs(todosCol);
  
  const todos = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(todos,'whatmalet')
  return { groupId, todos };
})

export const addTodo = createAsyncThunk('task/addTodo', async ({ userId, groupId, todo }, { dispatch }) => {
  const todosCol = collection(db, `users/${userId}/groups/${groupId}/todos`);
  const docRef = await addDoc(todosCol, todo);
  await dispatch(addUserTask({ userId, todo, id: docRef.id }));
  return { groupId, id: docRef.id, ...todo}
})

export const deleteTodo = createAsyncThunk('task/deleteTodo', async ({ userId, todoId, groupId } ,{dispatch}) => {
  const todoRef = doc(db, `users/${userId}/groups/${groupId}/todos`, todoId);
  await deleteDoc(todoRef);
 await dispatch(deleteInAlltask({userId , todoId}))
  return { todoId, groupId };
})

export const updateTodo = createAsyncThunk('task/updateTodo', async ({ userId, todoId, updatedTodo, groupId } ,{dispatch}) => {
  const todoRef = doc(db, `users/${userId}/groups/${groupId}/todos`, todoId);
  await updateDoc(todoRef, updatedTodo);
  await dispatch(updateAllTask({userId , todoId,updatedTodo}))
  return { todoId, updatedTodo, groupId };
})



const initialState = {
  groups: [],
  tasksByGroup: {},
  allTask: [],
  selectedGroupId: '4task',
  groupStatus: 'idle',
  allTaskStatus: 'idle',
  todosByGroupStatus: {},
  error: null,
  todoStatus:'idle',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setSelectedGroup(state, action) {
      state.selectedGroupId = action.payload;
    },
    reset( ) {
       return initialState
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.groupStatus = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupStatus = 'succeeded';
        state.groups = action.payload;

        action.payload.forEach(group => {
          if (!state.todosByGroupStatus[group.id]) {
            state.todosByGroupStatus[group.id] = 'idle';
          }
        });
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.groupStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch groups';
      })


      .addCase(fetchTodosByGroup.pending, (state, action) => {
        state.todosByGroupStatus[action.meta.arg.groupId] = 'loading'
      })
      .addCase(fetchTodosByGroup.fulfilled, (state, action) => {
        const { groupId, todos } = action.payload
        state.todosByGroupStatus[groupId] = 'succeeded'
        state.tasksByGroup[groupId] = todos;
      })
      .addCase(fetchTodosByGroup.rejected, (state, action) => {
        state.todosByGroupStatus[action.meta.arg.groupId] = 'failed'
        state.error = action.error.message || 'something unexpected happen'
      })


      .addCase(fetchUserTask.pending, (state) => {
        state.allTaskStatus = 'loading'
      })
      .addCase(fetchUserTask.fulfilled, (state, action) => {
        state.allTaskStatus = 'succeeded'
        state.allTask = action.payload
      })

      .addCase(fetchUserTask.rejected, (state) => {
        state.allTaskStatus = 'failed'
      })


      .addCase(addTodo.pending, (state) => {
        state.todoStatus = 'loading'
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const { groupId, id, ...todo } = action.payload
        if (!state.tasksByGroup[groupId]) {
          state.tasksByGroup[groupId] = [];
        }
        state.tasksByGroup[groupId].push({ id, ...todo })
        state.todoStatus='succeeded'

      })
      .addCase(addTodo.rejected, (state) => {
        state.todoStatus = 'failed'
      })


      .addCase(deleteTodo.pending, (state) => {
        state.todoStatus = 'loading'
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { groupId, todoId } = action.payload;
        if (state.tasksByGroup[groupId]) {
          state.tasksByGroup[groupId] = state.tasksByGroup[groupId].filter(todo => todo.id !== todoId);
          state.allTask = state.allTask.filter(allTodo => todoId !== allTodo.id)
        }
        state.todoStatus='succeeded'
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.todoStatus = 'failed'
      })
      .addCase(updateTodo.pending, (state) => {
        state.todoStatus = 'loading'
      })

      .addCase(updateTodo.fulfilled, (state, action) => {

        const { groupId, todoId, updatedTodo } = action.payload
        if (state.tasksByGroup[groupId]) {
          let index = state.tasksByGroup[groupId].findIndex(todo => todo.id === todoId)
          if (index !== -1) {
            state.tasksByGroup[groupId][index] = { ...state.tasksByGroup[groupId][index], ...updatedTodo }
          }
        }
         state.todoStatus = 'succeeded'
      })

      .addCase(updateTodo.rejected, (state) => {
        state.todoStatus = 'failed'
      })

      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(editGroup.fulfilled, (state, action) => {
         const index= state.groups.findIndex((group) => group.id === action.payload.id)
        state.groups[index]=action.payload;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups= state.groups.filter((group) => group.id !== action.payload)
   
     })


      .addCase(addUserTask.fulfilled, (state, action) => {
        state.allTask.push(action.payload)
      })
      .addCase(updateAllTask.fulfilled, (state, action) => {
        const { todoId, update } = action.payload

        let index = state.allTask.findIndex(todo => todo.id === todoId)
        if (index !== -1) {
          state.allTask[index] = { ...state.allTask[index], ...update }
        }
      })
       .addCase(deleteInAlltask.fulfilled, (state, action) => {
        state.allTask= state.allTask.filter((task) => task.id !== action.payload)
   
     })
     .addCase(deleteGroupTask.fulfilled, (state, action) => {
      state.allTask= state.allTask.filter((task) => task.catagory !== action.payload)
 
   })


  }
});

export const { setSelectedGroup , reset } = taskSlice.actions
export const selectGroup = state => (state.toDo.groups)
export const todayTask= (state)=>{
  return  state.toDo.allTask.filter((task)=>{
      const today = new Date();
      const taskDueDate = task.dueDate.toDate();
      return(
        taskDueDate.toDateString() === today.toDateString() 
      )
      
    })
}
export const vitalTask = (state) => {
  return state.toDo.allTask.filter((task) => {
    const today = new Date();
    const taskDueDate = task.dueDate.toDate();
    return (
      taskDueDate.toDateString() === today.toDateString() && 
      task.priority === 'extreme'
    );
  });
};


export default taskSlice.reducer;