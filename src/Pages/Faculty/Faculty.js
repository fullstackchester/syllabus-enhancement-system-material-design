import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext'
import CustomDataGrid from '../../Components/DataGrid';

export default function Faculty() {
    const [list, setList] = useState([])
    const [isFetching, setFetching] = useState(true)
    const filteredList = []
    const { role, department } = useFirebase()

    const nav = useNavigate()
    const columns = [
        { field: 'employeeId', headerName: 'Employee ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'userType', headerName: 'Position', flex: 1 },
    ];

    useEffect(() => {
        onValue(ref(database, 'users'), snapshot => {
            if (snapshot.exists()) {
                setList(Object.values(snapshot.val()))
                setFetching(false)
            }
        })
    }, [])
    if (role === 'area chair') {
        list.forEach(i => {
            if (i.department === department) {
                filteredList.push(i)
            }
        })
    }

    return (
        <>
            <Container sx={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h4'>Faculty</Typography>
                {/* Add button component was removeed
                because there is no need to add for an account.
                faculty / users should sign up for the accounts
                <Box>
                    <Button variant='contained' startIcon={<AddIcon />}
                        style={{
                            marginRight: '.75rem',
                        }}
                        disableElevation>Add</Button>
                </Box> 
                */}
            </Container>
            <Container
                sx={{ height: 'calc(95% - 5rem)' }}>
                <CustomDataGrid
                    columns={columns}
                    isFetching={isFetching}
                    rows={role === 'area chair' ? filteredList : list}
                    getPrimaryKey={(row) => row.uid}
                    onClick={(cell) => nav(`/faculty/${cell.id}`)} />
            </Container>
        </>
    )
}