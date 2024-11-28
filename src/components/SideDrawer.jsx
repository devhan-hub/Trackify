import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { StarOutline, ListAltOutlined, HouseOutlined, Add as AddIcon, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { selectGroup, addGroup, setSelectedGroup, fetchGroups } from '../Redux/TasksAddSlice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { selectOpen, updateOpen } from '../Redux/NavStore'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const icon = [<DashboardIcon />, <PriorityHighIcon />, <EventAvailableIcon />,<CalendarMonthIcon/>, <FormatListBulletedIcon /> ,<SettingsIcon/>];

export default function SideDrawer() {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroup);
  const groupStatus = useSelector((state) => state.toDo.groupStatus);
  const defaultGroup = [
    { id: "dashbored", name: "dashbored" },
    { id: "vitalTask", name: "Vital Task" },
    { id: "myday", name: "MY Day " },
    { id: "planned", name: "Planned" },
    { id: "taskCatagory", name: "Task Catagory" },
    { id: "settings", name: "Settings" },
   
  ];
  const taskCatagory = [{ id: "priority", name: "By Priority " },{ id: "task", name: "Task" }]
  const updatedGroup = [...taskCatagory, ...groups];
  const theme = useTheme();
  const open = useSelector(selectOpen);

  const CatagoryItem = (Icon, value, key) => (
    <Link to={`todo/${key}`} key={key} className="w-full">
      <ListItem
        button
        onClick={() => dispatch(setSelectedGroup(key))}
        sx={{
          "&:hover": {
            backgroundColor: "#FF4B3F", 
            color: "#ffffff", 
          },
          "&.Mui-selected": {
            backgroundColor: "#FF4B3F",
            color: "#ffffff", 
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#FF6347", 
          },
          fontSize: "20px",
        }}
        className="cursor-pointer"
      >
        <ListItemIcon sx={{ color: "inherit" }}>{Icon}</ListItemIcon>
        <ListItemText className="capitalize">{value}</ListItemText>
      </ListItem>
    </Link>
  );

  return (
    <div className="">
      <Box sx={{ display: "flex", position: "relative" }}>
      <Drawer
  variant="permanent"
  open={open}
  sx={{
    "& .MuiDrawer-paper": {
      backgroundColor: "#ff6867",
      color: "#ffffff",
      marginTop: "80px",
      paddingY: "20px",
      borderTopRightRadius: "2%",
      height: "100vh", // Ensures the drawer spans the full height of the screen
      overflowY: "auto", // Makes the content scrollable
    },
  }}
>
  {/* Profile Section */}
  {open && (
    <div className="flex flex-col items-center text-center -mt-5 px-4">
      {/* Profile Image */}
      <div className="w-24 h-24 rounded-full bg-white overflow-hidden shadow-md mb-3">
        <img
          src="Images/images.jpg"
          alt="Profile"
          className="w-full h-full object-cover "
        />
      </div>
      {/* Profile Information */}
      <div>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Sundar Gurung
        </Typography>
        <Typography variant="body2" sx={{ color: "#f9f9f9" }}>
          sundargurung360@gmail.com
        </Typography>
      </div>
    </div>
  )}
  {!open && (<div className='text-center font-bold'>Rik </div>)}
  <Divider sx={{ my: 1, backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

  {/* Navigation Links */}
  <List>
    {defaultGroup.map((group, index) =>
      CatagoryItem(icon[index] ? icon[index] : <FormatListBulletedIcon />, group.name, group.id)
    )}
     <ListItem>
       <Logout/> Logout
     </ListItem>
  </List>
</Drawer>

      
      </Box>
    </div>
  );
}




