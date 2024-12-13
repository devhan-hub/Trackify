import { useSelector , useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchGroups  , addGroup ,editGroup , deleteGroup} from "../Redux/TasksAddSlice";

const useGroupManager = (userId) => {
    const dispatch=useDispatch();
    const groupStatus= useSelector((state)=> state.toDo.groupStatus)
    const allGroup = useSelector((state)=> state.toDo.groups)


  const fetch=useCallback( ()=>
    {
      if(groupStatus ==='idle') {
        dispatch(fetchGroups(userId)) 
      }
          
    },[dispatch, userId])


    const add=useCallback(async (group)=>{
       try {
            await dispatch(addGroup({ userId, group })).unwrap();
            return true;
       }
       catch (error) {
           return false;
       }
    } , [dispatch, userId])
   

    const edit=useCallback( async (groupId , updated)=>{   
       try {
           await  dispatch(editGroup({userId , groupId , updated})).unwrap()
           return true
       } catch (error) {
         return false
       }
    } , [dispatch,userId])

  const deleteGroupById=useCallback(async (groupId)=>{
   
    try{
        await  dispatch(deleteGroup({userId, groupId})).unwrap()
        return true
    }
    catch (error){
        return false
    }

  } , [userId ,dispatch])



   useEffect(()=>{
      if(groupStatus==='idle')
      {
        fetch();
      }
   } ,[ groupStatus, fetch])
   
  return{ allGroup , add , edit , fetch , deleteGroupById}
}

export default useGroupManager
 