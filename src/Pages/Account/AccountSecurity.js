import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material'
import { onValue, ref } from 'firebase/database';
import React, { useState, useEffect, useRef } from 'react'
import '../../index.css';
import { database } from '../../JS/Firebase';

export default function AccountSecurity({ uid }) {

    const emailRef = useRef()
    const [isLoading, setLoading] = useState(false)

    const fields = [
        {
            label: 'Email',
            placeholder: 'johnsmith@gmail.com',
            type: 'email',
            ref: emailRef
        },
        {
            label: 'Password',
            placeholder: 'Use minimum of 6 characters',
            type: 'password',
            ref: emailRef
        },
    ]


    function saveNewCredentials(e) {
        e.preventDefault()
        setLoading(true)
    }
    return (
        <>
            <Box
                sx={{
                    minHeight: '15rem',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem'
                }}>

                <Typography variant='h4'>Edit credentials</Typography>
                <form
                    onSubmit={saveNewCredentials}
                    id='edit-account-security-form'
                    className='edit-account-security-form'>
                    {fields.map((v, k) =>
                        <TextField
                            key={k}
                            label={v.label}
                            variant='filled'
                            type={v.type}
                            size='small'
                            placeholder={v.placeholder}
                            margin='normal' />
                    )}
                    <LoadingButton
                        type='submit'
                        loading={isLoading}
                        variant='contained'
                        sx={{
                            width: 'max-content',
                            marginTop: '1.25rem',
                            textTransform: 'none',
                        }}>Save Changes</LoadingButton>
                </form>
            </Box>

            <Box sx={{
                minHeight: '8rem',
                height: 'auto',
                padding: '1.5rem',
                marginTop: '2rem'
            }}>
                <Typography variant='h4'>Account Deletion</Typography>
            </Box>
        </>
    )
}
