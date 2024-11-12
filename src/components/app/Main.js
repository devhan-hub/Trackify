import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Myday from "../side/Myday";
import Planned from "../side/Planned";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosByGroup, fetchUserTask } from "../feature/TasksAddSlice";

const Main = ({ userId }) => {
  const dispatch = useDispatch();

  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);
  const allTaskStatus = useSelector(state => state.toDo.allTaskStatus);
  const groupId = useSelector(state => state.toDo.selectedGroupId);
  const todos = useSelector(state => state.toDo.tasksByGroup[groupId]);
  const allTask = useSelector(state => state.toDo.allTask);

  useEffect(() => {
    if (todosByGroupStatus[groupId] === "idle") {
      dispatch(fetchTodosByGroup({ userId: 1, groupId }));
    }
    if (allTaskStatus === "idle") {
      dispatch(fetchUserTask(userId));
    }
  }, [userId, groupId, todosByGroupStatus, allTaskStatus, dispatch]);

  return (
    <div className="flex-1">
      <Routes>
        <Route path="/todo/1myday" element={<Myday todos={allTask} />} />
        <Route path="/todo/2important" element={<Myday todos={allTask} />} />
        <Route path="/todo/3planned" element={<Planned todos={allTask} />} />
        <Route path="/todo/:category" element={<Myday todos={todos} />} />
      </Routes>
    </div>
  );
};

export default Main;
