import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext'
import CustomDataGrid from '../../Components/DataGrid';
import ListLayout from '../../Components/Layout/ListLayout';

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
            <ListLayout listTitle='Faculty' btnHidden='none'>
                <CustomDataGrid
                    columns={columns}
                    isFetching={isFetching}
                    rows={role === 'area chair' ? filteredList : list}
                    getPrimaryKey={(row) => row.uid}
                    onClick={(cell) => nav(`/faculty/${cell.id}`)} />
            </ListLayout>
        </>
    )
}