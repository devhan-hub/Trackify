import { Button, ButtonBase } from '@mui/material';
import { logout, logoutUser, selectUserId } from '../../Redux/User';
import Tooltip from '@mui/material/Tooltip';
import AddNewCatagory from '../allCatagory/AddNewCatagory';
import { Add as AddIcon, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import React   from 'react';


  
  export const SidebarFooter= ({ mini })=> {
    const [openNewCatagory , setOpenNewCatagory]=React.useState(false)
    const userId=useSelector(selectUserId)
    const dispatch=useDispatch();


    return (
      <>
      <AddNewCatagory open={openNewCatagory} setOpen={setOpenNewCatagory} userId={userId} isEdit={false} catagory={''} />
    <div className='flex justify-between'>
      <Tooltip title='Add new catagory' >
        <ButtonBase className=''  onClick={() => { setOpenNewCatagory(true) }}>
          <AddIcon  sx={{ fontSize: '32px' }} />
        </ButtonBase>
        </Tooltip>
     <Button onClick={()=>{dispatch(logoutUser()); dispatch(logout())}}>
        <Logout/> Logout
     </Button>
 
     
      </div>
      </>
    );
  }

  