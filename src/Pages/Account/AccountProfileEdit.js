import {
    Avatar, Button, FormControl, Grid, InputLabel,
    MenuItem, Select, Stack, TextField, Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState, useRef } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { database, storage } from '../../JS/Firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'
import FormButton from '../../Components/FormButton'

export default function AccountProfileEdit() {

    const [isLoading, setLoading] = useState(false)
    const [isFetching, setFetching] = useState(true)
    const [user, setUser] = useState({})
    const [dept, setDept] = useState('')
    const { uid } = useParams()
    const nav = useNavigate()


    // textfield references
    const nameRef = useRef()
    const idRef = useRef()
    const deptRef = useRef()
    const photoRef = useRef()


    //for avatar preview before
    //saving to database
    const [avatar, setAvatar] = useState()
    const [preview, setPreview] = useState()

    const dispatch = useDispatch()
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

    function UpdateProfile(e) {
        e.preventDefault()
        setLoading(true)

        const updatedProfile = {
            employeeId: idRef.current.value,
            name: nameRef.current.value,
            department: deptRef.current.value,
            photoUrl: avatar && avatar.name
        }


        update(ref(database, `users/${uid}`), updatedProfile)
            .then(() => {
                uploadBytes(storageRef(storage, `avatars/${uid}/${avatar.name}`), avatar)
                    .then(() => {

                        dispatch(notify({
                            status: 'success',
                            message: 'Successfully updated profile',
                            visible: true
                        }))
                        setLoading(false)
                        nav(-1)

                    }).catch((err) => {
                        dispatch(notify({
                            status: 'error',
                            message: err.message,
                            visible: true
                        }))
                        setLoading(false)

                    });
            }).catch((err) => {
                setLoading(false)

                dispatch(notify({
                    status: 'error',
                    message: err.message,
                    visible: true
                }))
            })
    }

    const updateProfileTextFields = [
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
        <Box sx={{
            width: '70%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingX: '3rem',
            paddingY: '2rem',
        }}>
            <Typography variant='h4' gutterBottom>Edit Profile</Typography>
            <Box
                component='form'
                id='update-profile-form'
                spellCheck={false}
                onSubmit={UpdateProfile}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                                src={preview}
                                sx={{ width: '8rem', height: '8rem', border: '.1rem solid' }}
                            />
                            <Button
                                size='small'
                                variant='outlined'
                                component='label'
                                disableElevation
                                sx={{
                                    height: 'max-content',
                                    textTransform: 'none'
                                }}>
                                <input
                                    ref={photoRef}
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
                                Change
                            </Button>
                        </Stack>
                    </Grid>
                    {
                        updateProfileTextFields.map((v, k) =>
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
                </Grid>
                <FormButton label='Update Profile' isLoading={isLoading} />
            </Box>
        </Box>
    )
}
