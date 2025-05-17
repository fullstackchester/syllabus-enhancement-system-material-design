// import React, { useEffect, useState } from 'react'
// import { onValue, ref } from 'firebase/database';
// import { database } from '../../JS/Firebase';
// import { useNavigate } from 'react-router-dom';
// import { v4 } from 'uuid'
// import { useFirebase } from '../../Context/FirebaseContext';
// import CustomDataGrid from '../../Components/DataGrid';
// import ListLayout from '../../Components/Layout/ListLayout';


// export default function Subject() {

//     const [isFetching, setFetching] = useState(true)
//     const [list, setList] = useState([])

//     const { role } = useFirebase()

//     const nav = useNavigate()
//     const columns = [
//         { field: 'courseCode', headerName: 'Course Code', flex: 1 },
//         { field: 'subjectTitle', headerName: 'Course Title', flex: 1 },
//         { field: 'creditUnits', headerName: 'Credit Units', flex: 1 },
//     ];

//     useEffect(() => {
//         const getList = () => onValue(ref(database, 'subject'), snapshot => {
//             if (snapshot.exists()) {
//                 setList(Object.values(snapshot.val()))
//                 setFetching(false)
//             }
//         })
//         return getList()
//     }, [])

//     return (
//         <ListLayout
//             listTitle='Subjects'
//             btnTitle='New Subject'
//             btnHidden={role === 'administrator' ? '' : 'none'}
//             path={`/subjects/new-subject/${v4()}`}
//         >
//             <CustomDataGrid
//                 columns={columns}
//                 rows={list}
//                 isFetching={isFetching}
//                 getPrimaryKey={(rows) => rows.subjectId}
//                 onClick={(cell) => nav(`/subjects/${cell.id}`)}
//             />
//         </ListLayout>
//     )
// }