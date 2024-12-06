import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchTodosByGroup, addTodo, updateTodo, deleteTodo } from "../Redux/TasksAddSlice";

const useTaskManager = (userId ,groupId) => {
  const dispatch = useDispatch();
  const groupStatus = useSelector((state) => state.toDo.groupStatus)
  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);
  const tasksInGroup=useSelector(state=>state.toDo.tasksByGroup[groupId])

  const fetch = useCallback(() => {
    console.log(userId, 'userId' ,groupId,'groupId')

    if (todosByGroupStatus[groupId] === "idle") {
      dispatch(fetchTodosByGroup({userId, groupId}))
    }

  }, [dispatch, userId , todosByGroupStatus])


  const add = useCallback(async ( todo) => {
    try {
      await dispatch(addTodo({ userId, groupId, todo }));
      return true;
    }
    catch (error) {
      return false;
    }
  }, [dispatch, userId])


  const edit = useCallback(async (todoId, updatedTodo) => {
    try {
      await dispatch(updateTodo({ userId, groupId, updatedTodo, todoId }))
      return true
    } catch (error) {
      return false
    }
  }, [dispatch, userId])

  const deleteTodoById = useCallback(async ( todoId) => {

    try {
      await dispatch(deleteTodo({ userId,  todoId }))
      return true
    }
    catch (error) {
      return false
    }

  }, [userId, dispatch])



  useEffect(() => {

      fetch();
 
  }, [groupId, fetch])



  return { tasksInGroup, add, edit, fetch, deleteTodoById }
}

export default useTaskManager
