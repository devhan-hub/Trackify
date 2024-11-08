import { Button, Divider, InputAdornment, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import { CircleOutlined, CheckCircle, Star, StarBorder, MailRounded } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask } from '../feature/TasksAddSlice.tsx'
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material'
import Fab from '@mui/material/Fab'
import Input from "@mui/material/Input";
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
import {selectCurrentCatgory} from '../feature/SidebarNavSlice.js'

const InputToDo = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({})
   const currentCatagory=useSelector(selectCurrentCatgory)
  const initalState = {
    title: '',
    note: '',
    dueDate: 'today',
    repeat: 'none',
    completed: false,
    important: false,
    catagory:'',
  }

  useEffect(() => {
    setForm({
      title: '',
      note: '',
      dueDate: 'today',
      repeat: 'none',
      completed: false,
      important: false,
      catagory: currentCatagory
    })

  }, [currentCatagory])
  const [pickDate, setPickDate] = useState(false);

  const handelOpen = () => setOpen(true)
  const handelClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'dueDate' && value === 'pickdate')
      setPickDate(true)
    else {
      setPickDate(false)
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const calculateDate = (value) => {
    const now = new Date();
    let dueDate;

    if (value === 'today') {
      dueDate = now;
    } else if (value === 'tomorrow') {
      dueDate = addDays(now, 1);
    } else if (value === 'next-week') {
      dueDate = addDays(now, 7);
    }

    return dueDate.toISOString();
  };
  const handelSubmit = (e) => {
    e.preventDefault()

    const calculatedDueDate = calculateDate(form.dueDate)
    let updatedForm = form;
    if (calculatedDueDate) {
      updatedForm = { ...updatedForm, dueDate: calculatedDueDate };

    }


    if (form) {
      dispatch(addTask(form))
      handelClose()
      console.log(form)
      setForm(initalState)
     
    }


  }

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
      <Tooltip title='Add new task my lettle sweet girl '>
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
          <form onSubmit={handelSubmit} className="flex flex-col space-y-6">
            <TextField
              variant="filled"
              label="task title"
              name="title"
              id="title"
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
            {SelectBox([`today`, `tomorrow`, `next-week`, 'pickDate'], 'Set due ', 'dueDate')}
            {SelectBox(['none', 'daily', 'weekly', 'monthly', 'custom'], 'Repete', 'repeat')}
            <TextField placeholder="Add Note" />
            <Button variant='contained' type="submit" >Add</Button>
          </form>
        </DialogContent>
      </Dialog>
      {pickDate &&
        (
          <div className="h-screen w-screen z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" onChange={(date) => setForm((prev) => ({ ...prev, dueDate: date }))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
    </div>
  )
}
export default InputToDo
