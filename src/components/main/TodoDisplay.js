import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import StarOutlined from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { CircleOutlined, CheckCircle } from "@mui/icons-material"
import CalendarToday from '@mui/icons-material/CalendarMonthTwoTone'
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TaskItem = ({ task }) => (
  <Paper className="flex justify-between ">
    <div >
      <Checkbox className="flex" icon={<CircleOutlined />} checkedIcon={<CheckCircle />} />

      {task.title}
      <div className="-space-x-4 -mt-2">
        <span className="p-12">{task.catagory}</span>
        <span> <CalendarToday />{task.day}</span>
      </div>
    </div>
    <Checkbox className="ml-auto" icon={<StarOutlined />} checkedIcon={<Star />} />

  </Paper>
)

const TodoDisplay = ({ tasks=[] }) => {
  const completedtask = tasks?.filter((task) => task.complet === true)
  const inCompletTask = tasks?.filter((task) => task.complet === false)

  return (
    <div className="space-y-12">

      <div className="space-y-6">
     
        { inCompletTask.map((task, index) => (
            <TaskItem key={`incomplete-${index}`} task={task} />
          ))
        }
      
      </div>

        {completedtask.length > 0 && 
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Completed
              </AccordionSummary>
              <AccordionDetails>
                {completedtask.map((task, index) => (
                  <TaskItem key={`completed-${index}`} task={task} />
                ))}
              </AccordionDetails>
            </Accordion>
        }    
    </div>
  )

}

export default TodoDisplay;