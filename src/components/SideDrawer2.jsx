import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { selectGroup, addGroup, setSelectedGroup, fetchGroups } from '../Redux/TasksAddSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Add as AddIcon, Dashboard, Logout, Search } from "@mui/icons-material";
import { Avatar, Tooltip ,ButtonBase  } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Dashbored from './Dashbored';
import Main from './Main';
import useGroupManager from '../hooks/useGroupManager';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AddNewCatagory from './allCatagory/AddNewCatagory';
import Update from './allCatagory/Update';
const drawerWidth = 300;


const ListItemStyled = styled('ListItem')({
  width: '100%',
  color: 'white',
  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#2196f3",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#2196f3",
  },
  fontSize: "20px",
  width: '100%',
  cursor: 'pointer',
});

export default function SideDrawer({ userId }) {
  const { firstName, email } = useSelector((state) => state.user.userDetail)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { allGroup } = useGroupManager(userId)
  const [openNewCatagory , setOpenNewCatagory]= React.useState(false)
  const[isEdit ,setIsEdit]=React.useState(false)
  const [selectedCatagory,setSelectedCatagory]=React.useState(null)
  const [activeItem, setActiveItem] = React.useState('dashbored');
  const defaultGroup = [
    { id: "dashbored", name: "dashbored", icon: <DashboardIcon /> },
    { id: "vitalTask", name: "Vital Task", icon: <PriorityHighIcon /> },
    { id: "myday", name: "MY Day ", icon: <EventAvailableIcon /> },
    { id: "planned", name: "Planned", icon: <CalendarMonthIcon /> },
  ];


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const CatagoryItem = (Icon, value, key ,editable) => (

    <ListItem
      key={key} className=" rounded-md w-[0px] "
      button
      onClick={() => setActiveItem(key)}
      sx={{
       
        color: 'white',
        "&:hover": {
          backgroundColor: activeItem === key ? "#fff" : "#2196f3",
          color: activeItem === key ?"#2196f3" : "#fff",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "#2196f3",
        },
        fontSize: "20px",
        width: '100%',
        cursor: 'pointer',
        width:'90%',
        marginInline:'auto',
        backgroundColor: activeItem === key ? "#fff" :"#2196f3",
        color: activeItem === key ?"#2196f3" : "#fff",
      }}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{Icon}</ListItemIcon>
      <ListItemText className="capitalize">{value}</ListItemText>
      {(activeItem ===key && editable ) && <Update name={value} id={key}/>}
      
    </ListItem>
  );

  const drawer = (
    <div className=' gap-4'>
     
        <div className='flex gap-2 items-center p-4 px-2'>
          <Avatar />
          <div className='flex flex-col text-white'>
            <span className=''>{firstName}</span>
            <span className=''>{email}</span>
          </div>
        </div>


        <Divider sx={{  borderColor: 'white', marginY: '20px' }} />
      <List className='' >
        {defaultGroup.map((group, index) =>
          CatagoryItem(group.icon, group.name, group.id , false)
        )}

        <Divider sx={{  borderColor: 'white', marginY: '20px' }} />

        {allGroup?.map((group, index) =>
          CatagoryItem(<FormatListBulletedIcon />, group.name, group.id , true)
        )}
      </List>
       <div className='flex  justify-between px-4 pt-6'>

       <Tooltip title='Add new catagory' >
            <ButtonBase className='absolute right-0 top-0' onClick={() => { setOpenNewCatagory(true); setIsEdit(false) }}>
              <AddIcon className="text-[#fff]" sx={{ fontSize: '32px' }} /> 
            </ButtonBase>
          </Tooltip>
         <span className='text-white'>  
         <Logout /> Logout</span>
       </div>
       <AddNewCatagory open={openNewCatagory} setOpen={setOpenNewCatagory} userId={userId} isEdit={isEdit} catagory={selectedCatagory} />

    </div>
  );



  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar >
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className=''>
            <img src="/Images/logo.png" alt="" className='h-full w-32' />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer

          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#2196f3" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#2196f3" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <div className='xl:w-[100%] px-4 pt-16 pb-6'>
          {
            activeItem === 'dashbored' ? (<Dashbored />) : <Main group={activeItem} />
          }
        </div>

      </Box>
    </Box>
  );
}
