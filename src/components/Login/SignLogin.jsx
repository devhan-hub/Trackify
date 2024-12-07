import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser, signUpUser, getDetailUser } from '../../Redux/User';
import LoginForm from './LoginForm';
import MobileView from './MobileView.js';

const SignLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [mobileLogin, setMobileLogin] = useState(false);
    const dispatch = useDispatch();
    const signinStatus = useSelector((state) => state.user.signinStatus);
    const signupStatus = useSelector((state) => state.user.signupStatus);
    const navigate = useNavigate();


    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const handleSubmit = async (values) => {
        if (isLogin) {

            try {
                const userId = await dispatch(signInUser({ email: values.email, password: values.password })).unwrap();

               await dispatch(getDetailUser(userId)).unwrap();
                navigate('/')
            } catch (error) {
                console.error("Error during submission:", error);
            }

        } else {
            try {
                const userId = await dispatch(signUpUser({ firstName: values.firstName, email: values.email, password: values.password })).unwrap();
              
                await dispatch(getDetailUser(userId)).unwrap();
                navigate('/')
           
            } catch (error) {
                console.error("Error during submission:", error);
            }
        }
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
        <>
            <div className={`login-body  items-center justify-center h-screen overflow-hidden w-full bg-[#ff6867] hidden sm:flex `} >
              <div className='absolute top-0 h-[20%] w-full bg-[#f3f3f3]'>
              <div className=' left-0 top-0 size-32 sm:ml-10 sm:mt-2 relative hidden sm:block m-auto'> <img src="Images/logo.png" alt="" /> </div>

              </div>
                <svg xmlns="http://www.w3.org/2000/svg" className=' absolute top-[20%] svg ' viewBox="0 0 1440 320"><path fill="#f3f3f3" fill-opacity="1" d="M0,320L60,293.3C120,267,240,213,360,181.3C480,149,600,139,720,165.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                <Paper className='div  justify-center items-center w-[800px] max-w-[96%] h-[85vh] mt-auto mb-6 relative space-x-2 overflow-hidden hidden sm:flex ' elevation={3}>
                    <motion.div
                        className={`${isLogin ? 'z-20 opacity-100' : 'z-10 opacity-0'} w-[50%] z-20 absolute left-0 top-0 opacity-100 h-full `}
                        initial={false}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        variants={isLogin ? SignInVariant : SignUpVariant}
                        animate={isLogin ? 'signIn' : 'signUp'}
                    >
                       <LoginForm
                            isLogin={isLogin}
                            signinStatus={signinStatus}
                            signupStatus={signupStatus}
                            handleSubmit={handleSubmit}
                        />

                    </motion.div>
                    <motion.div
                        initial={false}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        variants={OverLayRight}
                        animate={isLogin ? 'signIn' : 'signUp'}
                        className={`min-h-full  absolute left-[45%] top-0 opacity-100 z-20 w-[55%] hidden sm:block `}>

                        <div className='bg-[#ff6867]  space-y-4 h-[90vh] rounded-bl-full flex flex-col items-center justify-center text-white'>
                            <Typography sx={{ fontFamily: 'Montserrat', fontSize: '30px', textAlign: 'center' }} variant='h1'>Hellow Friend 👋</Typography>
                            <Typography sx={{ fontFamily: 'Montserrat', fontSize: '15px', textAlign: 'center' }} className='w-[70%] mx-auto' variant='p' >Enter yor personal detail and start organizing your task with us 🥰</Typography>

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
                        className={`min-h-full absolute left-[50%] top-0 opacity-0 z-10 w-[50%] hidden sm:block `} >
                        <div className='bg-[#ff6867]  space-y-4 h-[90vh] flex flex-col items-center rounded-br-full justify-center text-white'>
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
            
            <MobileView
                mobileLogin={mobileLogin}
                setMobileLogin={setMobileLogin}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                signinStatus={signinStatus}
                signupStatus={signupStatus}
                handleSubmit={handleSubmit}
            />
        </>
    )

};

export default SignLogin;





