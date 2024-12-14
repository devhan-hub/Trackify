import { ButtonBase } from '@mui/material';
import { selectUserId } from '../../Redux/User';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import AddNewCatagory from '../allCatagory/AddNewCatagory';
import { Add as AddIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeSwitcher } from '@toolpad/core';
import { useSelector } from 'react-redux';
import React ,{useState}  from 'react';
import Fuse from 'fuse.js';


  
  export const SidebarFooter= ({ mini })=> {
    const [openNewCatagory , setOpenNewCatagory]=React.useState(false)
    const userId=useSelector(selectUserId)
    return (
      // <ButtonBase
      //   onClick={() => dispatch(logoutUser())}
      //   sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden', width: 'max-content', mr: 'auto' }}
      // >
      //   <Logout />    Logout
      // </ButtonBase>
      <>
      <AddNewCatagory open={openNewCatagory} setOpen={setOpenNewCatagory} userId={userId} isEdit={false} catagory={''} />
  
      <Tooltip title='Add new catagory' >
        <ButtonBase className=''  onClick={() => { setOpenNewCatagory(true) }}>
          <AddIcon  sx={{ fontSize: '32px' }} />
        </ButtonBase>
      </Tooltip>
      </>
    );
  }

  