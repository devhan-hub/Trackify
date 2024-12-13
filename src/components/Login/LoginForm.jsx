import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Typography } from '@mui/material';
import AuthButton from './AuthButton';

import React from 'react'

const LoginForm = ({ isLogin, signinStatus, signupStatus, handleSubmit }) => {

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: !isLogin ? Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required') : Yup.string(),
        firstName: !isLogin ? Yup.string().required('First name is required') : Yup.string(),
    });

  return (
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
                    <Form className='flex flex-col gap-4 justify-center items-center  h-full w-[50%] mx-auto'>
                        <Typography  variant='h6'>{isLogin?'Sign In':' Create new account'}</Typography>
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
                          <AuthButton 
                        isLogin={isLogin}
                        signinStatus={signinStatus}
                        signupStatus={signupStatus}
                    />
     
                       
                    </Form>
                )}
            </Formik>
  )
}

export default LoginForm


