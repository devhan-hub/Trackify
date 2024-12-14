import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { todayTask } from '../Redux/TasksAddSlice';
import { Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusBar = () => {
  const todaytask = useSelector(todayTask)
  const completedTask = todaytask.filter((task) => task.completed === true).length;
  const totalTask = todaytask.length
  const incompletTask = totalTask - completedTask;


  const data = {
    labels: ['Completed Tasks', 'Incomplete Tasks'],
    datasets: [
      {
        data: [completedTask, incompletTask],
        backgroundColor: [
          '#2196f3',
          'rgba(255, 0, 0, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper elevation={3} className=' p-3'>

      <h2>Task Completion Status</h2>

      <div style={{ width: '300px', height: '300px' }}>

        <Pie data={data} />

      </div>
    </Paper>
  );
};

export default StatusBar;