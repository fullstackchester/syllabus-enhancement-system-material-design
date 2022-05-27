import { Button, TextField, Alert, Snackbar, Typography, Grid, FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/system'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'
import { onValue, ref, set, update } from 'firebase/database'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { database, storage } from '../../JS/Firebase'
import { schoolYearList, subjectList } from '../../Data/Data';
import { v4 } from 'uuid'

export default function SyllabusEdit() {

    const { postId } = useParams()
    const { currentUser, userData } = useFirebase()

    const [currentData, setCurrentData] = useState({})
    const nav = useNavigate()
    const [fileName, setFileName] = useState('')

    const [loading, setLoading] = useState(false)
    const [isFetching, setFecthing] = useState(true)

    const [subject, setSubject] = useState('')
    const [schoolYear, setSchoolYear] = useState('')

    const [actionMessage, setActionMessage] = useState('')
    const [actionStatus, setActionStatus] = useState()
    const [snakcOpen, setSnackOpen] = useState(false)

    const [previousPost, setPreviousPost] = useState({})

    const postTitleRef = useRef()
    const postFileRef = useRef()
    const postDescriptionRef = useRef()
    const syRef = useRef()
    const subjectRef = useRef()

    useEffect(() => {
        onValue(ref(database, `posts/${postId}`), snap => {
            if (snap.exists()) {
                setCurrentData(snap.val())
                setPreviousPost(snap.val())
                setFecthing(false)
            }
        })
    }, [])


    function addSyllabus(e) {
        e.preventDefault()
        setLoading(true)
        const updatedSyllabi = {
            postStatus: 'Needs reviewing',
            postDate: new Date().toLocaleString(),
            postTitle: postTitleRef.current.value,
            postDescription: postDescriptionRef.current.value,
            postFile: postFileRef.current.files[0].name,
            postFileUrl: `syllabus/${postId}/${postFileRef.current.files[0].name}`,
            subjectId: subjectRef.current.value,
            syId: syRef.current.value,
        }

        const history = {
            historyId: v4(),
            historyDate: new Date().toLocaleString(),
            previousPost: currentData
        }

        setTimeout(() => {
            update(ref(database, `posts/${postId}`), updatedSyllabi)
                .then(() => {
                    uploadBytes(storageRef(storage, updatedSyllabi.postFileUrl), postFileRef.current.files[0])
                        .then(() => {
                            set(ref(database, `history/${postId}/${history.historyId}`), history)
                                .then(() => {
                                    setLoading(false)
                                    setActionStatus('success')
                                    setActionMessage('Successfully updated syllabi')
                                    setSnackOpen(true)
                                }).catch((err) => {
                                    setLoading(false)
                                    setActionStatus('error')
                                    setActionMessage(err.message)
                                    setSnackOpen(true)
                                });
                        }).catch((err) => {
                            setLoading(false)
                            setActionStatus('error')
                            setActionMessage(err.message)
                            setSnackOpen(true)
                        });
                }).catch((err) => {
                    setLoading(false)
                    setActionStatus('error')
                    setActionMessage(err.message)
                    setSnackOpen(true)
                });
        }, 1500)
    }


    return (
        <>
            <Box sx={{
                width: '70%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                <Typography variant='h4' gutterBottom>Edit Syllabus</Typography>
                <form
                    id='add-syllabus-form'
                    spellCheck={false}
                    onSubmit={addSyllabus}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id='syllabus-title'
                                label='Syllabus Title'
                                size='small'
                                fullWidth
                                varinat='outlined'
                                placeholder='Data Structures and Algorithm Syllabus Syllabi'
                                type='text'
                                multiline={true}
                                maxRows={1}
                                defaultValue={currentData.postTitle}
                                inputRef={postTitleRef}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl variant="outlined" size='small' fullWidth>
                                <InputLabel id="select-subject-label">Select Subject</InputLabel>
                                <Select
                                    required
                                    id='select-subject'
                                    label='Select Subject'
                                    labelId="select-subject-label"
                                    multiline
                                    value={subject}
                                    inputRef={subjectRef}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    {
                                        subjectList.map((v, k) =>
                                            <MenuItem key={k} value={v.subjectId}>{v.subjectTitle}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl variant="outlined" size='small' fullWidth>
                                <InputLabel id="select-school-year-label">Select School Year</InputLabel>
                                <Select
                                    required
                                    id='select-school-year'
                                    label='Select School Year'
                                    labelId="select-school-year-label"
                                    value={schoolYear}
                                    inputRef={syRef}
                                    onChange={(e) => setSchoolYear(e.target.value)}
                                >
                                    {
                                        schoolYearList.map((v, k) =>
                                            <MenuItem key={k} value={v.syId}>{v.syTitle}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <Button type='button' component='label' variant='outlined'
                                sx={{
                                    width: '100%',
                                    textTransform: 'none',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <input
                                    id='syllabus-file'
                                    type='file'
                                    required
                                    ref={postFileRef}
                                    onChange={(e) => setFileName(e.target.files[0].name)}
                                    accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document' />
                                Select File
                            </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id='syllabus-description'
                                label='Syllabus Description'
                                size='small'
                                fullWidth
                                variant='outlined'
                                placeholder='Enter your description'
                                type='text'
                                multiline
                                defaultValue={currentData.postDescription}
                                rows={8}
                                inputRef={postDescriptionRef}
                            />
                        </Grid>
                    </Grid>
                </form>

                <LoadingButton
                    sx={{
                        marginTop: '1rem',
                        width: 'max-content',
                        textTransform: 'none'
                    }}
                    form='add-syllabus-form'
                    type='submit'
                    loading={loading}
                    variant='contained'> Add Syllabus</LoadingButton>
            </Box>

            <Snackbar
                open={snakcOpen}
                onClose={() => {
                    if (actionStatus === 'success') {
                        setSnackOpen(false)
                        nav(`/syllabus/${postId}`)
                    } else {
                        setSnackOpen(false)
                    }
                }}
                autoHideDuration={1000}>
                <Alert severity={actionStatus} >
                    {actionMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
