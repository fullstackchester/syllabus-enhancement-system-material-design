import { TextField, Alert, AlertTitle, Snackbar, Typography, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';
import '../../index.css'
import { ref, set } from 'firebase/database';
import { database } from '../../JS/Firebase';

export default function SubjectAdd() {

    const [courseCode, setCourseCode] = useState()
    const [courseTitle, setCourseTitle] = useState()
    const [creditUnits, setCreditUnits] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const { subjectId } = useParams()
    const [loading, setLoading] = useState(false)

    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)

    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const nav = useNavigate()
    function addSubject(e) {
        e.preventDefault()
        alert('tanginamo')
    }


    const addSubjectTextfields = [
        {
            label: 'Course Title',
            type: 'text',
            placeHolder: 'Data Stuctures and Algorithm',
            required: true,
            width: 12,
            multiline: false,
            onChange: (e) => setCourseTitle(e.target.value)
        },
        {
            label: 'Course Code',
            type: 'text',
            placeHolder: 'IT 101',
            required: true,
            width: 6,
            multiline: false,
            onChange: (e) => setCourseCode(e.target.value)
        },
        {
            label: 'Credit Units',
            type: 'number',
            placeHolder: '3.0',
            required: true,
            width: 6,
            multiline: false,
            onChange: (e) => setCreditUnits(e.target.value)
        },

        {
            label: 'Course Description',
            type: 'text',
            placeHolder: 'Enter your description...',
            required: true,
            width: 12,
            multiline: true,
            maxRows: 10,
            onChange: (e) => setCourseDescription(e.target.value)
        },
    ]

    function addSubject(e) {
        e.preventDefault()
        setLoading(true)


        const newSubject = {
            subjectId: subjectId,
            courseCode: courseCode,
            subjectTitle: courseTitle,
            subjectDescription: courseDescription,
            creditUnits: creditUnits,
        }

        setTimeout(() => {
            set(ref(database, `subject/${subjectId}`), newSubject)
                .then(() => {
                    setLoading(false)
                    setActionStatus('success')
                    setActionMessage('Successfully added new subject')
                    setSnackOpen(true)
                }).catch((err) => {
                    setLoading(false)
                    setActionStatus('error')
                    setActionMessage(err.message)
                    setSnackOpen(true)
                });
        }, 1500)
    }
    return (
        <>
            <Box sx={{
                width: '70%',
                height: '85%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                <Typography variant='h4' gutterBottom>New Subject</Typography>
                <form
                    id='add-subject-form'
                    spellCheck={false}
                    onSubmit={addSubject}>
                    <Grid container spacing={2}>
                        {
                            addSubjectTextfields.map((v, key) =>
                                <Grid key={key} item xs={v.width}>
                                    <TextField
                                        size='normal'
                                        placeholder={v.placeHolder}
                                        variant='outlined'
                                        sx={{ width: '100%' }}
                                        required={v.required}
                                        label={v.label} type={v.type}
                                        onChange={v.onChange}
                                        rows={v.maxRows}
                                        multiline={v.multiline} />
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
                    form='add-subject-form'
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
                autoHideDuration={1000}  >
                <Alert severity={actionStatus} >
                    {actionMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
