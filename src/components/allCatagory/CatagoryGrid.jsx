import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Button ,IconButton, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import useGroupManager from '../../hooks/useGroupManager';
import DeleteDialog from '../DeleteDialog';

const  CatagoryGrid = ({ catagory, onClick, setCatagory, setOpen, setIsEdit, userId }) => {
    const {deleteGroupById} = useGroupManager(userId)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handelDelete = async () => {

        const success = await deleteGroupById(catagory.id)
        
        if(success){
            toast.success('permantely deleted')
            setOpenDeleteDialog(false)
        }
        else {
            setOpenDeleteDialog(false)
            toast.error('unabe to delete')
        }
    }
    return (
        <>
        <DeleteDialog handelDelete={handelDelete} content={`${catagory.name} Catagory`} open={openDeleteDialog} setOpen={setOpenDeleteDialog}/>
          
            <div className=' card  h-[150px] w-[240px]  bg-[#ff6867]  rounded-tl-[30px]   relative border-black overflow-hidden'  >

                <div className='box  inset-[2px] absolute rounded-[10px] m-auto  bg-white  '>
                    <div className='icon absolute bg-[#ff6867]  size-[75px]  rounded-br-[50%]'>

                        <div className='bg-white absolute p-[8px] rounded-tl-[30px] rounded-br-[30px] m-auto top-1 left-1'><img src="/Images/home.png" alt="" className='size-12' /></div>
                    </div>

                    <div className='content flex flex-col h-full w-full gap-2 items-center justify-center'>

                        <Typography variant='h6' className='capitalize '>{catagory?.name} </Typography >
                        <Button variant='contained' size='small' sx={{ backgroundColor: '#ff6867', borderRadius: '12px', paddingInline: '20px' }} onClick={() => onClick(catagory.id)} >Open</Button>

                    </div>
                    <IconButton aria-label="delete" sx={{ color: "#ff6867", position: 'absolute', top: '0', right: '0' }} className='absolute top-0 right-0'>

                        <Edit onClick={() => { setCatagory(catagory); setOpen(true); setIsEdit(true) }} />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: "#ff6867", position: 'absolute', bottom: '0', left: '0' }}>
                        <Delete onClick={() => setOpenDeleteDialog(true)} />
                    </IconButton>
                </div>
            </div>



        </>
    );
}

export default CatagoryGrid


