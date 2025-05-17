// import {
//     Button, TextField, Typography, Grid, FormControl, MenuItem, Select, InputLabel
// } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { onValue, ref, set, update } from 'firebase/database'
// import { ref as storageRef, uploadBytes } from 'firebase/storage'
// import { database, storage } from '../../JS/Firebase'
// import { schoolYearList, subjectList } from '../../Data/Data';
// import { v4 } from 'uuid'
// import { notify } from '../../Features/PopAlert'
// import { useDispatch } from 'react-redux'
// import FormButton from '../../Components/FormButton';

// export default function MyFileEdit() {

//     const { postId, uid } = useParams()

//     const [currentData, setCurrentData] = useState({})
//     const nav = useNavigate()
//     const [fileName, setFileName] = useState('')

//     const [loading, setLoading] = useState(false)

//     const [subject, setSubject] = useState('')
//     const [schoolYear, setSchoolYear] = useState('')

//     const postTitleRef = useRef()
//     const postFileRef = useRef()
//     const postDescriptionRef = useRef()
//     const syRef = useRef()
//     const subjectRef = useRef()


//     const dispatch = useDispatch()

//     useEffect(() => {
//         const getCurrent = () => onValue(ref(database, `posts/${postId}`), snap => {
//             if (snap.exists()) {
//                 setCurrentData(snap.val())
//                 onValue(ref(database, `schoolYear/${snap.val().syId}`), snap => {
//                     if (snap.exists()) {
//                         setSchoolYear(snap.val().syId)
//                     }
//                 })
//                 onValue(ref(database, `subject/${snap.val().subjectId}`), snap => {
//                     if (snap.exists()) {
//                         setSubject(snap.val().subjectId)
//                     }
//                 })
//             }
//         })
//         getCurrent()
//     }, [])


//     function addSyllabus(e) {
//         e.preventDefault()
//         setLoading(true)
//         const updatedSyllabi = {
//             postStatus: 'Needs reviewing',
//             postDate: new Date().toLocaleString(),
//             postTitle: postTitleRef.current.value,
//             postDescription: postDescriptionRef.current.value,
//             postFile: postFileRef.current.files[0].name,
//             postFileUrl: `syllabus/${postId}/${postFileRef.current.files[0].name}`,
//             subjectId: subjectRef.current.value,
//             syId: syRef.current.value,
//         }

//         const history = {
//             historyId: v4(),
//             historyDate: new Date().toLocaleString(),
//             previousPost: currentData
//         }

//         update(ref(database, `posts/${postId}`), updatedSyllabi)
//             .then(() => {
//                 uploadBytes(storageRef(storage, updatedSyllabi.postFileUrl), postFileRef.current.files[0])
//                     .then(() => {
//                         set(ref(database, `history/${postId}/${history.historyId}`), history)
//                             .then(() => {
//                                 setLoading(false)
//                                 dispatch(notify({
//                                     status: "success",
//                                     message: 'Successfully updated syllabi',
//                                     visible: true
//                                 }))
//                                 nav(-1)

//                             }).catch((err) => {
//                                 setLoading(false)
//                                 dispatch(notify({
//                                     status: "error",
//                                     message: err.message,
//                                     visible: true
//                                 }))
//                             });
//                     }).catch((err) => {
//                         setLoading(false)
//                         dispatch(notify({
//                             status: "error",
//                             message: err.message,
//                             visible: true
//                         }))
//                     });
//             }).catch((err) => {
//                 setLoading(false)
//                 dispatch(notify({
//                     status: "error",
//                     message: err.message,
//                     visible: true
//                 }))
//             });
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
//             <Typography variant='h4' gutterBottom>Edit Syllabus</Typography>
//             <Box
//                 component='form'
//                 id='add-syllabus-form'
//                 spellCheck={false}
//                 onSubmit={addSyllabus}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} >
//                         <TextField
//                             required
//                             id='syllabus-title'
//                             label='Syllabus Title'
//                             size='small'
//                             fullWidth
//                             varinat='outlined'
//                             placeholder='Data Structures and Algorithm Syllabus Syllabi'
//                             type='text'
//                             multiline={true}
//                             maxRows={1}
//                             defaultValue={currentData.postTitle}
//                             inputRef={postTitleRef}
//                         />
//                     </Grid>
//                     <Grid item xs={6} >
//                         <FormControl variant="outlined" size='small' fullWidth>
//                             <InputLabel id="select-subject-label">Select Subject</InputLabel>
//                             <Select
//                                 required
//                                 id='select-subject'
//                                 label='Select Subject'
//                                 labelId="select-subject-label"
//                                 multiline
//                                 value={subject}
//                                 inputRef={subjectRef}
//                                 onChange={(e) => setSubject(e.target.value)}
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
//                                 id='select-school-year'
//                                 label='Select School Year'
//                                 labelId="select-school-year-label"
//                                 value={schoolYear}
//                                 inputRef={syRef}
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
//                                 id='syllabus-file'
//                                 type='file'
//                                 required
//                                 ref={postFileRef}
//                                 onChange={(e) => setFileName(e.target.files[0].name)}
//                                 accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document' />
//                             Select File
//                         </Button>
//                     </Grid>
//                     <Grid item xs={12} >
//                         <TextField
//                             required
//                             id='syllabus-description'
//                             label='Syllabus Description'
//                             size='small'
//                             fullWidth
//                             variant='outlined'
//                             placeholder='Enter your description'
//                             type='text'
//                             multiline
//                             defaultValue={currentData.postDescription}
//                             rows={10}
//                             inputRef={postDescriptionRef}
//                         />
//                     </Grid>
//                 </Grid>
//                 <FormButton label='Save Changes' isLoading={loading} />
//             </Box>
//         </Box>
//     )
// }