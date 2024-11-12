import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import StarOutlined from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { CircleOutlined, CheckCircle, Repeat } from "@mui/icons-material"
import CalendarToday from '@mui/icons-material/CalendarMonthTwoTone'
import { useDispatch, useSelector } from "react-redux";
import { updateTodo  ,updateAllTask} from '../feature/TasksAddSlice'
import { format, isAfter, isBefore, isToday, isTomorrow, isYesterday, parseISO, subDays, startOfDay } from 'date-fns';
import { useEffect, useState } from "react";
import { Stat } from "@chakra-ui/react";

const TodoDisplay = ({ tasks = [] }) => {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.toDo.selectedGroupId)

  const [updatedTasks, setUpdatedTasks] = useState([]);

  const handelUpdate = (update, todoId) => {
    if(groupId ==='1myday' || groupId === '1important') {
        dispatch(updateAllTask({update , todoId , userId:1}))
    }
    else {
      dispatch(updateTodo({userId:1 ,todoId , updatedTodo:update,groupId}))
    }
  }

  const getDateStatue = (dueDate) => {
    if (!dueDate) return '';
    const parsedDate = parseISO(dueDate);
    if (isToday(parsedDate)) return 'Today';
    if (isTomorrow(parsedDate)) return 'Tomorrow';
    if (isYesterday(parsedDate)) return 'Yesterday';
    return format(parsedDate, 'E , M dd');
  }

  useEffect(() => {

    setUpdatedTasks(
      tasks.slice().sort((a, b) => b.dueDate - a.dueDate)
    );
        const timeInterval = setInterval(() => {
      const newUpdatedTask = updatedTasks.map((task) => {
        return { ...task, dueDateStatus: getDateStatue(task.dueDate) }
      })
      setUpdatedTasks(newUpdatedTask)
    }, 3600000)
    return () => clearInterval(timeInterval)
  }, [ tasks])

  return (

    <div>

      {updatedTasks && updatedTasks.map((task) =>

      (<Paper key={`${task.id}`} className="flex justify-between ">
        <div >
          <Checkbox className='flex' checked={task.completed} icon={<CircleOutlined />} checkedIcon={<CheckCircle />} onClick={() => handelUpdate({ ...task, completed: !task.completed }, task.id)} />
          <div className={`${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </div>
          <div className="-space-x-4 -mt-2">
            <span className="p-12">{task.category
            }</span>
            <span className={task.dueDate && isAfter(new Date(task.dueDate), subDays(startOfDay(new Date()), 1)) &&
              isBefore(new Date(task.dueDate), startOfDay(new Date())) ? 'text-red-500' : 'text-black'}>
              <CalendarToday /> {task.dueDateStatus || getDateStatue(task.dueDate)}
            </span>
          </div>
        </div>
        <Checkbox className="ml-auto" checked={task.important} icon={<StarOutlined />} checkedIcon={<Star />} onClick={() => handelUpdate({ ...task, important:!task.important }, task.id)} />

      </Paper>
      )
      )}
    </div>
  )

}

export default TodoDisplay;






