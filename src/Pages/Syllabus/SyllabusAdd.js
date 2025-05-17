// import {
//     Button, TextField, Typography, Grid, FormControl, MenuItem, Select, InputLabel
// } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useState, useRef } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useFirebase } from '../../Context/FirebaseContext'
// import { ref } from 'firebase/database'
// import { ref as storageRef } from 'firebase/storage'
// import { database, storage } from '../../JS/Firebase'
// import { schoolYearList, subjectList } from '../../Data/Data';
// import { notify } from '../../Features/PopAlert'
// import { useDispatch } from 'react-redux'
// import { useForm } from 'react-hook-form'
// import { rtdbSet, storageUpload } from '../../JS/firebase.functions'
// import { LoadingButton } from '@mui/lab'

// export default function SyllabusAdd() {

//     const dispatch = useDispatch()
//     const { postId } = useParams()
//     const { currentUser, userData } = useFirebase()

//     const nav = useNavigate()
//     const [fileName, setFileName] = useState('')

//     const [isLoading, setLoading] = useState(false);

//     const [subject, setSubject] = useState('')
//     const [schoolYear, setSchoolYear] = useState('')

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors }
//     } = useForm();

//     async function submitForm(data) {
//         try {
//             setLoading(true)

//             const firebaseRef = ref(database, 'posts/' + postId);
//             const storageReference = storageRef(storage, data.postFileUrl);
    
//             const newSyllabus = {
//                 postStatus:         'Needs reviewing',
//                 postAuthor:         userData.name,
//                 postId:             postId,
//                 postDate:           new Date().toLocaleString(),
//                 postTitle:          data.postTitleRef,
//                 postDescription:    data.postDescriptionRef,
//                 postFile:           data.postFileRef[0].name,
//                 postFileUrl:        `syllabus/${postId}/${data.postFileRef[0].name}`,
//                 uid:                currentUser.uid,
//                 subjectId:          data.subjectRef,
//                 syId:               data.syRef
//             }
//             const addSyllabus = await rtdbSet(firebaseRef, newSyllabus);

//             if (addSyllabus) {

//                 const fileUpload  = await storageUpload(storageReference, data.postFileRef[0]);
//                 if (fileUpload) {
//                     setLoading(false);
//                     dispatch(notify({
//                         status: 'success',
//                         message: 'Successfully added new syllabi',
//                         visible: true
//                     }));
//                     nav(-1);
//                 }
//             }
//         } catch (error) {
//             setLoading(false)
//             dispatch(notify({
//                 status: 'error',
//                 message: error.message,
//                 visible: true
//             }));
//         }

//     }

//     return (
//         <Box sx={{
//             width: '70%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             paddingX: '3rem',
//             paddingY: '2rem',
//         }}>
//             <Typography variant='h4' gutterBottom>New Syllabus</Typography>
//             <Box
//                 component='form'
//                 id='add-syllabus-form'
//                 spellCheck={false}
//                 onSubmit={handleSubmit(submitForm)}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} >
//                         <TextField
//                             required
//                             label='Syllabus Title'
//                             size='small'
//                             fullWidth
//                             varinat='outlined'
//                             placeholder='Data Structures and Algorithm Syllabus Syllabi'
//                             type='text'
//                             multiline={false}
//                             {...register('postTitleRef')}
//                         />
//                     </Grid>
//                     <Grid item xs={6} >
//                         <FormControl variant="outlined" size='small' fullWidth>
//                             <InputLabel id="select-subject-label">Select Subject</InputLabel>
//                             <Select
//                                 required
//                                 label='Select Subject'
//                                 labelId="select-subject-label"
//                                 id="select-subject"
//                                 // value={''}
//                                 {...register('subjectRef')}
//                                 // onChange={(e) => setSubject(e.target.value)}
//                             >
//                                 {
//                                     subjectList.map((v, k) =>
//                                         <MenuItem key={k} value={v.subjectId}>{v.subjectTitle}</MenuItem>
//                                     )
//                                 }
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={6} >
//                         <FormControl variant="outlined" size='small' fullWidth>
//                             <InputLabel id="select-school-year-label">Select School Year</InputLabel>
//                             <Select
//                                 required
//                                 label='Select School Year'
//                                 labelId="select-school-year-label"
//                                 id="select-school-year"
//                                 value={schoolYear}
//                                 {...register('syRef')}
//                                 onChange={(e) => setSchoolYear(e.target.value)}
//                             >
//                                 {
//                                     schoolYearList.map((v, k) =>
//                                         <MenuItem key={k} value={v.syId}>{v.syTitle}</MenuItem>
//                                     )
//                                 }
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} >
//                         <Button type='button' component='label' variant='outlined'
//                             sx={{
//                                 width: '100%',
//                                 textTransform: 'none',
//                                 display: 'flex',
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                             }}>
//                             <input
//                                 type='file'
//                                 required
//                                 {...register('postFileRef')}
//                                 accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document' />
//                             Select File
//                         </Button>
//                     </Grid>
//                     <Grid item xs={12} >
//                         <TextField
//                             required
//                             label='Syllabus Description'
//                             size='small'
//                             fullWidth
//                             varinat='outlined'
//                             placeholder='Enter your description'
//                             type='text'
//                             multiline
//                             rows={8}
//                             {...register('postDescriptionRef')}
//                         />
//                     </Grid>
//                 </Grid>
//                 <LoadingButton type='submit' loading={isLoading} variant='contained'>Submit</LoadingButton>
//             </Box>
//         </Box>
//     )
// }

