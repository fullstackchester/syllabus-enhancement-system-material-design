import { Alert, Stack, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../JS/Firebase'
import '../index.css'
import { LoadingButton } from '@mui/lab'
import ThemeModeSwitch from '../Components/ThemeModeSwitch'
import { AuthError } from '../Data/AuthError'

export default function Landing() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoading, setLoading] = useState(false)
    const nav = useNavigate()

    const [error, setError] = useState('')
    const formFields = [
        {
            label: 'Email',
            onChange: (e) => { setEmail(e.target.value); setError('') },
            type: 'text'
        },
        {
            label: 'Password',
            onChange: (e) => { setPass(e.target.value); setError('') },
            type: 'password'
        },
    ]

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
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <form
                    spellCheck={false}
                    id='sign-up-user-form'
                    className='sign-up-user-form'
                    onSubmit={SignUpUser}>

                    <Box sx={{
                        borderRadius: '.6rem',
                        padding: '2rem',
                        width: '30rem',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Typography variant='h4'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                            gutterBottom >CICT-SEMS</Typography>

                        {formFields.map((v, k) =>
                            <TextField
                                key={k}
                                type={v.type}
                                label={v.label}
                                variant='outlined'
                                margin='dense'
                                size='small'
                                fullWidth
                                required={v.required}
                                onChange={v.onChange} />
                        )}

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
                        {error && <Alert severity='error' sx={{ width: '100%', marginTop: '.75rem' }} >{error}</Alert>}
                    </Box>

                </form>
                <Stack direction='row' spacing={1}>
                    <Typography variant='caption' color='text.secondary' sx={{ fontWeight: 'bold' }}>Don't have an Account?</Typography>
                    <Typography
                        variant='caption' color='primary'
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => nav('/signup')}
                    >Sign up</Typography>
                </Stack>
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
