import React from 'react';
import TodoDisplay from '../main/TodoDisplay';
import Typography from '@mui/material/Typography';
import InputToDo from '../main/InputToDo';

const Myday = () => {
  const tasks = [
    { title: 'do this', catagory: 'tasks', day: 'today', complet: false },
    { title: 'do that', catagory: 'tasks', day: 'today', complet: false },
    { title: 'do this that', catagory: 'tasks', day: 'tomorrow', complet: false },
    { title: 'do after this', catagory: 'tasks', day: 'next day', complet: true },
    { title: 'who do this', catagory: 'tasks', day: 'yesterday', complet: true }
  ];

  return (
    <div className="space-y-6 p-6 pt-10">
      <div className="title space-y-3">
        <Typography variant="h3">My Day</Typography>
        <Typography variant="h5">
          <span>Saturday</span> <span>November 12</span>
        </Typography>
      </div>
      <div>
        <TodoDisplay tasks={tasks} />
      </div>
      <div>
        <InputToDo />
      </div>
    </div>
  );
};

export default Myday;
