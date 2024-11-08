import React from 'react';
import TodoDisplay from '../input-display/TodoDisplay.js';
import Typography from '@mui/material/Typography';
import InputToDo from '../input-display/InputToDo.jsx';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListAltOutlined } from "@mui/icons-material"
import { useSelector , useDispatch } from 'react-redux';
import {addTask , removeTask , toggelCompleted, toggelImportant} from '../feature/TasksAddSlice.tsx'

const AccordianList =({day , tasks})=> {
    return ( 
    <Accordion >
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      {day}
    </AccordionSummary>
    <AccordionDetails>
        <TodoDisplay  tasks={tasks} />   
    </AccordionDetails>
  </Accordion>
  )
}

const Planned = () => {
  const tasks = useSelector(state=> state.toDo.tasks)
  console.log(tasks)

 const dispach= useDispatch();
  const todayTask = tasks?.filter((task) => task.dueDate === 'today')
  const tomorrowTask = tasks?.filter((task) => task.dueDate === 'tomorrow')
  const yesterdaytask = tasks?.filter((task) => task.dueDate === 'next-week')
console.log(todayTask)
  return (
    <div className="space-y-6 p-6 pt-10">
      <div className="title space-y-3">
        <Typography variant="h3"><span><ListAltOutlined/></span> Planned</Typography>
        <Typography variant="h5">
          <span>Saturday</span> <span>November 12</span>
          
        </Typography>
      </div>
      <div>

        <div className="space-y-12">
          {todayTask.length > 0 &&
        
            <AccordianList day={'today'} tasks={todayTask}/>
           
          }
          {tomorrowTask.length > 0 &&
        
            <AccordianList  day={'tomorrow'} tasks={tomorrowTask}/>
              
          }
           {yesterdaytask.length > 0 &&
            <AccordianList day={'yesterday'} tasks={yesterdaytask}/>     
          } 
        </div>
      </div>
      <div className='fixed bottom-0 w-full z-50  py-6 bg-white' >
        <InputToDo />
      </div>
    </div>
  );
};

export default Planned;
