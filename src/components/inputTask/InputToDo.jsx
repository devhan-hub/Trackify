import { Button, TextField } from "@mui/material"
import { Circle, Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from '../../Redux/User.jsx'
import { addTodo  , updateTodo} from '../../Redux/TasksAddSlice.jsx'
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material'
import Checkbox from "@mui/material/Checkbox";
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ButtonBase } from '@mui/material'
import dayjs from 'dayjs';
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import useTaskManager from "../../hooks/useTaskManager.jsx";



const InputToDo = ({isEdit , todo  , open , setOpen , groupId}) => {
  const userId = useSelector(selectUserId);
  const {add,edit}=useTaskManager(userId )
  const todoStatus= useSelector((state)=> state.toDo.todoStatus)
  const [todoId , setTodoId]= useState(null)
  const [file, setFile] = useState(null);
  const [priority, setPriority] = useState('none');
  const [checkedPriority, setCheckedPriority] = useState(false)
  const [form, setForm] = useState('');


  const initalForm =()=>{
    setForm({ title: '', description: '', priority: 'none', dueDate:dayjs(), catagory:groupId, image: 'Images/doit.jpg',completed:false });
  
   }

  useEffect(()=>{ 
    if(!isEdit){
      initalForm()
    }
    else {
      if(todo)
      { 
      
        let {id ,dueDate, ...rest}= todo;
        dueDate=dayjs(dueDate.toDate())
      
        setForm({dueDate ,...rest})
        setTodoId(id);
      }
    
    }
     }
  , [todo]);
  const handelClose = () => { setOpen(false); setFile(null) }
  const handelCloseAll = () => { setOpen(false); }
  
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange=(newValue)=>{
   if(newValue){
    setForm(prev => ({ ...prev, dueDate:newValue }));
   }
    
  }


  const handleSubmit =async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...form,
      priority: priority,
      dueDate: Timestamp.fromDate(form.dueDate.toDate()),
      image: file?file:form.image,
    };

    const success=isEdit
     ? await edit(todoId ,updatedForm,groupId )
    : await add(updatedForm,groupId)

    if(success){
      isEdit? toast.success('successfully edited'): toast.success('successfully added')
      initalForm()
      handelClose();
    }
    else {
      isEdit?  toast.error('unable to edit') :  toast.error('unable to add') 
      initalForm()
      handelClose();
    }

  };


  const handelPriorityChange = (selectedpriority) => {
    if (checkedPriority === selectedpriority) {
      setCheckedPriority('');
      setPriority('none')
    }
    else {
      setCheckedPriority(selectedpriority);
      setPriority(selectedpriority);
    }
  }

  return (
    <div >
      
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handelClose}
        maxWidth={'md'}
        sx={{
          marginY: '-20px'
        }}
      >
        <div className='flex flex-col gap-4 p-4'>
          <DialogTitle className="flex justify-between items-center">
            <p className='underline decoration-slice decoration-[#ff6867] text-[18px]'>{isEdit?'Edit the Task': 'Add New Task'}</p>
            <Button onClick={handelCloseAll} sx={{ color: 'black', fontSize: '16px', textTransform: "capitalize" }}>
              GoBack
            </Button>
          </DialogTitle>

          <DialogContent sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit} className="flex flex-col w-full justify-start px-6 py-4 border-2 shadow-lg border-[#f1f1f1]  item-start gap-y-4 ">

              <div className='md:grid grid-cols-12 gap-4 items-center'>
                <div className='  w-full col-span-8 '>
                  <label htmlFor="title" className='block mb-2  font-bold text-[15px]'>
                    Title
                  </label>
                  <TextField
                    id="title"
                    name="title"
                    required
                    onChange={handleChange}
                    value={form.title}
                    sx={{ width: '100%' }}
                  />
                </div>
                <div className='col-span-4 mt-2 font-bold'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <label className='block mb-2  font-bold text-[15px]'>
                      Due Date
                    </label>
                    <DatePicker
                      value={dayjs(form.dueDate)}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} name="dueDate" fullWidth />}
                    />


                  </LocalizationProvider>
                </div>
              </div>
              <Box>
                <p className="font-bold text-[18px]">Priority</p>
                <Box className="priority flex gap-x-4 flex-wrap items-center justify-start">
                  <ButtonBase className="flex items-center justify-center gap-1" onClick={() => handelPriorityChange('extreme')}>
                    <Circle sx={{ fontSize: '15px', color: '#f21e1e' }} />
                    <span className="text-opacity-85">Extreme</span>
                    <Checkbox checked={checkedPriority == 'extreme'} />
                  </ButtonBase>
                  <ButtonBase className="flex items-center justify-center gap-1" onClick={() => handelPriorityChange('moderate')}>
                    <Circle sx={{ fontSize: '15px', color: '#3abeff' }} />
                    <span className="text-opacity-85">Moderate</span>
                    <Checkbox checked={checkedPriority == 'moderate'} />
                  </ButtonBase>
                  <ButtonBase className="flex items-center justify-center gap-1" onClick={() => handelPriorityChange('low')}>
                    <Circle sx={{ fontSize: '15px', color: '#05a301' }} />
                    <span className="text-opacity-85">Low</span>
                    <Checkbox checked={checkedPriority == 'low'} />
                  </ButtonBase>
                </Box>
              </Box>
              <div className='md:flex justify-center items-center'>
                <div style={{ marginBottom: '1rem', width: '100%' }}>
                  <label htmlFor="taskDescription" className='block mb-2  font-bold text-[15px]'>
                    Task Description
                  </label>
                  <TextField
                    id="taskDescription"
                    placeholder="write here..."
                    name="description"
                    fullWidth
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    rows={5}
                    sx={{ width: '100%' }}
                  />
                </div>
              </div>
              <Button type="submit"  variant="contained" className="self-start"  disabled={todoStatus==='loading'}>{isEdit ?'Edit':'Add'}</Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>



    </div >
  )
}
export default InputToDo
