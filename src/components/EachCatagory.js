
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchTodosByGroup, fetchUserTask } from "../Redux/TasksAddSlice.jsx";
import SideDrawer from './SideDrawer.jsx'
import Navbar from './Navbar.js'
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import { ListAltOutlined, Add as AddIcon } from "@mui/icons-material";
import { format, toDate } from 'date-fns';
import TodoDisplay from './TodoDisplay.js'
import InputToDo from "./inputTask/InputToDo.jsx";
import Display from "./Display.jsx";
import Tooltip from '@mui/material/Tooltip';
import { useParams } from "react-router-dom";



const TodayDate = () => {
  const today = format(new Date(), 'd MMM');
  return <div>{today}<span className=" text-black text-opacity-45">.Today</span></div>;
};

const EachCatagory = ({ userId }) => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const groups=useSelector((state)=>state.toDo.groups)
  const [openInputDialog, setOpenInputDialog] = useState(false)
  const todosByGroupStatus = useSelector(state => state.toDo.todosByGroupStatus);
  const todos = useSelector(state => state.toDo.tasksByGroup[groupId]) || [];
  const[name , setName]= useState('Untitled')
  const [selectedTodoId, setSelectedTOdoId] = useState(
    todos?.length !== 0 ? todos[0].id : ''
  );





  useEffect(() => {

    if (groupId) {
      if (todosByGroupStatus[groupId] === "idle") {
        dispatch(fetchTodosByGroup({ userId, groupId }))
      }
    }

  }, [userId, groupId, todosByGroupStatus, , dispatch]);

  useEffect(()=>{
     const selectedGroup=groups.find((group)=>group.id === groupId)
     setName(selectedGroup?.name)
  } ,[groupId])

  if (!todos) {
    return (
      <div>LOading ...</div>
    )
  }


  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box className='xl:flex'>

        <SideDrawer />

        <Box className=' lg:flex gap-4 flex-grow p-4 min-h-screen' >

          <Box className=" space-y-2 p-4 lg:p-3 w-full border-black border-opacity-30 border-2 h-full ">

            <div className=' shadow-2xl bg-white p-4 space-y-4 min-h-screen'>
              <Grid container spacing={2} >
                <Grid item xs={8} className='space-y-2   '>
                 <div className='flex items-center gap-2'> <img src="/Images/home.png" alt="" className='size-8' /> <span className="text-[#ff6867] capitalize text-xl font-Monsta font-bold">{name}</span></div>
                  <div>{TodayDate()}</div>
                </Grid>

            <Grid item>
                <ButtonBase onClick={() => setOpenInputDialog(true)} className="w-full ">
                  <Tooltip title='Add new task  '>
                    <AddIcon className="text-[#ff6867] w-full" /> Add Task
                    </Tooltip>
                  </ButtonBase>
                  </Grid>
              </Grid>
              <InputToDo open={openInputDialog} setOpen={setOpenInputDialog} groupId={groupId}/>


              {(todos?.length === 0 && todos )? (
                <div className='h-full w-full flex flex-col items-center justify-center p-12'>
                  <img src="/Images/home.png" alt="" className='size-32' />
                  <Typography variant="h6">NO Task</Typography >
                </div>
              ) : (
                <Grid container alignItems={'center'} justifyItems={'center'} spacing={3} className="w-full">
                  {todos?.map((todo, index) => {
                    const isSelected = selectedTodoId === todo.id;

                    return (
                      <Grid item key={index} className={`w-full cursor-pointer `} onClick={() => setSelectedTOdoId(todo.id)}>
                        <TodoDisplay todo={todo} all={true} isSelected={isSelected} />
                      </Grid>
                    )
                  })}
                </Grid>
              )}
            </div>

          </Box>


          <Box item md={6} sx={12} className="sticky min-h-screen h-max top-[10px] border-black border-opacity-30 border-2  p-4 pb-6 self-start  w-full   ">
            <Display todoId={selectedTodoId} allTask={todos} className=' shadow-2xl bg-white  ' />
          </Box >

        </Box>

      </Box>
    </>
  );
}


export default EachCatagory;




