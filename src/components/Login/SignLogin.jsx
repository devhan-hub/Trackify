import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser, signUpUser, getDetailUser } from '../../Redux/User';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { CircularProgress } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SignLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [mobileLogin, setMobileLogin] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signinStatus = useSelector(state => state.user.signinStatus)
    const signupStatus = useSelector(state => state.user.signupStatus)


    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };



    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: !isLogin ? Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required') : Yup.string(),
        firstName: !isLogin ? Yup.string().required('First name is required') : Yup.string(),
    });

    const handleSubmit = async (values) => {
        if (isLogin) {

            try {
                const userId = await dispatch(signInUser({ email: values.email, password: values.password })).unwrap();

                dispatch(getDetailUser(userId));
                navigate('/');
            } catch (error) {
                console.error("Error during submission:", error); // Log the error
            }

        } else {
            try {
                const userId = await dispatch(signUpUser({ firstName: values.firstName, email: values.email, password: values.password })).unwrap();
                console.log(" i am here");
                dispatch(getDetailUser(userId));
                navigate('/');
            } catch (error) {
                console.error("Error during submission:", error); // Log the error
            }
        }
    };


    const LoginForm = () => (

        <div className='flex flex-col justify-center items-center h-full space-y-4'>
            <Typography sx={{ fontFamily: 'Montserrat' }} variant='h6' className='capitalize'>
                {isLogin ? 'Sign in' : 'Create New Account'}
            </Typography>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: ''
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => (
                    <Form className='flex flex-col gap-4'>
                        {!isLogin && (
                            <>
                                <Field
                                    as={TextField}
                                    variant='outlined'
                                    label='First Name'
                                    name='firstName'
                                    sx={{ fontFamily: 'Montserrat' }}
                                    fullWidth
                                />
                                <ErrorMessage name='firstName' component='div' className='text-red-500' />

                            </>
                        )}
                        <Field
                            as={TextField}
                            variant='outlined'
                            label='Email'
                            name='email'
                            sx={{ fontFamily: 'Montserrat' }}
                            fullWidth
                        />
                        <ErrorMessage name='email' component='div' className='text-red-500' />

                        <Field
                            as={TextField}
                            variant='outlined'
                            label='Password'
                            name='password'
                            type='password'
                            sx={{ fontFamily: 'Montserrat' }}
                            fullWidth
                        />
                        <ErrorMessage name='password' component='div' className='text-red-500' />

                        {!isLogin && (
                            <>
                                <Field
                                    as={TextField}
                                    variant='outlined'
                                    label='Confirm Password'
                                    name='confirmPassword'
                                    type='password'
                                    sx={{ fontFamily: 'Montserrat' }}
                                    fullWidth
                                />
                                <ErrorMessage name='confirmPassword' component='div' className='text-red-500' />
                            </>
                        )}

                        {isLogin && (signinStatus === "loading" ?
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                variant="outlined"

                            >
                                Signing in...
                            </LoadingButton>
                            : <Button type='submit' variant='contained' sx={{ backgroundColor: '#ff6867', color: 'white' }}>
                                Sign In
                            </Button>)}
                        {!isLogin && (signupStatus === "loading" ?
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                variant="outlined"

                            >
                                Signing up...
                            </LoadingButton>
                            : <Button type='submit' variant='contained' sx={{ backgroundColor: '#ff6867', color: 'white' }}>
                                Sign Up
                            </Button>)}
                    </Form>
                )}
            </Formik>
        </div>
    )


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
                <div className='sm:absolute left-0 top-0 size-32 sm:ml-10 sm:mt-2 relative hidden sm:block m-auto'> <img src="Images/logo.png" alt="" /> </div>

                <svg xmlns="http://www.w3.org/2000/svg" className=' absolute top-[20%] svg ' viewBox="0 0 1440 320"><path fill="#f3f3f3" fill-opacity="1" d="M0,320L60,293.3C120,267,240,213,360,181.3C480,149,600,139,720,165.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                <Paper className='div  justify-center items-center w-[800px] max-w-[96%] h-[85vh] mt-auto mb-6 relative space-x-2 overflow-hidden hidden sm:flex ' elevation={3}>
                    <motion.div
                        className={`${isLogin ? 'z-20 opacity-100' : 'z-10 opacity-0'} w-[50%] z-20 absolute left-0 top-0 opacity-100 h-full `}
                        initial={false}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        variants={isLogin ? SignInVariant : SignUpVariant}
                        animate={isLogin ? 'signIn' : 'signUp'}
                    >
                        <LoginForm />

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
            <div className='sm:hidden block'>
                <Dialog
                    fullScreen
                    open={mobileLogin}
                    onClose={() => setMobileLogin(false)}
                    TransitionComponent={Transition}

                    sx={{ backgroundColor: '#ff6867', }}
                    className='bg-opacity-50 sm:hidden'
                >
                    <AppBar sx={{ position: 'relative', backgroundColor: '#ff6867' }}>
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

                    <div className=' flex flex-col justify-center items-center h-full  '
                    >
                        {isLogin && <Typography className='pt-28' variant='h5'>Welcome Back:)</Typography>}
                        {!isLogin && <Typography className='pt-4' variant='h5'>HI 👋, Create New Account</Typography>}

                        <LoginForm />
                    </div>
                </Dialog>
                <div className={`login-body  items-center justify-center h-screen overflow-hidden w-full bg-[#ff6867] flex sm:hidden`} >

                    <div className='pt-40 h-[30%] top-0  absolute flex flex-col gap-4 items-center justify-center'>
                        <div className=' left-0 top-0 size-32  relative sm:hidden  m-auto'> <img src="Images/logo.png" alt="" /> </div>
                        <div className=' size-32  '><img src="Images/home.png" alt="" /></div>
                        <Typography sx={{ color: '#ff6867' }} >Stay Organized, Achieve More</Typography>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className=' absolute top-[50%] svg lg:top-[10%]' viewBox="0 0 1440 320"><path fill="#f3f3f3" fill-opacity="1" d="M0,320L60,293.3C120,267,240,213,360,181.3C480,149,600,139,720,165.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                    <Box className='flex flex-col justify-center items-center gap-4 absolute bottom-[10%]'>
                        <Button variant='outlined' sx={{ borderRadius: '20px', paddingInline: '50px', paddingY: '8px', color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'white', color: '#ff6867', borderColor: '#ff6867', transition: 'all', transitionDuration: '0.5s' } }} onClick={() => { setMobileLogin(true); setIsLogin(true) }} >Sign IN</Button>
                        <Button variant='outlined' sx={{ borderRadius: '20px', paddingInline: '50px', paddingY: '8px', color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'white', color: '#ff6867', borderColor: '#ff6867', transition: 'all', transitionDuration: '0.5s' } }} onClick={() => { setMobileLogin(true); setIsLogin(false) }}>Sign UP</Button>
                    </Box>
                </div>
            </div>
        </>
    )

};

export default SignLogin;





