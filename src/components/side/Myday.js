import React, { useState , useEffect } from 'react';
import TodoDisplay from '../input-display/TodoDisplay.js';
import Typography from '@mui/material/Typography';
import InputToDo from '../input-display/InputToDo.jsx';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addTask , removeTask , toggelCompleted, toggelImportant} from '../feature/TasksAddSlice.tsx'
const Myday = () => {
  const [displayedCompleted , setDisplayCompleted]= useState([])
  const [displayedInCompleted , setDisplayInCompleted]= useState([])


   const tasks = useSelector(state=> state.toDo.tasks)
   
   const typeCategory= useSelector(state=>state.catagory.type)
   useEffect(() => {
    switch (typeCategory) {
      case 'myday':
        const completedTaskMyDay = tasks.filter(task => task.completed === true && task.dueDate === 'today' );
        const incompletTaskMyDay = tasks.filter(task => task.completed === false && task.dueDate === 'today' );
        setDisplayCompleted(completedTaskMyDay);
        setDisplayInCompleted(incompletTaskMyDay);
        break;
      case 'important':
        const importantTask = tasks.filter(task => task.important && !task.completed);
        setDisplayCompleted([]);
        setDisplayInCompleted(importantTask);
        break;
      default:
        const completedTask = tasks.filter(task =>  task.completed === true && task.catagory ===typeCategory);
        const incompletTask = tasks.filter(task => task.completed === false && task.catagory ===typeCategory);
        setDisplayCompleted(completedTask);
        setDisplayInCompleted(incompletTask)
    }
  }, [typeCategory, tasks]);


  return (
    <div className="space-y-6 p-6 py-10 mb-44">
      <div className="title space-y-3">
        <Typography variant="h3" className='capitalize'>{typeCategory}</Typography>
        <Typography variant="h5">
          <span>Saturday</span> <span>November 12</span>
        </Typography>
      </div>
      <div>

        <div className="space-y-12">

          <div className="space-y-6">
            {
             displayedInCompleted.length > 0 && <TodoDisplay  tasks={displayedInCompleted} />        
            }
          </div>
          {displayedCompleted.length > 0 &&
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Completed
              </AccordionSummary>
              <AccordionDetails>              
                  <TodoDisplay  tasks={displayedCompleted} />         
              </AccordionDetails>
            </Accordion>
          }
        </div>
      </div>
      <div className='fixed bottom-0 w-full z-50  py-6 bg-white' >
        <InputToDo />
      </div>
    </div>
  );
};

export default Myday;
