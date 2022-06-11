import { Alert, Stack, TextField, Typography, Card } from '@mui/material'
import { Box, Container } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../JS/Firebase'
import '../index.css'
import { LoadingButton } from '@mui/lab'
import ThemeModeSwitch from '../Components/ThemeModeSwitch'
import { AuthError } from '../Data/AuthError'
import PasswordField from '../Components/PasswordField'
import { motion } from 'framer-motion'

export default function Landing() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const nav = useNavigate()

    const [error, setError] = useState('')


    function SignUpUser(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(function () {
            if (email === '' || pass === '') {
                setError('Email and Password are required')
                setLoading(false)
            }
            else {
                signInWithEmailAndPassword(auth, email, pass)
                    .then(() => {
                        setLoading(false)
                        nav('/dashboard')
                    }).catch((err) => {
                        for (let key in AuthError) {
                            if ((err.code).replace('auth/', '') === key) {
                                setError(AuthError[key])
                                setLoading(false)
                            }
                        }
                    });
            }
        }, 500)
    }

    return (
        <>
            <Container
                maxWidth='xl'
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <Box
                    component={Card}
                    elevation={3}
                    sx={{
                        minWidth: '30rem',
                        width: '35%',
                        minHeight: '20rem',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: "column"
                    }}>
                    <Typography variant='h5' sx={{ fontWeight: '600' }} >Welcome</Typography>
                    <Typography variant='subtitle2' color='text.secondary'>Login to your account</Typography>
                    <Box
                        component='form'
                        spellCheck={false}
                        id='sign-up-user-form'
                        className='sign-up-user-form'
                        onSubmit={SignUpUser}
                    >
                        <TextField
                            type='text'
                            label='Email'
                            variant='outlined'
                            margin='dense'
                            size='small'
                            fullWidth
                            required={true}
                            onChange={(e) => { setEmail(e.target.value); setError('') }}
                            sx={{ marginTop: '2rem' }} />
                        <PasswordField
                            width={'100%'}
                            value={pass}
                            onChange={(e) => {
                                setPass(e.target.value)
                                setError('')
                            }}
                            label='Password'
                            fieldId='password'
                            required={true}
                            isShowPass={showPass}
                            togglePass={() => showPass ? setShowPass(false) : setShowPass(true)}
                        />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '1rem'
                        }}>
                            <Stack direction='row' sx={{ fontWeight: 'bold' }}>
                                <Typography variant='caption' sx={{ fontWeight: '500' }}>Keep me logged in</Typography>
                            </Stack>
                            <Typography
                                onClick={() => nav(`/authentication/forget-password`)}
                                variant='caption'
                                color='primary'
                                sx={{ fontWeight: '500', cursor: 'pointer' }}>Forget Password?</Typography>
                        </Box>

                        <LoadingButton
                            type='submit'
                            form='sign-up-user-form'
                            loading={isLoading}
                            style={{
                                textTransform: 'none',
                                marginTop: '.75rem',
                                width: '100%'
                            }}
                            disableElevation
                            variant='contained'
                            size='medium' >Login</LoadingButton>
                    </Box>
                </Box>
            </Container>

            <Box sx={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem'
            }}>
                <ThemeModeSwitch />
            </Box>
        </>
    )
}
