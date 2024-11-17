import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser, signUpUser, getDetailUser } from '../../Redux/User';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: !isLogin ? Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required') : Yup.string(),
        firstName: !isLogin ? Yup.string().required('First name is required') : Yup.string(),
        lastName: !isLogin ? Yup.string().required('Last name is required') : Yup.string(),
    });

    const handleSubmit = async (values) => {
        if (!isLogin) {
            try {
                const userId = await dispatch(signUpUser({firstName:values.firstName , lastName:values.lastName , email:values.email ,password:values.password})).unwrap();
                
                dispatch(getDetailUser(userId));
                navigate('/home');
            } catch (error) {
                
            }
        } else {
            try {
                const userId = await dispatch(signInUser({ email: values.email, password: values.password })).unwrap();
              
                dispatch(getDetailUser(userId));
                navigate('/home');
            } catch (error) {
               
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
<div className='body flex items-center justify-center h-screen overflow-hidden w-full'>
<Paper className='div flex justify-center items-center w-[800px] max-w-[96%] h-[90vh] m-auto relative space-x-2 overflow-hidden bg-green-100' elevation={3}>
    <motion.div
        className={`${isLogin ? 'z-20 opacity-100' : 'z-10 opacity-0'} w-[50%] z-20 absolute left-0 top-0 opacity-100 h-full bg-white`}
        initial={false}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        variants={isLogin ? SignInVariant : SignUpVariant}
        animate={isLogin ? 'signIn' : 'signUp'}
    >
        <div className='flex flex-col justify-center items-center h-full space-y-4'>
            <Typography sx={{ fontFamily: 'Montserrat' }} variant='h6' className='capitalize'>
                {isLogin ? 'Sign in' : 'Create New Account'}
            </Typography>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
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
                                <Field
                                    as={TextField}
                                    variant='outlined'
                                    label='Last Name'
                                    name='lastName'
                                    sx={{ fontFamily: 'Montserrat' }}
                                    fullWidth
                                />
                                <ErrorMessage name='lastName' component='div' className='text-red-500' />
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

                        <Button type='submit' variant='contained' sx={{ backgroundColor: '#FF4B2B', color: 'white' }}>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    </motion.div>
            <motion.div
                initial={false}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                variants={OverLayRight}
                animate={isLogin ? 'signIn' : 'signUp'}
                className={`h-full  absolute left-[50%] top-0 opacity-100 z-20 w-[50%]  `}>

                <div className='bg-[#FF4B2B]  space-y-4 h-[90vh] flex flex-col items-center justify-center text-white'>
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
                <div className='bg-[#FF4B2B]  space-y-4 h-[90vh] flex flex-col items-center justify-center text-white'>
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




