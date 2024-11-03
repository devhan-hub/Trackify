import React from 'react';
import TodoDisplay from '../main/TodoDisplay';
import Typography from '@mui/material/Typography';
import InputToDo from '../main/InputToDo';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListAltOutlined } from "@mui/icons-material"
import { useSelector , useDispatch } from 'react-redux';
import {addTask , removeTask , toggelCompleted, toggelImportant} from '../slice/TasksAdd.tsx'

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

const Myday = () => {
 const tasks = useSelector(state=> state.toDo.tasks)
 const dispach= useDispatch();
  const todayTask = tasks?.filter((task) => task.day === 'today')
  const tomorrowTask = tasks?.filter((task) => task.day === 'tommorow')
  const yesterdaytask = tasks?.filter((task) => task.day === 'yesterday')

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
      <div>
        <InputToDo />
      </div>
    </div>
  );
};

export default Myday;
