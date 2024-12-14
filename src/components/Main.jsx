import React, { useEffect } from 'react'
import EachCatagory from './EachCatagory'
import { useSelector } from 'react-redux'
import { todayTask, vitalTask } from '../Redux/TasksAddSlice'
import { selectUserId } from '../Redux/User'
import useTaskManager from '../hooks/useTaskManager'
import { Box, CircularProgress, Typography } from '@mui/material'
import { PriorityHigh } from '@mui/icons-material'

const Main = ({group , name}) => {
    const todaytask= useSelector(todayTask)
    const vitaltask=useSelector(vitalTask)

    switch(group){
        case 'myday':
            return <EachCatagory task={todaytask} name={group} groupId={'4task'}/>
        case 'vitalTask':
            return <EachCatagory task= {vitaltask} name={group} groupId={'4task'}/>  
        case 'planned' :
            // return <Planned/>  
           default :
           return  <CreatedGroup groupId={group} name={name}/>   
    }
 
}

export const CreatedGroup=({groupId ,name})=>{
    const userId = useSelector(selectUserId)
    const {fetch } = useTaskManager(userId)

    useEffect(()=>{
      fetch(groupId)
    },[fetch,groupId])

    const todos= useSelector((state)=>state.toDo.tasksByGroup[groupId])
    const todosByGroupStatus=useSelector((state)=>state.toDo.todosByGroupStatus[groupId])

    if (todosByGroupStatus === 'loading') {
        return (
          <Box sx={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        </Box>
        )
      }
    
      if (todosByGroupStatus === 'failed') {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <PriorityHigh color="error" />
          <Typography color="error" variant="h6">
            Failed to load data. Please try again later.
          </Typography>
        </Box>        )
      }
 
    return (
      <>
        <EachCatagory task={todos} name={name} groupId={groupId}/>
        </>
    )
 
}

export default Main
