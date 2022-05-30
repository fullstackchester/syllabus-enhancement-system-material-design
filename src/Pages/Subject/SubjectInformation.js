import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';

export default function SubjectInformation({ subjectId }) {

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
            onClick: DeleteSubject,
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
        alert('TANGINAMO')
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
        </>
    )
}
