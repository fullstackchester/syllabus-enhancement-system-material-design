import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function Syllabus() {

    const [list, setList] = useState([])
    const [isFetching, setFetching] = useState(true)
    const nav = useNavigate()
    const columns = [
        { field: 'postTitle', headerName: 'Title', flex: 1 },
        { field: 'postAuthor', headerName: 'Author', flex: 1 },
        { field: 'postDate', headerName: 'Date Posted', flex: 1 },
        { field: 'postStatus', headerName: 'Status', flex: 1 },
    ];

    useEffect(() => {
        onValue(ref(database, 'posts'), snapshot => {
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
                <Typography variant='h4'>Syllabus</Typography>

            </Container>
            {!isFetching ?
                <Container sx={{
                    height: 'calc(95% - 5rem)'
                }}>
                    <DataGrid
                        columns={columns}
                        rows={list}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row.postId}
                        onCellDoubleClick={(cell) => nav(`/syllabus/${cell.id}`)}
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
