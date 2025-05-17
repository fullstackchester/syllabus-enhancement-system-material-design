// import React, { useEffect, useState } from 'react'
// import { Avatar, Button, Stack, Typography, Skeleton } from '@mui/material'
// import { Box } from '@mui/system'
// import { useNavigate } from 'react-router-dom'
// import { database, storage } from '../../JS/Firebase'
// import { onValue, ref } from 'firebase/database'
// import { getDownloadURL, ref as storageRef } from 'firebase/storage'
// import { useFirebase } from '../../Context/FirebaseContext'
// import '../../index.scss'
// import ProfileAvatar from '../../Components/ProfileAvatar'

// export default function FacultyInformation({ uid }) {

//     const [account, setAccount] = useState({})
//     const { role } = useFirebase()
//     const nav = useNavigate()
//     useEffect(() => {
//         const getFaculty = () => onValue(ref(database, `users/${uid}`), snap => {
//             if (snap.exists()) {
//                 setAccount(snap.val())
//             }

//         })

//         getFaculty()
//     }, [])

//     return (
//         <>
//             <Box sx={{
//                 padding: '0px',
//             }}>
//                 <Box
//                     id='cover-photo'
//                     className='cover-photo'
//                     component='img'
//                     sx={{
//                         height: '15rem',
//                         width: '100%',
//                         objectFit: 'cover',
//                         opacity: '50%',
//                     }}></Box>
//                 <Box
//                     sx={{
//                         position: 'relative',
//                         top: '-5rem',
//                         display: 'flex',
//                         flexDirection: 'row',
//                         flexWrap: 'wrap',
//                         alignItems: 'center',
//                         width: '100%',
//                         padding: '1rem 2rem 1rem 2rem'
//                     }}>
//                     <ProfileAvatar
//                         uid={uid}
//                         height={200}
//                         width={200}
//                         border='.3rem' />
//                     <Stack
//                         sx={{
//                             flex: '1',
//                             marginTop: '3.5rem',
//                             marginLeft: '1rem'
//                         }}>
//                         <Typography variant='h3'>{account.name}</Typography>
//                         <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>{`Employee ID: ${account.employeeId}`}</Typography>
//                         <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>{`Department: ${account.department}`}</Typography>
//                         <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>{`Account Type: ${account.userType}`}</Typography>

//                         {role === 'administrator' && <Button
//                             disableElevation
//                             variant='contained'
//                             size='small'
//                             onClick={() => nav(`/faculty/edit-faculty/${uid}`)}
//                             sx={{
//                                 width: 'max-content',
//                                 textTransform: 'none',
//                                 marginTop: '1rem'
//                             }}>
//                             Edit Faculty</Button>}
//                     </Stack>
//                 </Box>
//             </Box>
//         </>
//     )
// }
