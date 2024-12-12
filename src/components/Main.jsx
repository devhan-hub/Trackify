import React from 'react'
import EachCatagory from './EachCatagory'
import { useSelector } from 'react-redux'
import { todayTask, vitalTask } from '../Redux/TasksAddSlice'
import { selectUserId } from '../Redux/User'
import useTaskManager from '../hooks/useTaskManager'

const Main = ({group}) => {
    const todaytask= useSelector(todayTask)
    const vitaltask=useSelector(vitalTask)

    switch(group){
        case 'myday':
            return <EachCatagory task={todaytask} name={group}/>
        case 'vitalTask':
            return <EachCatagory task= {vitaltask} name={group}/>  
        case 'planned' :
            // return <Planned/>  
           default :
             <CreatedGroup groupId={group}/>   
    }
 
}

export const CreatedGroup=({groupId})=>{
    const userId = useSelector(selectUserId)
    const {tasksInGroup:todos } = useTaskManager(userId,groupId)
    const todosByGroupStatus=useSelector((state)=>state.toDo.todosByGroupStatus[groupId])

    if (todosByGroupStatus === 'loading') {
        return (
          <div>Loading ...</div>
        )
      }
    
      if (todosByGroupStatus === 'failed') {
        return (
          <div>OOPS unable to load</div>
        )
      }
 
    return (
        <EachCatagory task={todos} name={groupId}/>
    )
 
}

export default Main
