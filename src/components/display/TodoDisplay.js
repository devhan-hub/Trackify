import Paper from "@mui/material/Paper"
import Checkbox from '@mui/material/Checkbox';
import { CircleOutlined, CheckCircle } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { Typography, ButtonBase, IconButton } from '@mui/material'
import Grid from "@mui/material/Grid2";
import { selectUserId } from "../../Redux/User.jsx";
import useTaskManager from "../../hooks/useTaskManager.jsx";
import Display from "./Display.jsx";
import { useState } from "react";
import { priorityColor ,isOverDue ,getDateStatus} from './Utiles.jsx'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px'
});


export default function TodoDisplay({ todo }) {
  const userId = useSelector(selectUserId);
  const { edit } = useTaskManager(userId)
  const [openDisplayDialog, setOpenDisplayDialog] = useState(false)
  return (
    <Paper
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        width: '100%',
        height: 'auto',
        borderRadius: '15px',
        flexGrow: 1,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      })}
    >

      <Display todoId={todo.id} todo={todo} groupId={todo.catagory} userId={userId} open={openDisplayDialog} setOpen={setOpenDisplayDialog} className=' shadow-2xl bg-white  ' />

      <Grid container spacing={0} columnSpacing={0} >
        <Grid size={2}   >
          <IconButton onClick={() => {
            edit(todo.id, { ...todo, completed: !todo.completed } ,todo.catagory);
          }}>
            <Checkbox checked={todo.completed} icon={<CircleOutlined />} checkedIcon={<CheckCircle />}
              sx={{
                color: 'red',
                '&.Mui-checked': {
                  color: 'green',
                }
              }}
            />
          </IconButton>
        </Grid>
        <Grid container  size={10} justifyContent={'flex-start'} alignItems={'center'} onClick={()=>setOpenDisplayDialog(true)}>
        <Grid size={12}>
          <Typography gutterBottom variant="h6" className="font-bold capitalize">
            {todo.title}
          </Typography>
        </Grid>
     
        <Grid size={6}>
          <Typography variant="body2" gutterBottom>
            {todo.description.length > 50 ? todo.description.slice(0, 100) + '...' : todo.description}
          </Typography>
        </Grid>
        <Grid size={6} >
          <ButtonBase sx={{ width: 150, height: 130 }}>
            <Img alt="complex" src={`${todo.image}`} />
          </ButtonBase>
      
        </Grid>
        
        <Grid size={4}>
          <Typography sx={{ cursor: 'pointer' }} variant="body2" >
            priority: <span className={`${priorityColor(todo.priority)}`}>{todo.priority}</span>
          </Typography>
        </Grid>
        <Grid size={4} className=''>DueDate: <span className={`${isOverDue(todo.dueDate) ? 'text-red-600 ' : ''}  lowercase`}>{getDateStatus(todo.dueDate)}</span>

        </Grid>
        <Grid size={4} className="capitalize  ">
          Status: <span className={` ${todo.completd ? 'text-green-500' : 'text-red-600'} font-bold`}> {todo.completd ? 'completed' : 'incomplete'}</span></Grid >
          </Grid>
      </Grid>


    </Paper>
  );
}



