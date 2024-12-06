import { ButtonBase } from '@mui/material';
import SideDrawer from '../SideDrawer.jsx';
import Navbar from '../Navbar.js';
import { Box, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import useGroupManager from '../../hooks/useGroupManager.jsx';
import AddNewCatagory from './AddNewCatagory.js';
import CatagoryGrid from './CatagoryGrid.jsx';

const Allcatagory = ({ userId }) => {
    const navigate = useNavigate();
    const {allGroup}=useGroupManager(userId)
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCatagory, setSelctedCatagory] = useState(null);

    const handleClick = (groupId) => {
        navigate(`/EachCatagory/${groupId}`);
    }


    return (
        <>
            <AddNewCatagory open={open} setOpen={setOpen} userId={userId} isEdit={isEdit} catagory={selectedCatagory} />
            <Navbar />
            <Box height={70} />
            <Box className='xl:flex px-10 py-8'>
                <SideDrawer />
                <Box sx={{ flexGrow: 1 }} className='space-y-8 p-8 min-h-screen w-full border-[#ccc] shadow-2xl border-2 relative'>
                    <Typography variant='h5' className='underline decoration-slice decoration-[#ff6867] text-[18px]'> All Catagory</Typography>
                    <div className='absolute right-0 top-0 px-10 py-2'>
                        <Tooltip title='Add new catagory'>
                            <ButtonBase className='absolute right-0 top-0' onClick={() => { setOpen(true); setIsEdit(false) }}>
                                <AddIcon className="text-[#ff6867]" sx={{ fontSize: '32px' }} /> Add Catagory
                            </ButtonBase>
                        </Tooltip>
                    </div>

                    <Grid container spacing={4} padding={4} rowSpacing={4} wrap='wrap'>
                        {allGroup.map((catagory) => {
                           
                            return (
                                <Grid item key={catagory.id}>
                                    <CatagoryGrid
                                        catagory={catagory}
                                        setCatagory={setSelctedCatagory}
                                        setOpen={setOpen}
                                        setIsEdit={setIsEdit}
                                        onClick={handleClick}
                                        userId={userId}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Allcatagory;
