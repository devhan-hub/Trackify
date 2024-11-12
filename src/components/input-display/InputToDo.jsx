import { Button, Divider, InputAdornment, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { CircleOutlined, CheckCircle, Star, StarBorder, MailRounded } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from '../feature/TasksAddSlice.jsx'
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material'
import Fab from '@mui/material/Fab'
import Checkbox from "@mui/material/Checkbox";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { format, addDays } from 'date-fns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputToDo = () => {
  const dispatch = useDispatch();
  let groupId = useSelector(state=> state.toDo.selectedGroupId)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', note: '', dueDate:new Date(), repeat: 'none', completed: false, important: false, category: groupId });
  const [pickDate, setPickDate] = useState(false);


  const handelOpen = () => setOpen(true)
  const handelClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dueDate' && value === 'pickdate') {
      setPickDate(true);
    } else {
      setPickDate(false);
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateDate = (value) => {
    const now = new Date();
    let dueDate;
    if (value === 'today') dueDate = new Date();
    else if (value === 'tomorrow') dueDate = addDays(now ,1);
    else if (value === 'next-week') dueDate = addDays(now , 7);
    return dueDate ? dueDate.toISOString() : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(groupId === '1myday' || groupId === '2important') {
      groupId='4task';
    }
    const updatedForm = {
      ...form,
      category:groupId,
      dueDate: calculateDate(form.dueDate) || form.dueDate.toISOString,
    };
   
    dispatch(addTodo({
      userId: 1,
      groupId,
      todo: updatedForm,
    }));
    setForm({ title: '', note: '', dueDate: new Date(), repeat: 'none', completed: false, important: false, category: groupId });
    handelClose();
  };

  const SelectBox = (menuList, title, name) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel >{title}</InputLabel>
          <Select
            name={name}
            value={form[name]}
            label={title}
            onChange={handleChange}
            className="capitalize"
          >
            {
              menuList.map((menu, index) => {
                return (
                  <MenuItem className="capitalize" key={index} value={menu}>{menu}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    )
  }

  return (
    <div>
      <Tooltip title='Add new task  '>
        <Fab onClick={handelOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handelClose}
      >
        <DialogTitle>
          Add Task
        </DialogTitle>
        <DialogContent >
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <TextField
              variant="filled"
              label="title"
              name="title"
              required
              onChange={handleChange}
              value={form.title}
              InputProps={{
                endAdornment: (

                  <InputAdornment position="end">
                    <Tooltip title='mark as important task'>
                      <Checkbox checked={form.important} icon={<StarBorder />} checkedIcon={<Star />} onClick={() => setForm((prev) => ({ ...prev, important: !prev.important }))} />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
            <Divider />
            {SelectBox([`today`, `tomorrow`, `next-week`, 'pickDate'], 'Set due date', 'dueDate')}
            {SelectBox(['none', 'daily', 'weekly', 'monthly', 'custom'], 'Repete', 'repeat')}
            <TextField
              label="Task Description"
              name="note"
              value={form.note}
              onChange={handleChange}
            />   
                 {pickDate && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={form.dueDate !== 'pickdate' ? form.dueDate :null}
                  onChange={(date) => setForm(prev => ({ ...prev, dueDate: date.toISOString }))}
                />
              </LocalizationProvider>
            )}
            <Button type="submit" variant="contained">Add</Button>
          </form>

        </DialogContent>
      </Dialog>

       
          </div>
  )
}
export default InputToDo
