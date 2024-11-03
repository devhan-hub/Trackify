import { InputAdornment, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { CircleOutlined } from "@mui/icons-material"
import { useState } from "react"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { HouseOutlined } from "@mui/icons-material"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from "react-redux";
import {addTask , removeTask , toggelCompleted, toggelImportant} from '../slice/TasksAdd.tsx' 
interface Task {
  id:string,
  title:string,
  day:string,
  completed:boolean,
  important:boolean,
  catagory:string
};

const InputToDo = () => {
  const dispatch= useDispatch();
  const tasks = useSelector(state=> state.toDo.tasks)
  const [focus, setFocus] = useState(false)
  const [blur, setBlur] = useState(true)
  const [anchorEl, setAnchorEl] = useState({})
  const [title,setTitle]= useState('');
  const[day , setDay]= useState('today')
  const[category , setCatagory]= useState('tasks')

  const handelSubmit=()=>{
    const newTask={
      title,
      day,
      completed:false,
      important:false,
      category
    }
    if(title){
      dispatch(addTask(newTask))
    }
    setTitle('')
    console.log(tasks)
  }
  const handelClick = (event, menuId) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [menuId]: event.currentTarget
    }))
  }

  const handelClose = (menuId) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [menuId]: null
    }))
  }
  return (
    <div className="-mb-6 ">
      <TextField sx={{ paddingBottom: '6px', paddingInline: 4, width: '100%' }}
        type="text"
          onChange={(e)=> setTitle(e.target.value)}
          value={title}
        placeholder="go to mosque friday 12:00 pm"
        id='filled-required'
        variant="filled"
        fullWidth
        slotProps={{
          input: {

            startAdornment: (
              <InputAdornment position="start">
                {blur && <AddIcon />}
                {focus &&  <div className="cursor-pointer" onClick={handelSubmit} onMouseDown={(e) => e.preventDefault()}> <CircleOutlined/></div>}

              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">

                {focus && (
                  <div className="cursor-pointer " onClick={(e) => handelClick(e, 'menu1')} onMouseDown={(e) => e.preventDefault()}>
                    <HouseOutlined />
                    <span className="mr-3">Taskes</span>
                  </div>
                )}
                {focus && (<div className="cursor-pointer" onClick={(e) => handelClick(e, 'menu2')} onMouseDown={(e) => e.preventDefault()}><CalendarMonthOutlinedIcon /></div>)}
              </InputAdornment>
            )
          }
        }}
        onFocus={(e) => { setFocus(true); setBlur(false) }}
        onBlur={() => {
          if (!anchorEl.menu1 && !anchorEl.menu2) {
            setBlur(true);
            setFocus(false);
          }
        }}
      />
      <Menu
        anchorEl={anchorEl['menu1']}
        open={Boolean(anchorEl['menu1'])}
        onClose={() => handelClose('menu1')}

      >
        <MenuItem onClick={() =>{ handelClose('menu1');setCatagory('tasks')}}>Taskes</MenuItem>
        <MenuItem onClick={() =>{ handelClose('menu1'); setCatagory('catagoryTwo')}}>Catagorytwo</MenuItem>
        <MenuItem onClick={() =>{ handelClose('menu1');setCatagory('catagoryThree')}}>CatagoryThree</MenuItem>

      </Menu>

      <Menu
        anchorEl={anchorEl['menu2']}
        open={Boolean(anchorEl['menu2'])}
        onClose={() => handelClose('menu2')}

      >
        <MenuItem onClick={() => {handelClose('menu2'); setDay('today')}} >Today</MenuItem>
        <MenuItem onClick={() => {handelClose('menu2'); setDay('tommorow')}}>Tommorow</MenuItem>
        <MenuItem onClick={() => {handelClose('menu2'); setDay('next day')}}>NextDay</MenuItem>
        <Divider />
        <MenuItem>Calander</MenuItem>
      </Menu>

    </div>
  )
}

export default InputToDo
