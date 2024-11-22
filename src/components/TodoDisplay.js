import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import { CircleOutlined, CheckCircle, Repeat } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { updateTodo  ,updateAllTask} from '../Redux/TasksAddSlice'
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
import { styled } from '@mui/material/styles';
import {Grid , Typography ,ButtonBase} from '@mui/material'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px'
});


const getDateStatue = (dueDate) => {
  if (!dueDate) return '';
  const parsedDate = parseISO(dueDate);
  if (isToday(parsedDate)) return 'Today';
  if (isTomorrow(parsedDate)) return 'Tomorrow';
  if (isYesterday(parsedDate)) return 'Yesterday';
  return format(parsedDate, 'E , M dd');
}


const priorityColor = (value) => {
  switch (value) {
    case 'low':
      return 'text-[#32CD32]'
      break;
    case 'medium':
      return 'text-[#a8d8f2]'
      break;
    case 'high':
      return 'text-[#FF4500]'
      break;
    default:
      return 'text-[#1E90FF]'
      break;
  }
}


export default function TodoDisplay({todo , all}) {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.toDo.selectedGroupId)



  const handelUpdate = (update, todoId) => {
    if(groupId ==='1myday' || groupId === '1important') {
        dispatch(updateAllTask({update , todoId , userId:1}))
    }
    else {
      dispatch(updateTodo({userId:1 ,todoId , updatedTodo:update,groupId}))
    }
  }


    return (
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
           maxWidth:all?500:400,
           
          flexGrow: 1,
          backgroundColor: '#fff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
          }),
        })}
      >
        <div className='flex  items-start gap-1 '>
          <Checkbox checked={todo.completd} icon={<CircleOutlined />} checkedIcon={<CheckCircle />}
            sx={{
              color: 'red',
              '&.Mui-checked': {
                color:'green',
              }
            }}
          />
          <Grid container spacing={2} justifyContent={'space-between'} >

            <Grid item xs={12} sm container >
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div" className="font-bold capitalize">
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {todo.description.length > 50 ? todo.description.slice(0, 100) + '...' : todo.description}
                  </Typography>

                </Grid>
                <Grid item container justifyContent={'space-between'} alignItems={'center'}>
                  <Grid item >
                    <Typography sx={{ cursor: 'pointer' }} variant="body2" >
                      priority: <span className={`${priorityColor(todo.priority)}`}>{todo.priority}</span>
                    </Typography>
                  </Grid>
                  <Grid item className='text-black text-opacity-45'>DueDate{todo.duedate}</Grid >
                  <Grid item className="capitalize  " >Status: <span className={` ${todo.completd?'text-green-500':'text-red-600'} font-bold`}> {todo.completd?'completed':'incomplete'}</span></Grid >

                </Grid>
              </Grid>
              <Grid item  >
                <Grid item container justifyContent={'space-between'} alignItems={'center'} >
                  <Grid item xs={12}>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={`${todo.image}`} />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }



