import { Alert, Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogComponent from '../Components/DialogComponent'
import { DummyText } from '../Data/Data'
import { auth } from '../JS/Firebase'

export default function Landing() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isOpen, setOpen] = useState(false)
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
        if (email === '' || pass === '') {
            setError('Email and Password are required')
        } else {
            signInWithEmailAndPassword(auth, email, pass)
                .then(() => {
                    nav('/account')
                }).catch((err) => {
                    setError(err.message)
                });
        }
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
                    onSubmit={SignUpUser}>
                    <Box sx={{
                        borderRadius: '.6rem',
                        padding: '3rem',
                        width: '25rem',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography variant='h4' component='div' gutterBottom >Login</Typography>

                        {formFields.map((v, k) =>
                            <TextField
                                key={k}
                                type={v.type}
                                label={v.label}
                                variant='outlined'
                                margin='normal'
                                required={v.required}
                                onChange={v.onChange} />
                        )}
                        {error && <Alert severity='error' >{error}</Alert>}
                        <Button
                            type='submit'
                            form='sign-up-user-form'
                            style={{
                                textTransform: 'none',
                                marginTop: '1rem',
                            }}
                            variant='contained'
                            size='medium' >Login</Button>
                    </Box>
                </form>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Typography variant='caption'>Don't have an Account?</Typography>
                    <Button onClick={() => nav('/signup')} variant='text' size='small'>Sign up</Button>
                </Box>
            </Container>
        </>
    )
}
