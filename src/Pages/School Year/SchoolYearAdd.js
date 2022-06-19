import { Typography, Grid, Input } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ref, set } from 'firebase/database';
import { database } from '../../JS/Firebase';
import FormButton from '../../Components/FormButton';
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'

export default function SchoolYearAdd() {

    const { syId } = useParams()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const addSchoolYearTextFields = [
        {
            label: 'Start Date',
            placeHolder: 'Start Date',
            required: true,
            width: 12,
            onChange: (e) => setStartDate(e.target.value)
        },
        {
            label: 'End Date',
            placeHolder: 'End Date',
            required: true,
            width: 12,
            onChange: (e) => setEndDate(e.target.value)
        },
    ]

    function addSy(e) {
        e.preventDefault()
        setLoading(true)
        const newSchoolYear = {
            syId: syId,
            syStart: startDate,
            syEnd: endDate,
            syDateCreated: new Date().toLocaleString(),
            syTitle: `SY ${new Date(startDate).getFullYear()}-${new Date(endDate).getFullYear()}`,
            syStatus: 'open'
        }

        set(ref(database, `schoolYear/${syId}`), newSchoolYear)
            .then(() => {
                setLoading(false)
                dispatch(notify({
                    status: 'success',
                    message: 'Successfully added new school year',
                    visible: true
                }))
                nav(-1)
            }).catch((err) => {
                setLoading(false)
                dispatch(notify({
                    status: 'success',
                    message: err.message,
                    visible: true
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
            <Typography variant='h4' gutterBottom>New School Year</Typography>
            <Box
                component='form'
                id='add-school-year-form'
                spellCheck={false}
                onSubmit={addSy}>
                <Grid container spacing={3}>
                    {
                        addSchoolYearTextFields.map((v, key) =>
                            <Grid key={key} item xs={v.width}>
                                <Input
                                    type='date'
                                    onChange={v.onChange}
                                    placeholder={v.placeHolder}
                                    required={v.required}
                                    fullWidth />
                            </Grid>
                        )
                    }
                </Grid>
                <FormButton label='Add School Year' isLoading={loading} />
            </Box>
        </Box>
    )
}
