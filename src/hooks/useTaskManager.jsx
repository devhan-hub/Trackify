import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { fetchTodosByGroup, addTodo, updateTodo, deleteTodo } from "../Redux/TasksAddSlice";


const useTaskManager = (userId ) => {
  const dispatch = useDispatch();
  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);

  const fetch = useCallback((groupId) => {
    if (todosByGroupStatus[groupId] === "idle") {
      dispatch(fetchTodosByGroup({userId, groupId})).unwrap()
    }

  }, [dispatch, userId , todosByGroupStatus])


  const add = useCallback(async ( todo ,groupId) => {
    try {
      await dispatch(addTodo({ userId, groupId, todo })).unwrap();
      return true;
    }
    catch (error) {
      return false;
    }
  }, [dispatch, userId ])


  const edit = useCallback(async (todoId, update ,groupId) => {
    try {
      await dispatch(updateTodo({ userId, groupId,updatedTodo: update, todoId })).unwrap()
      return true
    } catch (error) {
      return false
    }
  }, [dispatch, userId ])

  const deleteTodoById = useCallback(async ( todoId ,groupId ) => {

    try {
      await dispatch(deleteTodo({ userId,  todoId ,groupId })).unwrap()
      return true
    }
    catch (error) {
      return false
    }

  }, [userId, dispatch ])




  return { add, edit, fetch, deleteTodoById }
}

export default useTaskManager
