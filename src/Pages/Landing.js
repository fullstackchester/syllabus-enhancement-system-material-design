import { Alert, Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../JS/Firebase'
import '../index.css'
import { LoadingButton } from '@mui/lab'

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
            }
            else {
                signInWithEmailAndPassword(auth, email, pass)
                    .then(() => {
                        nav('/dashboard')
                    }).catch((err) => {
                        setError(err.message)
                    });
            }
            setLoading(false)
        }, 1500)
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
                        <img src={require('../Assets/logo.svg').default} height='100' width='100' />
                        <Typography variant='h4'
                            component='div'
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                            gutterBottom >Login</Typography>

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
                        {error && <Alert severity='error' >{error}</Alert>}
                    </Box>
                </form>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Don't have an Account?</Typography>
                    <Button sx={{ textTransform: 'none' }} onClick={() => nav('/signup')} variant='text' size='small'>Sign up</Button>
                </Box>
            </Container>
        </>
    )
}
