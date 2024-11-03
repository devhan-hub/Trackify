import React, { useState , useEffect } from 'react';
import TodoDisplay from '../main/TodoDisplay';
import Typography from '@mui/material/Typography';
import InputToDo from '../main/InputToDo';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addTask , removeTask , toggelCompleted, toggelImportant} from '../slice/TasksAdd.tsx'

const Myday = () => {
  const [displayedCompleted , setDisplayCompleted]= useState([])
  const [displayedInCompleted , setDisplayInCompleted]= useState([])

   const tasks = useSelector(state=> state.toDo.tasks)
   const typeCategory= useSelector(state=>state.typeCatagory.type)
 
   useEffect(() => {
    const completedTaskMyDay = tasks.filter(task => task.completed === true && task.day === 'today');
    const incompletTaskMyDay = tasks.filter(task => task.completed === false && task.day === 'today');
    const completedTask = tasks.filter(task =>  task.completed === true);
    const incompletTask = tasks.filter(task => task.completed === false);
    const importantTask = tasks.filter(task => task.important && !task.completed);

    switch (typeCategory) {
      case 'myday':
        setDisplayCompleted(completedTaskMyDay);
        setDisplayInCompleted(incompletTaskMyDay);
        break;
      case 'taskes':
        setDisplayCompleted(completedTask);
        setDisplayInCompleted(incompletTask);
        break;
      case 'important':
        setDisplayCompleted([]);
        setDisplayInCompleted(importantTask);
        break;
      default:
        setDisplayCompleted([]);
        setDisplayInCompleted([]);
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
            <Accordion >
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
