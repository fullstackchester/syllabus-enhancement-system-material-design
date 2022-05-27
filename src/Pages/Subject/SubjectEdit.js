import React, { useState, useEffect, useRef } from 'react'
import { TextField, Alert, Snackbar, Typography, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export default function SubjectEdit() {

    const { subjectId } = useParams()
    const [currentSub, setCurrentSub] = useState({})
    const [loading, setLoading] = useState(false)

    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)

    const titleRef = useRef()
    const codeRef = useRef()
    const unitRef = useRef()
    const descRef = useRef()

    const nav = useNavigate()

    useEffect(() => {
        const getCurrentSubject = () => onValue(ref(database, `subject/${subjectId}`), snap => {
            if (snap.exists()) {
                setCurrentSub(snap.val())
            }
        })
        getCurrentSubject()
    }, [])

    function saveChanges(e) {
        e.preventDefault()
        setLoading(true)
        const updatedSub = {
            courseCode: codeRef.current.value,
            subjectTitle: titleRef.current.value,
            creditUnits: unitRef.current.value,
            subjectDescription: descRef.current.value,
        }

        setTimeout(() => {
            update(ref(database, `subject/${subjectId}`), updatedSub)
                .then(() => {
                    setLoading(false)
                    setActionStatus('success')
                    setActionMessage('Successfully updated subject')
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

    const editSubjectTextfields = [
        {
            id: 'course-title',
            label: 'Course Title',
            type: 'text',
            placeHolder: 'Data Stuctures and Algorithm',
            required: true,
            width: 12,
            multiline: true,
            rows: 1,
            value: currentSub.subjectTitle,
            ref: titleRef
        },
        {
            id: 'course-code',
            label: 'Course Code',
            type: 'text',
            placeHolder: 'IT 101',
            required: true,
            width: 6,
            multiline: true,
            rows: 1,
            value: currentSub.courseCode,
            ref: codeRef
        },
        {
            id: 'course-units',
            label: 'Credit Units',
            type: 'number',
            placeHolder: '3.0',
            required: true,
            width: 6,
            multiline: true,
            rows: 1,
            value: currentSub.creditUnits,
            ref: unitRef
        },
        {
            id: 'course-description',
            label: 'Course Description',
            type: 'text',
            placeHolder: 'Enter your description...',
            required: true,
            width: 12,
            multiline: true,
            rows: 10,
            value: currentSub.subjectDescription,
            ref: descRef
        },
    ]

    return (
        <>
            <Box sx={{
                width: '70%',
                height: '85%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                <Typography variant='h4' gutterBottom>Edit Subject</Typography>
                <form
                    id='edit-subject-form'
                    spellCheck={false}
                    onSubmit={saveChanges}>
                    <Grid container spacing={2}>
                        {
                            editSubjectTextfields.map((v, key) =>
                                <Grid key={key} item xs={v.width}>
                                    <TextField
                                        id={v.id}
                                        size='small'
                                        placeholder={v.placeHolder}
                                        variant='outlined'
                                        sx={{ width: '100%' }}
                                        required={v.required}
                                        label={v.label}
                                        type={v.type}
                                        rows={v.rows}
                                        inputRef={v.ref}
                                        defaultValue={v.value}
                                        multiline={v.multiline}

                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </form>
                <LoadingButton
                    sx={{
                        marginTop: '1rem',
                        width: 'max-content',
                        textTransform: 'none'
                    }}
                    form='edit-subject-form'
                    type='submit'
                    loading={loading}
                    variant='contained' > Add Subject</LoadingButton>
            </Box>

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
        </>

    )
}
