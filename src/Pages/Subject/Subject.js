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


export default function Subject() {

    const [isFetching, setFetching] = useState(true)
    const [list, setList] = useState([])

    const nav = useNavigate()

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
                        style={{
                            marginRight: '.75rem',
                        }}
                        onClick={() => {
                            nav(`/subjects/new-subject/${v4()}`)
                        }}
                        disableElevation>Add</Button>
                    <TextField variant='outlined' size='small' placeholder='Search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        style={{
                            backgroundColor: '#fff',
                        }}
                    />
                </Box>
            </Container>

            {!isFetching ?
                <Container>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {subjectTableHeader.map((title, key) =>
                                        <TableCell key={key} align='left'>{title}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((sub, key) =>
                                    <TableRow key={key}>
                                        <TableCell>{sub.courseCode}</TableCell>
                                        <TableCell>{sub.subjectTitle}</TableCell>
                                        <TableCell>{sub.creditUnits}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
