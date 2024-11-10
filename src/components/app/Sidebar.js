import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from "@mui/material";
import { BsSun } from "react-icons/bs";
import { StarOutline, ListAltOutlined, HouseOutlined, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectGroup, addGroup , setSelectedGroup,fetchGroups } from '../feature/TasksAddSlice';
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useEffect, useState } from "react";

const Sidebar = ({userId}) => {
  const dispatch = useDispatch();
  const groups = useSelector(selectGroup)
  const groupStatus = useSelector(state => state.toDo.groupStatus)
  const defaultGroup=[{id:'1myday' , name:'myday'} ,{id:'2important' , name:'important'} , {id:'3planned' , name:'planned'}]
  const updatedGroup=[ ...defaultGroup,...groups]
  const [newCatagoryName, setNewCatagoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(()=> {
    if(groupStatus ==='idle') {
      dispatch(fetchGroups(1))
    }
   
  },[ dispatch , userId , groupStatus])

  const handleAddCategory = () => {
    const newCategoryName = `untitled${groups.length}`;
    setEditingCategory(newCategoryName);
    setNewCatagoryName(newCategoryName);
  };

  const handelSave = () => {
    if (newCatagoryName) {
      dispatch(addGroup({ userId: 1, group: {name: newCatagoryName } }));
      setNewCatagoryName('');
      setEditingCategory(null);
    }
  };

  const CatagoryItem = (Icon, value, key) => (
    <Link to={`todo/${key}`} key={key} className="w-full">
      <ListItem button onClick={() => dispatch(setSelectedGroup(key))}  className="cursor-pointer">
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText className="capitalize">{value}</ListItemText>
      </ListItem>
      </Link>
  
  );

  const icon = [<BsSun />, <StarOutline />, <ListAltOutlined />, <HouseOutlined />];

  return (
    <div>
      <Drawer anchor="left" open={true} variant="persistent" sx={{ width: 240, boxShadow: '' }}>
        <List sx={{ width: '100%' }} className="flex flex-col items-center justify-center ">
          {/* User Profile Section */}
          <ListItem className="cursor-pointer">
            <div className="rounded-full bg-pink-500 text-white size-14 uppercase flex items-center justify-center text-2xl">HA</div>
            <ListItemText primary='Hanan Abdulshikur' />
          </ListItem>

          {/* Search Bar */}
          <ListItem className="mb-3 mt-4">
          <TextField variant="standard" placeholder="search" size="small" className="outline-none" />
          </ListItem>
          
         
          {updatedGroup.map((group, index) => (
            CatagoryItem(icon[index]?icon[index]:<FormatListBulletedIcon />, group.name, group.id)
          ))}

          <Divider sx={{ width: '100%' }} />


          {/* Input Field for New Category */}
          {editingCategory && (
            <div className="flex items-center gap-2 mt-2 w-44">
              <TextField
                value={newCatagoryName}
                onChange={(e) => setNewCatagoryName(e.target.value)}
                onBlur={handelSave}
                size="small"
                variant="standard"
                autoFocus
              />
              <Button onClick={handelSave}>Save</Button>
            </div>
          )}
        </List>

        {/* Add Category Button */}
        <div className="relative -bottom-6 left-4">
          <Button onClick={handleAddCategory} size="large" startIcon={<AddIcon />}>
            Add Group
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
