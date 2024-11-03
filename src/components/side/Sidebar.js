import { Drawer , Divider, List ,ListItem,ListItemIcon ,ListItemText } from "@mui/material"
import { BsSun } from "react-icons/bs"
import { StarOutline } from "@mui/icons-material"
import { FaList } from "react-icons/fa6"
import { ListAltOutlined } from "@mui/icons-material"
import { HouseOutlined } from "@mui/icons-material"
import {TextField} from "@mui/material"
import  {Fab} from '@mui/material'
import AddIcon  from '@mui/icons-material/Add'
import {Button} from "@mui/material"
import { useDispatch } from "react-redux"
import {toggelType} from '../slice/SidebarNavigation'
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Drawer anchor="left" open={true} variant="persistent" sx={{width:240 ,boxShadow:''}}>
         <List sx={{width:'100%'}} className="flex flex-col items-center justify-center ">
           <ListItem className="cursor-pointer">
              <div className="rounded-full bg-pink-500 text-white size-14 uppercase flex items-center justify-center text-2xl">HA</div>
              <ListItemText>
                Hanan Abdulshikur
              </ListItemText>
            </ListItem>
           <ListItem>
           <TextField variant='standard' placeholder="search" size="small" className="outline-none ">

           </TextField>
           </ListItem>
          <ListItem  button className="cursor-pointer" onClick={()=> dispatch(toggelType('myday'))}>
            <ListItemIcon><BsSun/></ListItemIcon>
          <ListItemText >MyDay</ListItemText>
          </ListItem>
          <ListItem  button className="cursor-pointer" onClick={()=> dispatch(toggelType('important'))}>
            <ListItemIcon><StarOutline/></ListItemIcon>
          <ListItemText >Important</ListItemText>
          </ListItem>
          <ListItem  button className="cursor-pointer" onClick={()=> dispatch(toggelType('planned'))}>
            <ListItemIcon><ListAltOutlined/></ListItemIcon>
          <ListItemText>Planned</ListItemText>
          </ListItem>
          <ListItem  button className="cursor-pointer" onClick={()=> dispatch(toggelType('taskes'))}>
            <ListItemIcon><HouseOutlined/></ListItemIcon>
          <ListItemText>Taskes</ListItemText>
          </ListItem>
         
         </List>

         <Button className="absolute -bottom-44   " startIcon>
    
               <AddIcon  className="cursor-pointer" />
           
            <ListItemText>Add Group</ListItemText>
            </Button>
        </Drawer> 
    </div>
  )
}

export default Sidebar

