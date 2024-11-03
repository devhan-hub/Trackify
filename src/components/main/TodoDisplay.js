import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import StarOutlined from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { CircleOutlined, CheckCircle } from "@mui/icons-material"
import CalendarToday from '@mui/icons-material/CalendarMonthTwoTone'
import { useDispatch } from "react-redux";
import {addTask , removeTask , toggelCompleted, toggelImportant}  from '../slice/TasksAdd.tsx'

const TodoDisplay = ({ tasks = [] }) => {
  const dispatch= useDispatch();
  return (

    <div>

      {tasks && tasks.map((task ) =>

      (<Paper key={`${task.id}`} className="flex justify-between ">
        <div >
          <Checkbox className="flex" checked={task.completed} icon={<CircleOutlined />} checkedIcon={<CheckCircle />} onClick={()=>dispatch(toggelCompleted(task.id))}/>

          {task.title}
          <div className="-space-x-4 -mt-2">
            <span className="p-12">{task.category
            }</span>
            <span> <CalendarToday />{task.day}</span>
          </div>
        </div>
        <Checkbox className="ml-auto" checked={task.important} icon={<StarOutlined />} checkedIcon={<Star />}  onClick={()=>dispatch(toggelImportant(task.id))}/>

      </Paper>
      )
      )}
    </div>
  )

}

export default TodoDisplay;