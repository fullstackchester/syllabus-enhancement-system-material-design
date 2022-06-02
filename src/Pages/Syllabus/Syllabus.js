import React, { useEffect, useState } from 'react'
import { Button, Typography, Paper } from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import CustomDataGrid from '../../Components/DataGrid';


export default function Syllabus() {

    const nav = useNavigate()

    const [list, setList] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [selected, setSelected] = useState([])
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
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    onClick={() => {
                        nav(`/syllabus/new-syllabus/${v4()}`)
                    }}
                    disableElevation>Add</Button>

            </Container>
            <Container
                sx={{
                    height: 'calc(95% - 5rem)',
                }}>

                <CustomDataGrid
                    columns={columns}
                    rows={list}
                    isFetching={isFetching}
                    onClick={(cell) => nav(`/syllabus/${cell.id}`)}
                    getPrimaryKey={(row) => row.postId}
                    selectedItemAction={(post) => setSelected(post)}
                />
            </Container>
        </>
    )
}
