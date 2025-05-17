// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material'
// import { Box } from '@mui/system'
// import { DataGrid } from '@mui/x-data-grid'
// import { onValue, ref } from 'firebase/database'
// import { getDownloadURL, ref as storageRef } from 'firebase/storage'
// import React, { useEffect, useState } from 'react'
// import { database, storage } from '../../JS/Firebase'

// export default function MyFileHistory({ postId }) {
//     const [list, setList] = useState([])
//     const [dialogOpen, setDialogOpen] = useState(false)
//     const [prevPost, setPrevPost] = useState({})
//     const columns = [
//         { field: 'historyId', headerName: 'History Id', flex: 1 },
//         { field: 'historyDate', headerName: 'History Date', flex: 1 },
//     ];
//     useEffect(() => {
//         onValue(ref(database, `history/${postId}`), snap => {
//             if (snap.exists()) {
//                 setList(Object.values(snap.val()))
//             }
//         })
//     }, [])


//     function openAttachment(fileUrl) {
//         getDownloadURL(storageRef(storage, fileUrl))
//             .then((url) => {
//                 window.open(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`, '_blank')
//             })
//             .catch((e) => {
//                 console.log(e)
//             });
//     }

//     return (
//         <>
//             <Box

//                 component={Paper}
//                 elevation={1}
//                 sx={{
//                     height: '100%',
//                     width: '100%',
//                 }}>
//                 <DataGrid
//                     columns={columns}
//                     rows={list}
//                     pageSize={8}
//                     rowsPerPageOptions={[8]}
//                     getRowId={(row) => row.historyId}
//                     onCellClick={(cell) => {
//                         setPrevPost(cell.row.previousPost)
//                         setDialogOpen(true)
//                     }}
//                 />
//             </Box>
//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//                 <DialogTitle>{prevPost.postTitle}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         {prevPost.postDescription}
//                     </DialogContentText>
//                     <DialogContentText>
//                         {prevPost.postDate}
//                     </DialogContentText>
//                     <Button
//                         sx={{
//                             textTransform: 'none',
//                         }}
//                         size='small'
//                         variant='text'
//                         onClick={() => openAttachment(prevPost.postFileUrl)}>
//                         {prevPost.postFile}
//                     </Button>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDialogOpen(false)}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     )
// }
