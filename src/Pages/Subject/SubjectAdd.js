import { Button, TextField, Alert, AlertTitle, Snackbar, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';

export default function SubjectAdd() {

    const [courseCode, setCourseCode] = useState()
    const [courseTitle, setCourseTitle] = useState()
    const [creditUnits, setCreditUnits] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const { subjectId } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const nav = useNavigate()
    function addSubject(e) {
        e.preventDefault()
        alert('tanginamo')
    }


    const addSubjectTextfields = [
        {
            label: 'Course Code',
            type: 'text',
            required: true,
            multiline: false,
            onChange: (e) => setCourseCode(e.target.value)
        },
        {
            label: 'Course Title',
            type: 'text',
            required: true,
            multiline: false,
            onChange: (e) => setCourseTitle(e.target.value)
        },
        {
            label: 'Credit Units',
            type: 'number',
            required: true,
            multiline: false,
            onChange: (e) => setCreditUnits(e.target.value)
        },

        {
            label: 'Course Description',
            type: 'text',
            required: true,
            multiline: true,
            maxRows: 6,
            onChange: (e) => setCourseDescription(e.target.value)
        },
    ]

    function addSubject(e) {
        e.preventDefault()
        setShow(true)
        setError('Lorem Ipsum dolor sit amet')
    }
    return (
        <>
            <Container sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',

            }}>

                <Box sx={{
                    width: '70%',
                    height: '85%',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',

                }}>
                    <Typography variant='h4'>New Subject</Typography>
                    <form
                        id='add-subject-form'
                        spellCheck={false}
                        onSubmit={addSubject}>
                        {
                            addSubjectTextfields.map((v, key) =>
                                <TextField
                                    key={key}
                                    fullWidth
                                    margin='normal'
                                    variant='filled'
                                    required={v.required}
                                    label={v.label} type={v.type}
                                    onChange={v.onChange}
                                    maxRows={v.maxRows}
                                    multiline={v.multiline} />
                            )
                        }
                    </form>

                    <LoadingButton
                        sx={{
                            marginTop: '1rem',
                        }}
                        form='add-subject-form'
                        type='submit'
                        loading={loading}
                        variant='contained' > Add Subject</LoadingButton>
                </Box>
                <Snackbar
                    open={show}
                    onClose={() => {
                        setShow(false)
                        nav('/subjects')
                    }}
                    autoHideDuration={10000}  >
                    <Alert severity='error' >
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}
