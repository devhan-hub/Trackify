
import { styled } from '@mui/material/styles';
import {  Typography, Container } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import InputToDo from "../inputTask/InputToDo";
import { useState } from "react";
import DeleteDialog from "../DeleteDialog";
import useTaskManager from '../../hooks/useTaskManager'
import { toast } from "react-toastify";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Close, CloseOutlined} from '@mui/icons-material';
import { priorityColor ,isOverDue ,getDateStatus}  from './Utiles'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '10px'
});

export default function Display({ todoId, groupId, userId, todo, open, setOpen }) {
  const [isEdit, setIsEdit] = useState(false)
  const [openInputDialog, setOpenInputDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { deleteTodoById } = useTaskManager(userId)


  const handelDelete = async () => {
    const success = await deleteTodoById(todoId,groupId)
    if (success) {
      toast.success('permantely deleted')
      setOpenDeleteDialog(false)
    }
    else {
      setOpenDeleteDialog(false)
      toast.error('unabe to delete')
    }

  }

  const DrawerList = (

      <Container
        sx={(theme) => ({
          width: '100%',
          borderWidth: 2,
          flexGrow: 1,
          height: 'max-content',
          top: '0',
          backgroundColor: '#fff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
          }),
     

        })}
      >
        <DeleteDialog handelDelete={handelDelete} content={`' ${todo.title}' Task`} open={openDeleteDialog} setOpen={setOpenDeleteDialog} />
        {isEdit && <InputToDo todo={todo} isEdit={isEdit} setIsEdit={setIsEdit} open={openInputDialog} setOpen={setOpenInputDialog} groupId={groupId} />}

         
        <Grid container spacing={3} >
        <Grid size={12} height={35}/>
        <Grid  size={12}>
            <IconButton onClick={()=>setOpen(false)}>
              <Close/>
            </IconButton>
          </Grid>
          <Grid  size={12}>
            <Typography variant="h5" component="div" className="font-bold capitalize text-center ">
              {todo?.title}
            </Typography>
          </Grid>


            <Grid size={12} >
              <Img alt="complex" className='w-[300px]' src={`/${todo?.image}`} />
            </Grid>

            <Grid size={12} gap={2}  >
              <p className=' capitalize '> priority: <span className={`${priorityColor(todo?.priority)}  lowercase`}>{todo?.priority}</span></p>
              <p className=' capitalize '> Status: <span className={`${todo?.comleted ? 'text-green-500' : 'text-red-600'}  lowercase`}>{todo?.completed ? 'Completed' : 'Incomplete'}</span></p>
              <p className=' capitalize y
              clear
              
              '> DueDate: <span className={`${isOverDue(todo.dueDate) ? 'text-red-600 ' : ''}  lowercase`}>{getDateStatus(todo.dueDate)}</span></p>
            </Grid>


          <Grid size={12} className="space-y-2 ">
            <Typography variant="h6" gutterBottom>
              Task Description
            </Typography>
            <Typography>{todo?.description}</Typography>
          </Grid>
        </Grid>

        <div item container alignSelf={'self-end'} className='flex justify-end gap-6 mt-6'>
          <IconButton sx={{ backgroundColor: '#3abeff', color: 'white', scale: '1.1', '&:hover': { scale: '1', backgroundColor: '#3abeff' }, transition: 'all', transitionDuration: '.5s' }} className="transition-all duration-700" onClick={() => setOpenDeleteDialog(true)}>
            <DeleteIcon />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#3abeff', color: 'white', scale: '1.1', '&:hover': { scale: '1', backgroundColor: '#3abeff' }, transition: 'all', transitionDuration: '.5s' }} className="transition-all duration-700" onClick={() => { setIsEdit(true); setOpenInputDialog(true) }}>
            <EditIcon />
          </IconButton>
        </div>
        <Grid size={12} height={10}/>

      </Container>

  )

  return (
    <div>
     
        <Drawer
          sx={{
            width: 400,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 400,
            },
          }}
          variant="persistance"
          anchor="right"
          open={open}
          onClose={()=>setOpen(false)}
          className='xl:block hidden'
        >
          
          <IconButton onClick={()=>setOpen(false)}>
          <CloseOutlined /> 
          </IconButton>
       
        <Divider />
          {DrawerList}
        </Drawer>
     
      <Drawer
       sx={{
        maxWidth: 400,
        width:'100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          maxWidth: 400,
          width:'100%',
        },
      }}
       className='xl:hidden block' open={open} variant='temporary' onClose={() => setOpen(false)} anchor='right'>
        {DrawerList}
      </Drawer>
  
    </div>
  );

}
