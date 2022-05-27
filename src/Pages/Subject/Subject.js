import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Button, CircularProgress, InputAdornment, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import { subjectTableHeader, userTableHeader } from '../../Data/Data';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';


export default function Subject() {

    const [isFetching, setFetching] = useState(true)
    const [list, setList] = useState([])

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
                    <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        size='small'
                        onClick={() => {
                            nav(`/subjects/new-subject/${v4()}`)
                        }}
                        disableElevation>Add</Button>
                </Box>
            </Container>

            {!isFetching ?
                <Container
                    sx={{
                        height: 'calc(95% - 5rem)'
                    }}>

                    <DataGrid
                        columns={columns}
                        rows={list}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row.subjectId}
                        onCellDoubleClick={(cell) => nav(`/subjects/${cell.id}`)}
                        checkboxSelection
                        components={{ Toolbar: GridToolbar }}
                    />
                </Container>
                :
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100% - 5rem)'
                    }}>
                    <CircularProgress />
                </Box>
            }
        </>
    )
}
