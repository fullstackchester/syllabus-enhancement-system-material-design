import React, { useEffect, useState } from 'react'
import ListLayout from '../../Components/Layout/ListLayout';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { v4 } from 'uuid'
import CustomDataGrid from '../../Components/DataGrid'

export default function SchoolYear() {

    const [schoolYear, setSchoolYear] = useState([])
    const [fetching, setFetching] = useState(true)

    const columns = [
        { field: 'syTitle', headerName: 'School Year', flex: 1 },
        { field: 'syStart', headerName: 'Start Date', flex: 1 },
        { field: 'syEnd', headerName: 'End Date', flex: 1 },
    ];

    useEffect(() => {
        const getSy = () => onValue(ref(database, 'schoolYear'), snapshot => {
            if (snapshot.exists()) {
                setSchoolYear(Object.values(snapshot.val()))
                setFetching(false)
            }
        })
        getSy()
    }, [])

    return (
        <ListLayout
            btnTitle='New School Year'
            listTitle='School Year'
            path={`/school-year/new-school-year/${v4()}`}>
            <CustomDataGrid
                columns={columns}
                rows={schoolYear}
                isFetching={fetching}
                onClick={(cell) => alert(cell.id)}
                getPrimaryKey={(row) => row.syId} />
        </ListLayout>
    )
}
