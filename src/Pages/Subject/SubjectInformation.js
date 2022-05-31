import {
    Button, Stack, Typography, Snackbar, Alert, DialogTitle,
    Dialog, DialogActions, DialogContent, DialogContentText,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react'
import { onValue, ref, remove } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';

export default function SubjectInformation({ subjectId }) {

    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [subject, setSubject] = useState({})
    const { role } = useFirebase()
    const nav = useNavigate()
    const btns = [
        {
            label: 'Edit',
            onClick: () => nav(`/subjects/edit-subject/${subjectId}`),
            color: 'info'
        },
        {
            label: 'Delete',
            onClick: () => setOpenDeleteDialog(true),
            color: 'error'
        }
    ]

    useEffect(() => {
        const getSubject = () => onValue(ref(database, `subject/${subjectId}`), snap => {
            if (snap.exists()) {
                setSubject(snap.val())
            }
        })
        getSubject()
    }, [])

    function DeleteSubject(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            remove(ref(database, `subject/${subjectId}`))
                .then(() => {
                    setLoading(false)
                    setOpenDeleteDialog(false)
                    setActionStatus('success')
                    setActionMessage('Successfully Deleted subject')
                    setSnackOpen(true)
                }).catch((err) => {
                    setLoading(false)
                    setOpenDeleteDialog(false)
                    setActionStatus('error')
                    setActionMessage(err.message)
                    setSnackOpen(true)
                });
        }, 1000)
    }


    return (
        <>
            {role !== 'faculty' &&
                <Stack direction="row" spacing={1} sx={{ marginBottom: '1rem' }}>
                    {btns.map((v, k) =>
                        <Button
                            key={k}
                            color={v.color}
                            size='small'
                            onClick={v.onClick}
                            variant='contained'
                            sx={{ textTransform: 'none' }}
                            disableElevation>{v.label}</Button>
                    )}
                </Stack>
            }

            <Typography variant='h4' color='primary'>{`${subject.courseCode} - ${subject.subjectTitle}`}</Typography>
            <Typography variant='subtitle2' color='text.secondary' gutterBottom>{`Credit Units: ${subject.creditUnits}`}</Typography>
            <Typography variant='body1'>{subject.subjectDescription}</Typography>

            <Snackbar
                open={snakcOpen}
                onClose={() => {
                    if (actionStatus === 'success') {
                        setSnackOpen(false)
                        nav('/subjects')
                    } else {
                        setSnackOpen(false)
                    }
                }}
                autoHideDuration={1000}>
                <Alert severity={actionStatus} >
                    {actionMessage}
                </Alert>
            </Snackbar>

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Subject Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this subject?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size='small' sx={{ textTransform: 'none' }} onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <LoadingButton
                        loading={isLoading}
                        size='small'
                        sx={{ textTransform: 'none' }}
                        onClick={DeleteSubject} color='error'>Delete</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
