import React, { useEffect, useState, Suspense } from 'react'
import { CircularProgress } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid'
import CustomDataGrid from '../../Components/DataGrid'

const ListLayout = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('../../Components/Layout/ListLayout'))
        }, 500)
    })
})
export default function Syllabus() {

    const nav = useNavigate()

    const [list, setList] = useState([])
    const [isFetching, setFetching] = useState(true)

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
            <Suspense fallback={<CircularProgress />}>
                <ListLayout
                    btnTitle='New Syllabi'
                    listTitle='Syllabus'
                    path={`/syllabus/new-syllabus/${v4()}`}>
                    <CustomDataGrid
                        columns={columns}
                        rows={list}
                        isFetching={isFetching}
                        onClick={(cell) => nav(`/syllabus/${cell.id}`)}
                        getPrimaryKey={(row) => row.postId} />
                </ListLayout>
            </Suspense>
        </>
    )
}
