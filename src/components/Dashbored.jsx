import React from 'react'
import {  Typography  } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSelector } from 'react-redux'
import StatusBar from './StatusBar'
import {selectUserId ,logoutUser} from '../Redux/User.jsx'
import { todayTask, vitalTask } from '../Redux/TasksAddSlice.jsx'
import EachCatagory from './EachCatagory.js'

const Dashbored = () => {
 const userId = useSelector(selectUserId)
 const vitaltask=useSelector(vitalTask)
 const todaytask=useSelector(todayTask)
 const inCompletedTask = todaytask.filter((task) => task.completed === false);
const {firstName}=useSelector((state)=>state.user.userDetail)


 

  return (
    <>
    
    <Typography  sx={{fontSize: { xs: '6vw', md: '4vw',   lg: '5vw',  },}}  className='my-auto py-6  px-6'>
        Welcome back ,{firstName} 👋
      </Typography>
      <Grid container style={{ minHeight: '100vh' }} spacing={2} className='p-4 border-2 border-gray-200 shadow-2xl '>
     
        <Grid size={{xs:12 , lg:6}} spacing={2} className='flex-grow'>
        <EachCatagory name={'InComplet-Task'} groupId={'4task'} task={inCompletedTask}/> 
        </Grid>

        <Grid size={{xs:12 , lg:6}} className='space-y-4  flex-grow h-full'>
          <Grid size={12}>
          <StatusBar/>
          </Grid>
          <Grid size={12} spacing={2} className='flex-grow'>
        <EachCatagory name={'Urgent-Task'} groupId={'4task'} task={vitaltask}/> 
        </Grid>

          </Grid>
        
      </Grid>
        </>
  )
}

export default Dashbored
