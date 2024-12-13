import { useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Add as AddIcon } from "@mui/icons-material";
import { format } from 'date-fns';
import TodoDisplay from './display/TodoDisplay.js'
import InputToDo from "./inputTask/InputToDo.jsx";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import { selectUserId } from "../Redux/User.jsx";


const TodayDate = () => {
  const today = format(new Date(), 'd MMM');
  return <div>{today}<span >.Today</span></div>;
};

const EachCatagory = ({ name, task  ,groupId}) => {
  const userId = useSelector(selectUserId)
  const [openInputDialog, setOpenInputDialog] = useState(false)


  return (
    <>

        <div className=' shadow-2xl  p-4 space-y-4 min-h-screen w-full'>
          <Grid container spacing={2} justifyItems={'space-between'} >
            <Grid item xs={8} className='space-y-2   '>
              <div className='flex items-center gap-2'> <img src="/Images/home.png" alt="" className='size-8' /> <span className="text-[#2196f3] capitalize text-xl font-Monsta font-bold">{name}</span></div>
              <div>{TodayDate()} </div> 
            </Grid>

            <Grid item xs={4} justifySelf={'end'}>
              <ButtonBase onClick={() => setOpenInputDialog(true)} className="w-full ">
                <Tooltip title='Add new task  '>
                  <AddIcon className="text-[#2196f3] w-full" /> Add Task
                </Tooltip>
              </ButtonBase>
            </Grid>
          </Grid>
          <InputToDo open={openInputDialog} setOpen={setOpenInputDialog} groupId={groupId} isEdit={false} />


          {(task?.length === 0 && task) ? (
            <div className='h-full w-full flex flex-col items-center justify-center p-12'>
              <img src="/Images/home.png" alt="" className='size-32' />
              <Typography variant="h6">NO Task</Typography >
            </div>
          ) : (
            <Grid container className="space-y-6"  >
              {task?.map((todo, index) => {

                return (
                  <Grid item sx={{flexGrow:1}} key={index}>
                    <TodoDisplay todo={todo} all={true}  groupId={groupId}/>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </div>



       

    </>
  );
}


export default EachCatagory;




