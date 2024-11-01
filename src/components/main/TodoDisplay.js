import  Paper  from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import StarOutlined from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star'; 
import { CircleOutlined , CheckCircle } from "@mui/icons-material"
import CalendarToday from '@mui/icons-material/CalendarMonthTwoTone'
const TodoDisplay =()=>{
    return (
      <Paper className="flex justify-between">
          <div>
        <Checkbox  className="flex" icon={<CircleOutlined />} checkedIcon={<CheckCircle />} />
      
          {'taske title'}
            <div className="-space-x-8 -mt-4">
          <span className="p-12">Taskes</span>
          <span> <CalendarToday/>  Today</span>
          </div>
        </div>
        <Checkbox  className="ml-auto" icon={<StarOutlined />} checkedIcon={<Star />} />
  
        </Paper> 
    )
       
   }

   export default TodoDisplay;