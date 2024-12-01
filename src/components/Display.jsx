import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import { CircleOutlined, CheckCircle, Repeat, Edit } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, updateAllTask } from '../Redux/TasksAddSlice'
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Grid, Typography, ButtonBase, Container } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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


export default function Display({ todo }) {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.toDo.selectedGroupId)



  const handelUpdate = (update, todoId) => {
    if (groupId === '1myday' || groupId === '1important') {
      dispatch(updateAllTask({ update, todoId, userId: 1 }))
    }
    else {
      dispatch(updateTodo({ userId: 1, todoId, updatedTodo: update, groupId }))
    }
  }


  return (
    <Container
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        width: '100%',
        borderWidth: 2,
        padding: 6,
        flexGrow: 1,
        position:'relative',
        height: '100vh',
        top: '0',
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),

      })}

    >
     

      <Grid container  spacing={4}  >

        <Grid item xs={12}>
        <Typography gutterBottom variant="h5" component="div" className="font-bold capitalize text-left md:text-center">
        {todo.title}
       </Typography>
        </Grid>

        <Grid item xs container  spacing={4}  alignItems={'center'} >

          <Grid item >
            <Img alt="complex" className='w-[200px]' src={`/${todo.image}`} />
          </Grid>

          <Grid item gap={2}  >
            <p className='text-[1.13em] capitalize '> priority: <span className={`${priorityColor(todo.priority)} text-lg lowercase`}>{todo.priority}</span></p>
            <p className='text-[1.13em] capitalize '> Status: <span className={`${priorityColor(todo.priority)} text-lg lowercase`}>{todo.priority}</span></p>
            <p className='text-[1.13em] capitalize text-black text-opacity-45'> DueDate: <span className={`${priorityColor(todo.priority)} text-lg lowercase`}>{todo.priority}</span></p>
          </Grid>

        </Grid>

        <Grid item className="space-y-2 ">
          <Typography variant="h6" gutterBottom>
            Task Description
          </Typography>
          <Typography>{todo.description}</Typography>

        </Grid>
      </Grid>

      <div item container alignSelf={'self-end'} className='absolute bottom-6 right-0 p-4 space-x-4'>
      <IconButton sx={{backgroundColor:'#FF4B3F', color:'white' , scale:'1.1', '&:hover':{scale:'1' , backgroundColor:'#FF4B3F'} ,transition:'all' , transitionDuration:'.5s' }} className="transition-all duration-700">
      <DeleteIcon />
          </IconButton>
          <IconButton sx={{backgroundColor:'#FF4B3F', color:'white' , scale:'1.1', '&:hover':{scale:'1' , backgroundColor:'#FF4B3F'} ,transition:'all' , transitionDuration:'.5s' }} className="transition-all duration-700">
            <Edit />
          </IconButton>
        </div>

    </Container>
  );
}




