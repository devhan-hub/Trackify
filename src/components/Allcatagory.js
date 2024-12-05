import { Paper, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import SideDrawer from './SideDrawer.jsx'
import Navbar from './Navbar.js'
import { Box, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState, } from 'react';
import { addGroup, selectGroup, fetchGroups, editGroup ,deleteGroup } from '../Redux/TasksAddSlice.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material'


export function FormDialog({ open, setOpen, userId, catagory , isEdit }) {
    const dispatch = useDispatch();
    const [catagoryName, setCatagoryName] = useState(isEdit?catagory?.name:'');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCatagory = {
            name: catagoryName,
            task: [],
        }

        try {
            if (!isEdit) {
                await dispatch(addGroup({ userId, group: newCatagory })).unwrap()
                toast.success('successfully added')
                setOpen(false)
                setCatagoryName('')
            }

            else {
                await dispatch(editGroup({ userId, groupId: catagory.id, updated: { ...catagory, name: catagoryName } })).unwrap()
                toast.success('successfully edited')
                setOpen(false)
                setCatagoryName('')
            }

        }
        catch {
            if (isEdit) {
                toast.success('unable to edit')
            }
            else {
                toast.success('unable to add')
            }

        }

    }


    return (
        <>

            <Dialog

                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',

                }}
            >
                <DialogTitle>{isEdit ? 'ADD' : 'Edit'} New Catagory</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="catagory"
                        value={catagoryName}
                        label="Catagory Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setCatagoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>CANCEL</Button>
                    <Button onClick={handleSubmit}>{isEdit ? 'EDIT' : "ADD"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const CatagoryBox = ({ catagory, key, onClick, setCatagory, setOpen, setIsEdit  ,userId}) => {
    const [openDeleteDialog , setOpenDeleteDialog]= useState(false);
    const dispatch = useDispatch()
    

 const handelDelete= async ()=>{
      try{
         await dispatch(deleteGroup({userId ,groupId:catagory.id})).unwrap()
          toast.success('permantely deleted')
          setOpenDeleteDialog(false)
      } catch{
        setOpenDeleteDialog(false)
        toast.success('unabe to delete')
        
      } 
 }

    const DeleteDialog = () =>
    (
    <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>Do you want to delete the  '{catagory.name}' catagory?</DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>CANCEL</Button>
            <Button onClick={handelDelete}>Delete</Button>
        </DialogActions>
    </Dialog>
    )
    return (
        <>
        <DeleteDialog/>
            <div className= ' card  h-[150px] w-[240px]  bg-[#ff6867]  rounded-tl-[30px]   relative border-black overflow-hidden'  key={key} >

                <div className='box  inset-[2px] absolute rounded-[10px] m-auto  bg-white  '>
               <div className='icon absolute bg-[#ff6867]  size-[75px]  rounded-br-[50%]'>
              
                <div className='bg-white absolute p-[8px] rounded-tl-[30px] rounded-br-[30px] m-auto top-1 left-1'><img src="/Images/home.png" alt="" className='size-12' /></div>
                </div>

               <div className='content flex flex-col h-full w-full gap-2 items-center justify-center'>
                
               <Typography variant='h6' className='capitalize '>{catagory.name} </Typography >
                 <Button variant='contained' size='small' sx={{backgroundColor:'#ff6867' , borderRadius:'12px' , paddingInline:'20px'}} onClick={() => onClick(catagory.id)} >Open</Button>
                
               </div>
               <IconButton aria-label="delete" sx={{ color: "#ff6867" , position:'absolute' , top:'0', right:'0' }} className='absolute top-0 right-0'>
                      
                        <Edit onClick={() => { setCatagory(catagory); setOpen(true); setIsEdit(true) }} />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: "#ff6867"  , position:'absolute' , bottom:'0' , left:'0'}}>
                    <Delete onClick={()=>setOpenDeleteDialog(true)} />
                    </IconButton>
               </div>
               </div>

               
            
        </>
    );
}



const Allcatagory = ({ userId }) => {
    const dispatch = useDispatch();
    const AllGroup = useSelector(selectGroup);
    const groupStatus = useSelector((state) => state.toDo.groupStatus)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [catagory, setCatagory] = useState(null)


    useEffect(() => {
        if (groupStatus === 'idle')
            dispatch(fetchGroups(userId))
    }, [groupStatus, userId])


    const handleClick = (groupId) => {
        navigate(`/EachCatagory/${groupId}`)

    }


    return (
        <>

            <FormDialog open={open} setOpen={setOpen} userId={userId} isEdit={isEdit} catagory={catagory} />
            <Navbar />
            <Box height={70} />
            <Box className='xl:flex px-10 py-8'>

                <SideDrawer />

                <Box sx={{ flexGrow: 1 }} className=' space-y-8 p-8 min-h-screen w-full border-[#ccc] shadow-2xl border-2 relative' >
                    <Typography variant='h5' className='underline decoration-slice decoration-[#ff6867] text-[18px]'> All Catagory</Typography>
                    <div className='absolute right-0 top-0 px-10 py-2'>
                        <Tooltip title='Add new catagory  ' >
                            <ButtonBase className='absolute right-0 top-0' onClick={() => { setOpen(true); setIsEdit(false) }}>
                                <AddIcon className="text-[#ff6867] " sx={{ fontSize: '32px' }} /> Add Catagory
                            </ButtonBase>
                        </Tooltip>
                    </div>


                    <Grid container spacing={4} padding={4} rowSpacing={4} wrap='wrap' >
                        {AllGroup.map((catagory) => {

                            return (
                                <Grid item >
                                    <CatagoryBox key={catagory.id} catagory={catagory} setCatagory={setCatagory} setOpen={setOpen} setIsEdit={setIsEdit} onClick={handleClick} userId={userId} />
                                </Grid>
                            )
                        })}
                    </Grid>

                </Box>
            </Box>
        </>
    )
}

export default Allcatagory
