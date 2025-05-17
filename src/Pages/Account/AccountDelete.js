// import React, { useState } from 'react'
// import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
// import { LoadingButton } from '@mui/lab'
// import { Box } from '@mui/system'
// import { deleteUser } from 'firebase/auth'
// import { ref, remove } from 'firebase/database'
// import { database } from '../../JS/Firebase'
// import { useFirebase } from '../../Context/FirebaseContext'
// import { useNavigate } from 'react-router-dom'

// export default function AccountDelete() {
//     const [confirmDelete, setConfirmDelete] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const { currentUser } = useFirebase()
//     const nav = useNavigate()

//     function deleteAccount(e) {
//         e.preventDefault()
//         setLoading(true)
//         setTimeout(() => {
//             setLoading(false)
//         }, 2000)
//         remove(ref(database, `users/${currentUser.uid}`))
//             .then(() => {
//                 deleteUser(currentUser)
//                     .then(() => {
//                         nav('/')
//                     }).catch((err) => {
//                         console.log(err.message)
//                     });
//             }).catch((err) => {
//                 console.log(err.message)
//             });
//     }
//     return (
//         <>
//             <Box sx={{
//                 minHeight: '8rem',
//                 height: 'auto',
//                 marginTop: '5rem',
//             }}>
//                 <Typography variant='h5'>Account Deletion</Typography>
//                 <Typography variant='body2'>Delete your account, including the personal data, passwords, and files.</Typography>
//                 <Typography variant='caption' color='primary'>Note: Some files or syllabi are not deleted and still can be accessed by administrator.</Typography>
//                 <Button
//                     size='small'
//                     variant='contained'
//                     color='error'
//                     disableElevation
//                     onClick={() => setConfirmDelete(true)}
//                     sx={{ textTransform: 'none', marginLeft: '1rem' }}>Delete Account</Button>
//             </Box>

//             <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
//                 <DialogTitle>Confirm Account Deletion</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>Are you sure you want to delete your Account? You will not be able to see important data and updates</DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button color='info' onClick={() => setConfirmDelete(false)}>Cancel</Button>
//                     <LoadingButton loading={loading} color='error' onClick={deleteAccount}>Delete</LoadingButton>
//                 </DialogActions>
//             </Dialog>
//         </>
//     )
// }
