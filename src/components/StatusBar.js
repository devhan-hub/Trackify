import {CircularProgress , Container , Box , Typography , Grid , Checkbox} from '@mui/material'
import { Circle ,   AssignmentOutlined  } from '@mui/icons-material'

export default function  Progress ({completedTask , totalTask}) {
    return (
      <div sx={{ backgroundColor: 'white' }} className="shadow-2xl h-full  px-16  py-12">
      <Box className='space-y-2  '>
        <Typography variant='h6' >
           <AssignmentOutlined  />  <span className="text-[#ff6867]">Task Status</span>
        </Typography>
  
        <Grid container  spacing={6}>
        <Grid item  >
           
           <CircularProgress
             variant="determinate"
             value={80}
             size={100}
             thickness={4}
             color="success"
           />
         
         <div> <Checkbox checked size="small"  checkedIcon={<Circle/>} sx={{color:'green', '&.Mui-checked': {
                  color:'green'}}}/> <span className='capitalize text-[1.18rem]'>Completed</span> </div>  
         
       </Grid>
          <Grid item  >
           
              <CircularProgress
                variant="determinate"
                value={60}
                size={100}
                thickness={4}
                sx={{color:'red' }}
              />
            
            <div> <Checkbox checked size="small" checkedIcon={<Circle/>} sx={{color:'red', '&.Mui-checked': {
                  color:'red'}}}/> <span className='capitalize text-[1.18rem]'>InComplete</span> </div>  
            
          </Grid>
          
        </Grid>
  
      </Box>
    </div>)
  }