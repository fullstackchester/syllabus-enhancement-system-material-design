import { Alert, Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useEffect, useState, useRef } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { database, storage } from '../../JS/Firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";

export default function FacultyEdit() {
    const [isLoading, setLoading] = useState(false)
    const [isFetching, setFetching] = useState(true)
    const [user, setUser] = useState({})
    const [dept, setDept] = useState('')
    const [accountType, setAccountType] = useState('')
    const { uid } = useParams()
    const nav = useNavigate()


    //for handling event notifications
    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)


    // textfield references
    const nameRef = useRef()
    const idRef = useRef()
    const deptRef = useRef()
    const accountRef = useRef()
    const photoRef = useRef()


    //for avatar preview before
    //saving to database
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

    useEffect(() => {
        const getAccountData = () => onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setUser(snap.val())
                setFetching(false)
                setDept(snap.val().department)
                setAccountType(snap.val().userType)
            }

            if (snap.val().photoUrl) {
                getDownloadURL(storageRef(storage, `avatars/${uid}/${snap.val().photoUrl}`))
                    .then((url) => {
                        setPreview(url)
                    }).catch((err) => {
                        console.log(err)
                    });
            }
        })
        getAccountData()
    }, [])

    function UpdateFaculty(e) {
        e.preventDefault()
        setLoading(true)

        const updatedProfile = {
            employeeId: idRef.current.value,
            name: nameRef.current.value,
            department: deptRef.current.value,
            userType: accountRef.current.value,
        }


        setTimeout(() => {
            update(ref(database, `users/${uid}`), updatedProfile)
                .then(() => {
                    setLoading(false)
                    setActionStatus('success')
                    setActionMessage('Successfully updated profile')
                    setSnackOpen(true)
                }).catch((err) => {
                    setLoading(false)
                    setActionStatus('error')
                    setActionMessage(err.message)
                    setSnackOpen(true)
                });

            setLoading(false)
        }, 1500)
    }

    const updateFacultyTextFields = [
        {
            id: 'employee-id',
            label: 'Employee Id',
            placeholder: 'CICTWMAD-2022****',
            type: 'text',
            row: 1,
            defaultValue: user.employeeId,
            ref: idRef,
        },
        {
            id: 'name',
            label: 'Name',
            placeholder: 'Include surname prefixes (jr, MSIT, Ph.D, etc.)',
            type: 'text',
            row: 1,
            defaultValue: user.name,
            ref: nameRef,
        },
    ]


    return (
        <>
            <Box sx={{
                width: '70%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                <Typography variant='h4' gutterBottom>Edit Faculty</Typography>
                <form
                    id='update-faculty-form'
                    spellCheck={false}
                    onSubmit={UpdateFaculty}>
                    <Grid container spacing={2}>


                        <Grid item xs={6}>
                            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                                <Avatar
                                    src={preview}
                                    sx={{ width: '8rem', height: '8rem', border: '.1rem solid' }}
                                />
                            </Stack>
                        </Grid>
                        {
                            updateFacultyTextFields.map((v, k) =>
                                <Grid item key={k} xs={12}>
                                    <TextField
                                        id={v.id}
                                        label={v.label}
                                        type={v.type}
                                        placeholder={v.placeholder}
                                        variant='outlined'
                                        size='small'
                                        defaultValue={v.defaultValue}
                                        inputRef={v.ref}
                                        required
                                        multiline
                                        fullWidth
                                        rows={v.row} />
                                </Grid>
                            )
                        }
                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="user-department">Department</InputLabel>
                                <Select
                                    labelId="user-department"
                                    id="select-department"
                                    value={dept}
                                    label="Department"
                                    onChange={(e) => setDept(e.target.value)}
                                    inputRef={deptRef}
                                    required
                                >
                                    <MenuItem value=''>Select Department</MenuItem>
                                    {
                                        [
                                            'Web and Mobile Application Development',
                                            'Business Analytics',
                                            'Service Management'
                                        ].map((v) =>
                                            <MenuItem key={v} value={v}>{v}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="user-department">Promote User</InputLabel>
                                <Select
                                    labelId="user-department"
                                    id="select-department"
                                    value={accountType}
                                    label="Department"
                                    onChange={(e) => setAccountType(e.target.value)}
                                    inputRef={accountRef}
                                    required
                                >
                                    <MenuItem value=''>Select Account Type</MenuItem>
                                    {
                                        [
                                            'administrator',
                                            'area chair',
                                            'faculty'
                                        ].map((v) =>
                                            <MenuItem key={v} value={v}>{v}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                </form>
                <LoadingButton
                    sx={{
                        marginTop: '1rem',
                        width: 'max-content',
                        textTransform: 'none'
                    }}
                    form='update-faculty-form'
                    type='submit'
                    loading={isLoading}
                    variant='contained'>Update Faculty</LoadingButton>
            </Box>
            <Snackbar
                open={snakcOpen}
                onClose={() => {
                    if (actionStatus === 'success') {
                        setSnackOpen(false)
                        nav(`/faculty/${uid}`)
                    } else {
                        setSnackOpen(false)
                    }
                }}
                autoHideDuration={3000}>
                <Alert severity={actionStatus} >
                    {actionMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
