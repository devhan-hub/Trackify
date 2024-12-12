import { useState } from "react";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Add as AddIcon } from "@mui/icons-material";
import { format } from 'date-fns';
import TodoDisplay from './TodoDisplay.js'
import InputToDo from "./inputTask/InputToDo.jsx";
import Display from "./Display.jsx";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import { selectUserId } from "../Redux/User.jsx";


const TodayDate = () => {
  const today = format(new Date(), 'd MMM');
  return <div>{today}<span className=" text-black text-opacity-45">.Today</span></div>;
};

const EachCatagory = ({ name, task }) => {
  const userId = useSelector(selectUserId)
  const [openInputDialog, setOpenInputDialog] = useState(false)
  const [openDisplayDialog, setOpenDisplayDialog] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [selectedTodoId, setSelectedTOdoId] = useState(null)


  return (
    <>
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
          <InputToDo open={openInputDialog} setOpen={setOpenInputDialog} groupId={'4task'} isEdit={false} />


          {(task?.length === 0 && task) ? (
            <div className='h-full w-full flex flex-col items-center justify-center p-12'>
              <img src="/Images/home.png" alt="" className='size-32' />
              <Typography variant="h6">NO Task</Typography >
            </div>
          ) : (
            <Grid container alignItems={'center'} justifyItems={'center'} spacing={3} className="w-full">
              {task?.map((todo, index) => {
                const isSelected = selectedTodoId === todo.id;

                return (
                  <Grid item key={index} className={`w-full cursor-pointer `} onClick={() => { setSelectedTOdoId(todo.id); setSelectedTodo(todo); setOpenDisplayDialog(true) }}>
                    <TodoDisplay todo={todo} all={true} isSelected={isSelected} />
                  </Grid>
                )
              })}
            </Grid>
          )}
        </div>

      </Box>


        { selectedTodo && <Display todoId={selectedTodoId} todo={selectedTodo} groupId={'4task'} userId={userId} open={openDisplayDialog} setOpen={setOpenDisplayDialog} className=' shadow-2xl bg-white  ' />
        }         

    </>
  );
}


export default EachCatagory;




