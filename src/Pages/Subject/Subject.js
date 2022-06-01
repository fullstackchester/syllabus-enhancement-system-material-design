import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import { useFirebase } from '../../Context/FirebaseContext';
import CustomDataGrid from '../../Components/DataGrid';


export default function Subject() {

    const [isFetching, setFetching] = useState(true)
    const [list, setList] = useState([])

    const { role } = useFirebase()

    const nav = useNavigate()
    const columns = [
        { field: 'courseCode', headerName: 'Course Code', flex: 1 },
        { field: 'subjectTitle', headerName: 'Course Title', flex: 1 },
        { field: 'creditUnits', headerName: 'Credit Units', flex: 1 },
    ];

    useEffect(() => {
        onValue(ref(database, 'subject'), snapshot => {
            if (snapshot.exists()) {
                setList(Object.values(snapshot.val()))
                setFetching(false)
            }
        })
    }, [])

    return (
        <>
            <Container sx={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h4'>Subjects</Typography>

                <Box>
                    {role !== 'faculty' &&
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            size='small'
                            onClick={() => {
                                nav(`/subjects/new-subject/${v4()}`)
                            }}
                            disableElevation>Add</Button>}
                </Box>
            </Container>
            <Container
                sx={{
                    height: 'calc(95% - 5rem)'
                }}>
                <CustomDataGrid
                    columns={columns}
                    rows={list}
                    isFetching={isFetching}
                    getPrimaryKey={(rows) => rows.subjectId}
                    onClick={(cell) => nav(`/subjects/${cell.id}`)}
                />
            </Container>
        </>
    )
}
