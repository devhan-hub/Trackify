import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchTodosByGroup, addTodo, updateTodo, deleteTodo } from "../Redux/TasksAddSlice";

const useTaskManager = (userId ,groupId) => {
  const dispatch = useDispatch();
  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);
  const tasksInGroup=useSelector(state=>state.toDo.tasksByGroup[groupId])

  const fetch = useCallback(() => {
    if (todosByGroupStatus[groupId] === "idle") {
      dispatch(fetchTodosByGroup({userId, groupId})).unwrap()
    }

  }, [dispatch, userId , todosByGroupStatus])


  const add = useCallback(async ( todo) => {
    try {
      await dispatch(addTodo({ userId, groupId, todo })).unwrap();
      return true;
    }
    catch (error) {
      return false;
    }
  }, [dispatch, userId , groupId])


  const edit = useCallback(async (todoId, updatedTodo) => {
    try {
      await dispatch(updateTodo({ userId, groupId, updatedTodo, todoId })).unwrap()
      return true
    } catch (error) {
      return false
    }
  }, [dispatch, userId , groupId])

  const deleteTodoById = useCallback(async ( todoId ) => {

    try {
      await dispatch(deleteTodo({ userId,  todoId ,groupId })).unwrap()
      return true
    }
    catch (error) {
      return false
    }

  }, [userId, dispatch , groupId])



  useEffect(() => {
      fetch();
  }, [groupId, fetch])



  return { tasksInGroup, add, edit, fetch, deleteTodoById }
}

export default useTaskManager
