import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from "@mui/material";
import { BsSun } from "react-icons/bs";
import { StarOutline, ListAltOutlined, HouseOutlined, Add as AddIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggelType, addCatagory, selectAddedCatagory, selectDefaultCatagory } from '../feature/SidebarNavSlice';
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const addedCatagory = useSelector(selectAddedCatagory);
  const defaultCatogory = useSelector(selectDefaultCatagory);
  const [newCatagoryName, setNewCatagoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    const newCategoryName = `untitled${addedCatagory.length + 1}`;
    setEditingCategory(newCategoryName);
    setNewCatagoryName(newCategoryName);
  };

  const handelSave = () => {
    if (newCatagoryName) {
      dispatch(addCatagory(newCatagoryName));
      setNewCatagoryName('');
      setEditingCategory(null);
    }
  };

  const CatagoryItem = (Icon, value, key) => (
    <Link to={`/todo/${value}`} key={key} className="-ml-20">
      <ListItem button onClick={() => dispatch(toggelType(value))} >
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
          {/* Default Categories */}
          {defaultCatogory.map((category, index) => (
            CatagoryItem(icon[index], category, `default-${index}`)
          ))}

          <Divider sx={{ width: '100%' }} />

          {/* User-Added Categories */}
          {addedCatagory.length > 0 && addedCatagory.map((category, index) => (
            <Link to={`/todo/${category}`} key={`added-${index}`} className="-ml-10">
              <ListItem button onClick={() => dispatch(toggelType(category))}>
                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            </Link>
          ))}

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
