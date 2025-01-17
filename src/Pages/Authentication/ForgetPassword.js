import React, { useState } from 'react'
import { Container, Box } from '@mui/system'
import { Card, Typography, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../JS/Firebase'
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'
import ThemeModeSwitch from '../../Components/ThemeModeSwitch'

export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()


    function sendResetPasswordMail(e) {
        e.preventDefault()
        setLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setLoading(false)
                dispatch(notify({
                    status: 'success',
                    message: 'Password reset email sent!',
                    visible: true
                }))
            }).catch((err) => {
                dispatch(notify({
                    status: 'success',
                    message: err.message,
                    visible: true
                }))
            });
    }

    return (
        <Container
            maxWidth='xl'
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
                    height: 'auto',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: "column"
                }}>
                <Typography variant='h5' sx={{ fontWeight: '600' }} >Forget Password</Typography>
                <Typography variant='body2' color='text.secondary'>Enter your email so we can send the password reset mail</Typography>
                <Box
                    component='form'
                    spellCheck={false}
                    id='forget-password-form'
                    className='forget-password-form'
                    onSubmit={sendResetPasswordMail}
                >
                    <TextField
                        type='text'
                        label='Email'
                        variant='outlined'
                        margin='dense'
                        size='small'
                        fullWidth
                        required={true}
                        onChange={(e) => { setEmail(e.target.value) }}
                        sx={{ marginTop: '2rem' }} />
                    <Typography variant='subtitle2' color='primary'>Email provided must be valid in order to receive the password reset email.</Typography>
                    <LoadingButton
                        type='submit'
                        form='forget-password-form'
                        loading={isLoading}
                        style={{
                            textTransform: 'none',
                            marginTop: '.75rem',
                            width: '100%'
                        }}
                        disableElevation
                        variant='contained'
                        size='medium' >Send Password Reset Email</LoadingButton>
                </Box>
            </Box>
            <Box sx={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem'
            }}>
                <ThemeModeSwitch />
            </Box>
        </Container>
    )
}