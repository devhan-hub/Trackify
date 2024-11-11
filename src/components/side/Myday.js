import React, { useState, useEffect } from 'react';
import TodoDisplay from '../input-display/TodoDisplay.js';
import Typography from '@mui/material/Typography';
import InputToDo from '../input-display/InputToDo.jsx';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';

const Myday = ({ todos }) => {
  const groups = useSelector(state => state.toDo.groups)
  const typeCategory = useSelector(state => state.toDo.selectedGroupId);
  const [displayedCompleted, setDisplayCompleted] = useState([]); // Ensure it's initialized as an array
  const [displayedInCompleted, setDisplayInCompleted] = useState([]); // Ensure it's initialized as an array
  const [groupName , setGroupName] = useState('')

  useEffect(() => {
    if (!todos )  return;
  console.log(todos)
     // If todos is undefined, don't run the filtering logic
    switch (typeCategory) {
      case '1myday':
        const completedTaskMyDay = todos.filter(task => task.completed === true && task.dueDate === 'today');
        const incompletTaskMyDay = todos.filter(task => task.completed === false && task.dueDate === 'today');
        setDisplayCompleted(completedTaskMyDay);
        setDisplayInCompleted(incompletTaskMyDay);
        setGroupName('myday')
        break;
      case '2important':
        const importantTask = todos.filter(task => task.important && !task.completed);
        setDisplayCompleted([]);
        setDisplayInCompleted(importantTask);
        setGroupName('important')
        break;
      default:
        const completedTask = todos.filter(task => task.completed === true);
        const incompletTask = todos.filter(task => task.completed === false);
        setDisplayCompleted(completedTask);
        setDisplayInCompleted(incompletTask);
        setGroupName(groups.find(group=> group.id === typeCategory).name)

    }
  }, [typeCategory, todos]); // Ensure the effect re-runs when typeCategory or todos changes

  return (
    <div className="space-y-6 p-6 py-10 mb-44">
      <div className="title space-y-3">
        <Typography variant="h3" className="capitalize">{groupName}</Typography>
        <Typography variant="h5">
          <span>Saturday</span> <span>November 12</span>
        </Typography>
      </div>
      <div>
        <div className="space-y-12">
          <div className="space-y-6">
            {displayedInCompleted.length > 0 && <TodoDisplay tasks={displayedInCompleted} />}
          </div>
          {displayedCompleted.length > 0 && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Completed
              </AccordionSummary>
              <AccordionDetails>
                <TodoDisplay tasks={displayedCompleted} />
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 w-full z-50 py-6 bg-white">
        <InputToDo />
      </div>
    </div>
  );
};

export default Myday;
