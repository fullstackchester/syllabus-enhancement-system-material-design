// import { LoadingButton } from '@mui/lab';
// import {
//     Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
//     TextField, Typography, Alert, Snackbar
// } from '@mui/material'
// import { onValue, ref } from 'firebase/database';
// import React, { useState, useEffect, useRef } from 'react'
// import '../../index.scss';
// import { database, auth } from '../../JS/Firebase';
// import { updateEmail, updatePassword } from "firebase/auth";
// import { useFirebase } from '../../Context/FirebaseContext';
// import PasswordField from '../../Components/PasswordField';
// import AccountDelete from './AccountDelete';

// export default function AccountSecurity({ uid }) {

//     const { currentUser } = useFirebase()
//     const [email, setEmail] = useState('')
//     const [pass, setPass] = useState('')
//     const [isLoading, setLoading] = useState(false)
//     const [actionMessage, setActionMessage] = useState('')
//     const [actionStatus, setActionStatus] = useState()
//     const [snakcOpen, setSnackOpen] = useState(false)

//     const [showPass, setShowPass] = useState(false)

//     const fields = [
//         {
//             label: 'New Email',
//             placeholder: 'johnsmith@gmail.com',
//             type: 'email',
//         },
//     ]


//     function saveNewCredentials(e) {
//         e.preventDefault()
//         setLoading(true)
//         if (email !== '' && pass !== '') {
//             setTimeout(() => {
//                 updateEmail(currentUser, email)
//                     .then(() => {
//                         updatePassword(currentUser, pass)
//                             .then(() => {
//                                 setActionStatus('success')
//                                 setActionMessage('Succesfull updated email and password')
//                                 setSnackOpen(true)
//                                 setLoading(false)
//                             }).catch((err) => {
//                                 setActionStatus('error')
//                                 setActionMessage(err.message)
//                                 setSnackOpen(true)
//                                 setLoading(false)
//                             });
//                     }).catch((err) => {
//                         setActionStatus('error')
//                         setActionMessage(err.message)
//                         setSnackOpen(true)
//                         setLoading(false)
//                     });
//             }, 1500)
//         } else {
//             setActionStatus('error')
//             setActionMessage('Fill up email and password field to proceed.')
//             setSnackOpen(true)
//             setLoading(false)
//         }
//     }
//     return (
//         <>
//             <Box
//                 sx={{
//                     minHeight: '15rem',
//                     height: 'auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     paddingX: '3rem',
//                     paddingY: '2rem'
//                 }}>

//                 <Typography variant='h5'>Edit credentials</Typography>
//                 <Typography variant='body2'>Change your login credentials. Make sure to use an valid email and strong password.</Typography>
//                 <Box
//                     component='form'
//                     onSubmit={saveNewCredentials}
//                     spellcheck={false}
//                     sx={{
//                         marginTop: '1rem',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         width: '50%',
//                     }}>
//                     {fields.map((v, k) =>
//                         <TextField
//                             key={k}
//                             label={v.label}
//                             variant='outlined'
//                             type={v.type}
//                             size='small'
//                             placeholder={v.placeholder}
//                             margin='dense'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             sx={{ marginBottom: '1rem' }} />
//                     )}
//                     <PasswordField
//                         width='100%'
//                         label='New Password'
//                         isShowPass={showPass}
//                         value={pass}
//                         onChange={(e) => setPass(e.target.value)}
//                         togglePass={() => showPass ? setShowPass(false) : setShowPass(true)}
//                     />
//                     <Typography variant='caption' color='text.secondary'>Minimum of 6 characters. Add !@#$_ for stronger pattern.</Typography>
//                     <LoadingButton
//                         type='submit'
//                         loading={isLoading}
//                         variant='contained'
//                         disableElevation
//                         size='small'
//                         sx={{
//                             width: 'max-content',
//                             marginTop: '1.25rem',
//                             textTransform: 'none',
//                         }}>Save Changes</LoadingButton>
//                 </Box>
//                 <AccountDelete />
//             </Box>


//             <Snackbar open={snakcOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}  >
//                 <Alert severity={actionStatus}>{actionMessage}</Alert>
//             </Snackbar>
//         </>
//     )
// }
