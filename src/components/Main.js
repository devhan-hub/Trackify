import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Myday from "./Myday.js";
import Planned from "./Planned";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosByGroup, fetchUserTask } from "../Redux/TasksAddSlice.jsx";
import SignLogin from "./Login/SignLogin.jsx";

import Sidebar from './Sidebar.js';

 
const Main = ({userId}) => {
  const dispatch = useDispatch();
  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);
  const allTaskStatus = useSelector(state => state.toDo.allTaskStatus);
  const groupId = useSelector(state => state.toDo.selectedGroupId);
  const todos = useSelector(state => state.toDo.tasksByGroup[groupId]);
  const allTask = useSelector(state => state.toDo.allTask);


  useEffect(() => {

    if(userId) {
       if (todosByGroupStatus[groupId] === "idle") {
        dispatch(fetchTodosByGroup({ userId, groupId }));
      }
      if (allTaskStatus === "idle") {
        dispatch(fetchUserTask(userId));
      }
    }
  
  }, [userId, groupId, todosByGroupStatus, allTaskStatus, dispatch]);

 if(userId) { 
  return (
     <div className='h-screen flex '>
      <Sidebar userId={userId}/>
      <div className="flex-1">
      {allTask && (groupId === '3planned' && (<Planned todos={allTask}/>))}
      {allTask && (<Myday todos={allTask} />)}
       {todos && <Myday todos={todos} />}
    </div>
    </div>
  );
}
};

export default Main;
