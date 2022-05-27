import { LoadingButton } from '@mui/lab';
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    TextField, Typography, Alert, Snackbar
} from '@mui/material'
import { onValue, ref } from 'firebase/database';
import React, { useState, useEffect, useRef } from 'react'
import '../../index.css';
import { database, auth } from '../../JS/Firebase';
import { updateEmail, updatePassword } from "firebase/auth";
import { useFirebase } from '../../Context/FirebaseContext';

export default function AccountSecurity({ uid }) {

    const { currentUser } = useFirebase()
    const emailRef = useRef()
    const passRef = useRef()
    const [isLoading, setLoading] = useState(false)
    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)

    const fields = [
        {
            label: 'New Email',
            placeholder: 'johnsmith@gmail.com',
            type: 'email',
            ref: emailRef
        },
        {
            label: 'New Password',
            placeholder: 'Use minimum of 6 characters',
            type: 'password',
            ref: passRef
        },
    ]


    function saveNewCredentials(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(function () {
            if (emailRef.current.value !== '' && passRef.current.value !== '') {
                updateEmail(currentUser, emailRef.current.value)
                    .then(() => {
                        updatePassword(currentUser, passRef.current.value)
                            .then(() => {

                                setActionStatus('success')
                                setActionMessage('Succesfull updated email and password')
                                setSnackOpen(true)
                                setLoading(false)

                            }).catch((err) => {
                                setActionStatus('error')
                                setActionMessage(err.message)
                                setSnackOpen(true)
                                setLoading(false)
                            });
                    }).catch((err) => {
                        setActionStatus('error')
                        setActionMessage(err.message)
                        setSnackOpen(true)
                        setLoading(false)
                    });


                // console.log(emailRef.current.value)
                // console.log(passRef.current.value)
                // setActionStatus('success')
                // setActionMessage('Changing Email and Password')
                // setSnackOpen(true)
                // setLoading(false)
            } else {
                setActionStatus('error')
                setActionMessage('Fill up email and password field to proceed.')
                setSnackOpen(true)
                setLoading(false)
            }
        }, 1500)
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
                            variant='outlined'
                            type={v.type}
                            size='small'
                            inputRef={v.ref}
                            placeholder={v.placeholder}
                            margin='dense' />
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
                <Typography variant='subtitle1'>This will delete all of your data ( basic information, passwords )</Typography>
                <Button
                    variant='contained'
                    color='error'
                    onClick={() => setConfirmDeleteDialogOpen(true)}
                    sx={{
                        textTransform: 'none',
                    }}>Delete Account</Button>
            </Box>

            <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete your Account? You will not be able to see important data and updates</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='info' onClick={() => setConfirmDeleteDialogOpen(false)}>Cancel</Button>
                    <Button color='error'>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snakcOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}  >
                <Alert severity={actionStatus}>{actionMessage}</Alert>
            </Snackbar>
        </>
    )
}
