import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import TodoDisplay from './display/TodoDisplay';
import { format } from 'date-fns';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Planned() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  
  const earlier = useSelector((state) => {
      return state.toDo.allTask.filter((task) => {
          const today = new Date();
          const taskDueDate = task.dueDate.toDate();
          return (
              taskDueDate < today 
          );
      });
  });
  
 
  const yesterday = useSelector((state) => {
      return state.toDo.allTask.filter((task) => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1); 
          const taskDueDate = task.dueDate.toDate();
          return (
              taskDueDate.toDateString() === yesterday.toDateString()
          );
      });
  });
  

  const today = useSelector((state) => {
      return state.toDo.allTask.filter((task) => {
          const today = new Date();
          const taskDueDate = task.dueDate.toDate();
          return (
              taskDueDate.toDateString() === today.toDateString() 
          );
      });
  });
  
  const tomorrow = useSelector((state) => {
      return state.toDo.allTask.filter((task) => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const taskDueDate = task.dueDate.toDate();
          return (
              taskDueDate.toDateString() === tomorrow.toDateString() 
            
          );
      });
  });
  const TodayDate = () => {
    const today = format(new Date(), 'd MMM');
    return <div>{today}<span >.Today</span></div>;
  };

  return (
    <div>
      <div className=' pb-10 pt-2'>
       <div className='flex items-center gap-2'> <img src="/Images/home.png" alt="" className='size-8' /> <span className="text-[#2196f3] capitalize text-xl font-Monsta font-bold">Planned</span></div>
       <div>{TodayDate()} </div>
       </div> 
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Eariler</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='space-y-3'>
          {
          
            earlier.map((task)=>(
              <TodoDisplay todo={task}/>
            ))
            
          }
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Yesterday</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='space-y-3'>
       {
            yesterday.map((task)=>(
              <TodoDisplay todo={task}/>
            ))
          }
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Today</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='space-y-3'>
       {
            today.map((task)=>(
              <TodoDisplay todo={task}/>
            ))
          }
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Tomorrow</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='space-y-3'>
       {
            tomorrow.map((task)=>(
              <TodoDisplay todo={task}/>
            ))
          }
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
