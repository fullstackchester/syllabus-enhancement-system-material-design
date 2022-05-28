import { LoadingButton } from '@mui/lab'
import { Avatar, Button, Grid, Stack, TextField } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState, useEffect } from 'react'

export default function Signup() {
    const [name, setName] = useState()
    const [employeeId, setEmployeeId] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [confirmPass, setConfirmPass] = useState()

    // states for avatar
    const [avatar, setAvatar] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(avatar)
        } else {

        }
    }, [avatar])

    //States for proccess and methods
    const [isLoading, setLoading] = useState(false)

    function signupUser(e) {
        e.preventDefault()
        setLoading(true)

        const newAccount = {
            uid: '',
            employeeId: employeeId,
            photoUrl: avatar.name,
            name: name,
            email: email,
            department: '',
        }
        setTimeout(() => {
            console.log(newAccount)
            setLoading(false)
        }, 1500)
    }

    const signupTextfields = [
        {
            id: 'employee-id',
            label: 'Employee Id',
            placeholder: 'CICT-WMAD-2022-******',
            type: 'text',
            onChange: (e) => setEmployeeId(e.target.value),
            width: 12
        },
        {
            id: 'name',
            label: 'Name',
            placeholder: 'John A. Smith',
            type: 'text',
            onChange: (e) => setName(e.target.value),
            width: 12
        }
    ]

    const credentialTextfields = [
        {
            id: 'email',
            label: 'Email',
            placeholder: 'Use a valid email address',
            type: 'text',
            onChange: (e) => setEmail(e.target.value),
            width: 12
        },

        {
            id: 'password',
            label: 'Password',
            placeholder: 'Use minimum of 6 characters',
            type: 'password',
            onChange: (e) => setPass(e.target.value),
            width: 12
        },
        {
            id: 'confirm-password',
            label: 'Confirm Password',
            placeholder: 'Use minimum of 6 characters',
            type: 'password',
            onChange: (e) => setConfirmPass(e.target.value),
            width: 12
        }
    ]
    return (
        <>
            <Container maxWidth='xl' sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{ width: '35%', minWidth: '30rem', minHeight: '60vh', padding: '1rem' }}>
                    <form
                        id='sign-up-form'
                        onSubmit={signupUser}>
                        <Grid container spacing={2}>
                            {/* UPPER PART OF GRID */}
                            <Grid item xs={12} >
                                <Stack direction='row' spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar sx={{ width: '7rem', height: '7rem', border: '.3rem, solid' }} src={preview} />
                                    <Button
                                        component='label'
                                        variant='contained'
                                        size='small'
                                        sx={{ textTransform: 'none' }}
                                        disableElevation
                                    >
                                        <input
                                            type='file'
                                            accept={`image/*`}
                                            onChange={(e) => {
                                                const file = e.target.files[0]
                                                if (file) {
                                                    setAvatar(file)
                                                } else {
                                                    setAvatar(null)
                                                }
                                            }}
                                            hidden />
                                        Upload
                                    </Button>
                                </Stack>
                            </Grid>
                            {signupTextfields.map((v, k) =>
                                <Grid key={k} item xs={v.width}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        id={v.id}
                                        label={v.label}
                                        placeholder={v.placeholder}
                                        type={v.type}
                                        onChange={v.onChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            )}
                            {credentialTextfields.map((v, k) =>
                                <Grid key={k} item xs={v.width}>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        id={v.id}
                                        label={v.label}
                                        placeholder={v.placeholder}
                                        type={v.type}
                                        onChange={v.onChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <LoadingButton
                                    variant='contained'
                                    size='small'
                                    type='submit'
                                    form='sign-up-form'
                                    loading={isLoading}
                                    sx={{ width: "100%", textTransform: 'none' }}
                                    disableElevation>Create Account</LoadingButton>
                            </Grid>
                        </Grid>

                    </form>
                </Box>
            </Container>
        </>
    )
}
