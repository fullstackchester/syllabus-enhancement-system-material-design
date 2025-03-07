import { Stack, TextField, Typography, Card } from '@mui/material'
import { Box, Container } from '@mui/system'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../JS/Firebase'
import '../../index.scss'
import { LoadingButton } from '@mui/lab'
import ThemeModeSwitch from '../../Components/ThemeModeSwitch'
import { AuthError } from '../../Data/AuthError'
import PasswordField from '../../Components/PasswordField'
import { useFirebase } from '../../Context/FirebaseContext'
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'
import { landingPageStyles } from './landing.styles'

export default function Landing() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    /* custom styles */
    const {
        container,
        box1,
        box2,
        box3,
        loadingButton
    } = landingPageStyles;

    const dispatch = useDispatch()
    const nav = useNavigate()

    const [error, setError] = useState('')
    const { currentUser } = useFirebase()

    function SignUpUser(e) {
        e.preventDefault()
        setLoading(true)
        if (email === '' || pass === '') {
            dispatch(notify({
                status: 'error',
                message: 'Email and Password and required',
                visible: true
            }))
            setLoading(false)
        }
        else {
            signInWithEmailAndPassword(auth, email, pass)
                .then(() => {
                    setLoading(false)
                }).catch((err) => {
                    for (let key in AuthError) {
                        if ((err.code).replace('auth/', '') === key) {
                            dispatch(notify({
                                status: 'error',
                                message: AuthError[key],
                                visible: true
                            }))
                            setLoading(false)
                        }
                    }
                });
        }
    }

    return (
        <>
            <Container
                maxWidth    = 'xl'
                initial     = {{ opacity: 0 }}
                animate     = {{ opacity: 1 }}
                exit        = {{ opacity: 0 }}
                sx          = {container}>
                <Box // box1
                    component   = { Card }
                    elevation   = { 3 }
                    sx          = { box1 }>
                    <Typography 
                        variant = 'h5'
                        sx      = {{ fontWeight: '600' }}>
                        Welcome
                    </Typography>
                    <Typography
                        variant = 'subtitle2'
                        color   = 'text.secondary'>
                        Login to your account
                    </Typography>
                    <Box
                        component   = 'form'
                        spellCheck  = { false }
                        id          = 'sign-up-user-form'
                        className   = 'sign-up-user-form'
                        onSubmit    = { SignUpUser }
                    >
                        <TextField
                            fullWidth
                            type        = 'text'
                            label       = 'Email'
                            variant     = 'outlined'
                            margin      = 'dense'
                            size        = 'small'
                            onChange    = {(e) => { setEmail(e.target.value); setError('') }}
                            sx          = {{ marginTop: '2rem' }} />
                        <PasswordField
                            width       = {'100%'}
                            value       = {pass}
                            onChange    = {(e) => {
                                setPass(e.target.value)
                                setError('')
                            }}
                            require     = {false}
                            label       = 'Password'
                            fieldId     = 'password'
                            isShowPass  = { showPass }
                            togglePass  = {() => showPass ? setShowPass(false) : setShowPass(true)}
                        />
                        <Box // box2
                            sx  = { box2 }>
                            <Typography
                                onClick = {() => nav(`/authentication/forget-password`)}
                                variant = 'body2'
                                color   = 'primary'
                                sx      = {{ fontWeight: '500', cursor: 'pointer' }}>
                                Forget Password?
                            </Typography>
                        </Box>

                        <LoadingButton
                            type    = 'submit'
                            form    = 'sign-up-user-form'
                            loading = { isLoading }
                            style   = { loadingButton }
                            variant = 'contained'
                            size    = 'medium'
                            disableElevation>
                            Login
                        </LoadingButton>
                    </Box>
                    <Stack
                        direction='row'
                        sx={{
                            marginTop: '1rem',
                            justifyContent: 'center',
                        }}>
                        <Typography variant='body2'> Don't have an account?</Typography>
                        <Typography
                            variant = 'body2'
                            color   = 'primary'
                            sx      = {{
                                marginLeft: '.5rem',
                                cursor:     'pointer',
                            }}
                            onClick = {() => nav('/signup')}>Sign up</Typography>
                    </Stack>
                </Box>
            </Container>
            <Box // box3
                sx={ box3 }>
                <ThemeModeSwitch />
            </Box>
        </>
    )


}
