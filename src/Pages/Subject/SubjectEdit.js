// import React, { useState, useEffect, useRef } from 'react'
// import { TextField, Typography, Grid } from '@mui/material'
// import { Box } from '@mui/system'
// import { ref, onValue, update } from 'firebase/database';
// import { database } from '../../JS/Firebase';
// import { useNavigate, useParams } from 'react-router-dom';
// import { notify } from '../../Features/PopAlert';
// import { useDispatch } from 'react-redux';
// import FormButton from '../../Components/FormButton';

// export default function SubjectEdit() {

//     const { subjectId } = useParams()
//     const [currentSub, setCurrentSub] = useState({})
//     const [loading, setLoading] = useState(false)

//     const dispatch = useDispatch()


//     const titleRef = useRef()
//     const codeRef = useRef()
//     const unitRef = useRef()
//     const descRef = useRef()

//     const nav = useNavigate()

//     useEffect(() => {
//         const getCurrentSubject = () => onValue(ref(database, `subject/${subjectId}`), snap => {
//             if (snap.exists()) {
//                 setCurrentSub(snap.val())
//             }
//         })
//         getCurrentSubject()
//     }, [])

//     function saveChanges(e) {
//         e.preventDefault()
//         setLoading(true)
//         const updatedSub = {
//             courseCode: codeRef.current.value,
//             subjectTitle: titleRef.current.value,
//             creditUnits: unitRef.current.value,
//             subjectDescription: descRef.current.value,
//         }

//         update(ref(database, `subject/${subjectId}`), updatedSub)
//             .then(() => {
//                 setLoading(false)
//                 dispatch(notify({
//                     status: 'success',
//                     message: 'Successfully updated Subject',
//                     visible: true
//                 }))
//                 nav(-1)
//             }).catch((err) => {
//                 setLoading(false)
//                 dispatch(notify({
//                     status: 'error',
//                     message: err.message,
//                     visible: true
//                 }))
//             });
//     }

//     const editSubjectTextfields = [
//         {
//             id: 'course-title',
//             label: 'Course Title',
//             type: 'text',
//             placeHolder: 'Data Stuctures and Algorithm',
//             required: true,
//             width: 12,
//             multiline: true,
//             rows: 1,
//             value: currentSub.subjectTitle,
//             ref: titleRef
//         },
//         {
//             id: 'course-code',
//             label: 'Course Code',
//             type: 'text',
//             placeHolder: 'IT 101',
//             required: true,
//             width: 6,
//             multiline: true,
//             rows: 1,
//             value: currentSub.courseCode,
//             ref: codeRef
//         },
//         {
//             id: 'course-units',
//             label: 'Credit Units',
//             type: 'number',
//             placeHolder: '3.0',
//             required: true,
//             width: 6,
//             multiline: true,
//             rows: 1,
//             value: currentSub.creditUnits,
//             ref: unitRef
//         },
//         {
//             id: 'course-description',
//             label: 'Course Description',
//             type: 'text',
//             placeHolder: 'Enter your description...',
//             required: true,
//             width: 12,
//             multiline: true,
//             rows: 10,
//             value: currentSub.subjectDescription,
//             ref: descRef
//         },
//     ]

//     return (
//         <Box sx={{
//             width: '70%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             paddingX: '3rem',
//             paddingY: '2rem',
//         }}>
//             <Typography variant='h4' gutterBottom>Edit Subject</Typography>
//             <Box
//                 component='form'
//                 id='edit-subject-form'
//                 spellCheck={false}
//                 onSubmit={saveChanges}>
//                 <Grid container spacing={3}>
//                     {
//                         editSubjectTextfields.map((v, key) =>
//                             <Grid key={key} item xs={v.width}>
//                                 <TextField
//                                     id={v.id}
//                                     size='small'
//                                     placeholder={v.placeHolder}
//                                     variant='outlined'
//                                     sx={{ width: '100%' }}
//                                     required={v.required}
//                                     label={v.label}
//                                     type={v.type}
//                                     rows={v.rows}
//                                     inputRef={v.ref}
//                                     defaultValue={v.value}
//                                     multiline={v.multiline}

//                                 />
//                             </Grid>
//                         )
//                     }
//                 </Grid>
//                 <FormButton
//                     isLoading={loading}
//                     label='Save Changes'
//                 />
//             </Box>
//         </Box>
//     )
// }