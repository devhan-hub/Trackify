
import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm.jsx';
import Slide from '@mui/material/Slide';
import {  Typography, Button, Box } from '@mui/material';



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MobileView = ({ mobileLogin, setMobileLogin, isLogin, signinStatus, signupStatus, handleSubmit , setIsLogin }) => {
    return (
        <div className='sm:hidden block'>
            <Dialog
                fullScreen
                open={mobileLogin}
                onClose={() => setMobileLogin(false)}
                TransitionComponent={Transition}
               className='sm:hidden block'
            >
                <AppBar sx={{ position: 'relative', }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setMobileLogin(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className="flex flex-col justify-center items-center h-full">
                    {isLogin && <Typography className="pt-28" variant="h5">Welcome Back :)</Typography>}
                    {!isLogin && <Typography className="pt-4" variant="h5">HI 👋, Create New Account</Typography>}

                    <LoginForm
                        isLogin={isLogin}
                        signinStatus={signinStatus}
                        signupStatus={signupStatus}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </Dialog>

            <div className={`login-body  items-center justify-center h-screen overflow-hidden w-full bg-[#42a5f5] flex sm:hidden`} >

                <div className='pt-0 h-[50%] top-0  absolute flex flex-col gap-4 items-center justify-center bg-[#f3f3f3] w-full'>
                    <div className=' left-0 top-0 size-32  relative sm:hidden  m-auto'> <img src="Images/logo2.png" alt="" /> </div>
                    <div className=' size-20  '><img src="Images/home.png" alt="" /></div>
                    <Typography sx={{ color: '#42a5f5' }} >Stay Organized, Achieve More</Typography>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className=' absolute top-[50%] svg lg:top-[20%]' viewBox="0 0 1440 320"><path fill="#f3f3f3" fill-opacity="1" d="M0,320L60,293.3C120,267,240,213,360,181.3C480,149,600,139,720,165.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                <Box className='flex flex-col justify-center items-center gap-4 absolute bottom-[10%]'>
                    <Button variant='outlined' sx={{ borderRadius: '20px', paddingInline: '50px', paddingY: '8px', color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'white', color: '#42a5f5', borderColor: '#42a5f5', transition: 'all', transitionDuration: '0.5s' } }} onClick={() => { setMobileLogin(true); setIsLogin(true) }} >Sign IN</Button>
                    <Button variant='outlined' sx={{ borderRadius: '20px', paddingInline: '50px', paddingY: '8px', color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'white', color: '#42a5f5', borderColor: '#42a5f5', transition: 'all', transitionDuration: '0.5s' } }} onClick={() => { setMobileLogin(true); setIsLogin(false) }}>Sign UP</Button>
                </Box>
            </div>
        </div>
    )
}

export default MobileView
