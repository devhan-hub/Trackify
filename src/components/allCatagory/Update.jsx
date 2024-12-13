import { useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Typography } from "@mui/material";
import { toast } from 'react-toastify';
import useGroupManager from '../../hooks/useGroupManager';
import DeleteDialog from '../DeleteDialog';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/User';
import AddNewCatagory from './AddNewCatagory';

export default function Update({name , id}) {
    const userId = useSelector(selectUserId)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { deleteGroupById } = useGroupManager(userId)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);


    const handelDelete = async () => {

        const success = await deleteGroupById(id)

        if (success) {
            toast.success('permantely deleted')
            setOpenDeleteDialog(false)
        }
        else {
            setOpenDeleteDialog(false)
            toast.error('unabe to delete')
        }
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div>
            <DeleteDialog handelDelete={handelDelete} content={`${name} Catagory`} open={openDeleteDialog} setOpen={setOpenDeleteDialog} />
            <AddNewCatagory open={openEditDialog} setOpen={setOpenEditDialog} userId={userId} isEdit={true} catagory={{name , id}}  />
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon   className='text-[#2196f3] '/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            width: '20ch',
                            color:'#2196f3'
                        },
                    },
                }}
            >
                <MenuItem  onClick={() => { setOpenEditDialog(true);handleClose() }}>
                    <Edit /> <span className='px-2'>Edit</span>
                </MenuItem>
                <MenuItem  onClick={() => setOpenDeleteDialog(true)}>
                    <Delete /> <span className='px-2'>Delete</span>
                </MenuItem>

            </Menu>
        </div>
    );
}


