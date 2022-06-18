import { TextField, Typography, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../index.css'
import { ref, set } from 'firebase/database';
import { database } from '../../JS/Firebase';
import FormButton from '../../Components/FormButton';
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'

export default function SubjectAdd() {

    const [courseCode, setCourseCode] = useState()
    const [courseTitle, setCourseTitle] = useState()
    const [creditUnits, setCreditUnits] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const { subjectId } = useParams()
    const [loading, setLoading] = useState(false)

    const nav = useNavigate()
    const dispatch = useDispatch()


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

        set(ref(database, `subject/${subjectId}`), newSubject)
            .then(() => {
                setLoading(false)
                dispatch(notify({
                    status: 'success',
                    message: 'Successfully added subject',
                    visible: true,
                }))
                nav(-1)

            }).catch((err) => {
                setLoading(false)
                dispatch(notify({
                    status: 'error',
                    message: err.message,
                    visible: true,
                }))
            });
    }
    return (
        <Box sx={{
            width: '70%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingX: '3rem',
            paddingY: '2rem',
        }}>
            <Typography variant='h4' gutterBottom>New Subject</Typography>
            <Box
                component='form'
                id='add-subject-form'
                spellCheck={false}
                onSubmit={addSubject}>
                <Grid container spacing={3}>
                    {
                        addSubjectTextfields.map((v, key) =>
                            <Grid key={key} item xs={v.width}>
                                <TextField
                                    size='small'
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
                <FormButton label='Add Subject' isLoading={loading} />
            </Box>
        </Box>
    )
}
