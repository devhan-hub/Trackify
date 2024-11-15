import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import zIndex from '@mui/material/styles/zIndex';

const SignLogin = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const SignInVariant = {
        signIn: { x: 0, opacity: 1 },
        signUp: { x: '100%', opacity: 0 }
    }
    const SignUpVariant = {
        signIn: { x: 0, opacity: 0, zIndex: '10' },
        signUp: { x: '100%', opacity: 1, zIndex: '100' }
    }

    const OverLayRight = {
        signIn: { x: 0, opacity: 1 },
        signUp: { x: '-100%', opacity: 0 }
    }
    const OverLayLeft = {
        signIn: { x: 0, opacity: 0, zIndex: '20' },
        signUp: { x: '-100%', opacity: 1, zIndex: '100' }
    }


    return (
        <div className='body flex items-center justify-center h-screen overflow-hidden   w-full'>
            <Paper className='div flex  justify-center items-center w-[800px] max-w-[96%] h-[70vh] m-auto relative  space-x-2 overflow-hidden bg-green-100  ' elevation={3}>
                <motion.div
                    className={` w-[50%] z-20 absolute left-0 top-0 opacity-100  h-full bg-white `}
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    variants={SignInVariant}
                    animate={isLogin ? 'signIn' : 'signUp'}
                >
                   <div className='flex flex-col justify-center items-center h-full space-y-4'>
                    
                    <Typography sx={{ fontFamily: 'Montserrat' }} variant='h4' className='capitalize'>
                        Sign in
                    </Typography>
                    <form className='flex flex-col gap-4'>
                        {!isLogin && (
                            <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Name' />
                        )}
                        <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Email' />
                        <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Password' />
                        <Button type='submit' variant='contained' sx={{ backgroundColor: '#FF4B2B', color: 'white' }}>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                    </div>
                </motion.div>

                <motion.div
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    variants={SignUpVariant}
                    animate={isLogin ? 'signIn' : 'signUp'}
                    className={`  w-[50%] absolute left-0 top-0 opacity-0 bg-white z-10 h-full`}>

                        <div className='flex flex-col  justify-center items-center h-full space-y-4'>
                    <Typography sx={{ fontFamily: 'Montserrat' , fontSize:'28px' }} variant='h4' className='capitalize'>
                        Create New Account
                    </Typography>
                    <form className='flex flex-col gap-4'>
                        {!isLogin && (
                            <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Name' />
                        )}
                        <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Email' />
                        <TextField sx={{ fontFamily: 'Montserrat' }} variant='outlined' label='Password' />
                        <Button type='submit' variant='contained' sx={{ backgroundColor: '#FF4B2B', color: 'white' }}>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                    </div>
                </motion.div>
                <motion.div
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    variants={OverLayRight}
                    animate={isLogin ? 'signIn' : 'signUp'}
                    className={`h-full  absolute left-[50%] top-0 opacity-100 z-20 w-[50%]  `}>

                    <div className='bg-[#FF4B2B]  space-y-4 h-[70vh] flex flex-col items-center justify-center text-white'>
                        <Typography sx={{ fontFamily: 'Montserrat', fontSize: '30px', textAlign: 'center' }} variant='h1'>Hellow Friend 👋</Typography>
                        <Typography sx={{ fontFamily: 'Montserrat', fontSize: '15px', textAlign: 'center' }} variant='p' >Enter yor personal detail and start organizing your task with us 🥰</Typography>

                        <button
                            onClick={handleToggle}
                            className='shadow-2xl w-[150px] rounded-full bg-transparent border-[1px] p-2 '
                        >
                            SIGN UP
                        </button>
                    </div>
                </motion.div>
                <motion.div

                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    variants={OverLayLeft}
                    animate={isLogin ? 'signIn' : 'signUp'}
                    className={`h-full absolute left-[50%] top-0 opacity-0 z-10 w-[50%] `}>
                    <div className='bg-[#FF4B2B]  space-y-4 h-[70vh] flex flex-col items-center justify-center text-white'>
                        <Typography sx={{ fontFamily: 'Montserrat', fontSize: '30px', textAlign: 'center' }} variant='h1'>Welcome Back :)</Typography>
                        <Typography sx={{ fontFamily: 'Montserrat', fontSize: '15px', textAlign: 'center' }} variant='p' >Login with your Email and password</Typography>
                        <button
                            onClick={handleToggle}

                            className='shadow-2xl w-[150px] rounded-full bg-transparent border-[1px] p-2 '
                        >
                            SIGN IN
                        </button>
                    </div>
                </motion.div>
            </Paper>
        </div>
    );
};

export default SignLogin;
