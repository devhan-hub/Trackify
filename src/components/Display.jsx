import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import { CircleOutlined, CheckCircle, Repeat, Edit } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, updateAllTask } from '../Redux/TasksAddSlice'
import { format, isToday, isTomorrow, isYesterday, parseISO , startOfDay } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Grid, Typography, ButtonBase, Container } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";
import InputToDo from "./inputTask/InputToDo";
import { useEffect, useState } from "react";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px'
});


const getDateStatue = (dueDate) => {
  if (!dueDate) return '';
  const date= dueDate.toDate()
  const isoString = date.toISOString()
  const parsedDate = parseISO(isoString);
  if (isToday(parsedDate)) return 'Today';
  if (isTomorrow(parsedDate)) return 'Tomorrow';
  if (isYesterday(parsedDate)) return 'Yesterday';
  return format(parsedDate, 'dd/MM/yyyy');
}

const isOverDue = (dueDate) => {

  const parseDueDate = dayjs(dueDate.toDate()); 

  const today = dayjs().startOf('day'); 

  return parseDueDate.isBefore(today, 'day'); 

}


const priorityColor = (value) => {
  switch (value) {
    case 'extreme':
      return 'text-[#ff0000]'
      break;
    case 'moderate':
      return 'text-[#32CD32]'
      break;
    case 'low':
      return 'text-[#a8d8f2]'
      break;
    default:
      return 'text-[#1E90FF]'
      break;
  }
}


export default function Display({ todoId , allTask }) {
  const groupId = useSelector(state => state.toDo.selectedGroupId)
 const [isEdit , setIsEdit]=useState(false)
 const[todo,setTodo]= useState(null)
 const[openInputDialog , setOpenInputDialog]= useState(false)


 useEffect(()=>{
   setTodo(allTask.find((todo) => todo.id === todoId))

 },[allTask , todoId])

 if(todo) {
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
        height:'max-content',
        top: '0',
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),

      })}

    >
     
         {isEdit && <InputToDo todo={todo} isEdit={isEdit} setIsEdit={setIsEdit} open={openInputDialog} setOpen={setOpenInputDialog}/>}
        

      <Grid container  spacing={4}  >

        <Grid item xs={12}>
        <Typography  variant="h5" component="div" className="font-bold capitalize text-left md:text-center">
        {todo?.title}
       </Typography>
        </Grid>

        <Grid item xs container  spacing={4}  alignItems={'center'} >

          <Grid item >
            <Img alt="complex" className='w-[200px]' src={`/${todo?.image}`} />
          </Grid>

          <Grid item gap={2}  >
            <p className='text-[1.13em] capitalize '> priority: <span className={`${priorityColor(todo?.priority)} text-lg lowercase`}>{todo?.priority}</span></p>
            <p className='text-[1.13em] capitalize '> Status: <span className={`${todo?.comleted?'text-green-500':'text-red-600'} text-lg lowercase`}>{todo?.completed?'Completed':'Incomplete'}</span></p>
            <p className='text-[1.13em] capitalize text-black text-opacity-45'> DueDate: <span className={`${isOverDue(todo.dueDate)?'text-red-600 ':''} text-lg lowercase`}>{getDateStatue(todo.dueDate)}</span></p>
          </Grid>

        </Grid>

        <Grid item className="space-y-2 ">
          <Typography variant="h6" gutterBottom>
            Task Description
          </Typography>
          <Typography>{todo?.description}</Typography>

        </Grid>
      </Grid> 

      <div item container alignSelf={'self-end'} className='flex justify-end gap-6 mt-6'>
      <IconButton sx={{backgroundColor:'#FF4B3F', color:'white' , scale:'1.1', '&:hover':{scale:'1' , backgroundColor:'#FF4B3F'} ,transition:'all' , transitionDuration:'.5s' }} className="transition-all duration-700">
      <DeleteIcon />
          </IconButton>
          <IconButton sx={{backgroundColor:'#FF4B3F', color:'white' , scale:'1.1', '&:hover':{scale:'1' , backgroundColor:'#FF4B3F'} ,transition:'all' , transitionDuration:'.5s' }} className="transition-all duration-700" onClick={()=>{setIsEdit(true) ;setOpenInputDialog(true)}}>
            <Edit />
          </IconButton>
        </div>

    </Container>
  );}
}




