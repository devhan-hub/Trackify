import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'transparent',
    gap: '4px',
    justifyContent: 'center',
    height: 150,
    maxWidth:'max-content',
    width:'max-content',
    lineHeight: '60px',
    borderWidth:'1px',
    borderColor:'#aaa'
}));

const UploadImage = ({ file, setFile }) => {

    const lightTheme = createTheme({ palette: { mode: 'light' } });


    const types = ['image/png', 'image/jpeg', 'video/mp4'];

    const handelChange = (e) => {
        e.preventDefault();
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            console.log(file)
        }
        else {
            setFile(null)
            toast.error('pls seectect an image file (png or jpeg)')
        }
    }
    return (

        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                }}
            >

                <Item  elevation={1} >
                {
  file ? (
    <div className="block w-full h-full">
      <img
        src={URL.createObjectURL(file)}
        alt="Uploaded preview"
        style={{ width: 'auto', height: '100%' , padding:'10px' }}
      />
    </div>
  ) : (
    <Box className="flex flex-col justify-center items-center gap-2 min-w-[200px] sm:min-w-[350px]  w-full">
      <CloudUploadIcon sx={{ fontSize: '60px', color: '#ff6867' }} />
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        size="small"
        sx={{ color: '#555', borderColor: '#333' }}
      >
        Upload images
        <VisuallyHiddenInput type="file" onChange={handelChange} multiple />
      </Button>
    </Box>
  )
}
       </Item>

            </Box>
        </ThemeProvider>

    )
}

export default UploadImage

