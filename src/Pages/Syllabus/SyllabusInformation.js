import {
    Box, Stack, Typography, IconButton, Divider
} from '@mui/material'
import { onValue, ref, remove } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import SetStatusButton from '../../Components/SetStatusButton'
import { database, storage } from '../../JS/Firebase'
import { Delete, Edit, FormatColorReset } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'
import PostLinkLayout from '../../Components/Layout/PostLinkLayout';
import StatusChip from '../../Components/StatusChip';
import DialogBox from '../../Components/DialogBox';
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'



export default function SyllabusInformation({ postId }) {

    const dispatch = useDispatch()
    const [post, setPost] = useState({})
    const [fileUrl, setFileUrl] = useState()
    const [downloadabelFile, setDownloadableFile] = useState()

    const [openDialog, setOpenDialog] = useState(false)
    const nav = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [isFetching, setFetching] = useState(true)


    const { role } = useFirebase()


    useEffect(() => {
        const getSyllabi = () => onValue(ref(database, `posts/${postId}`), snap => {
            if (snap.exists()) {
                setPost(snap.val())
                getDownloadURL(storageRef(storage, snap.val().postFileUrl))
                    .then((url) => {
                        setDownloadableFile(url)
                        setFileUrl(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        })

        getSyllabi()
    }, [])


    function deleteSyllabus(e) {
        e.preventDefault()
        setLoading(true)

        remove(ref(database, `posts/${postId}`))
            .then(() => {
                setLoading(false)
                setOpenDialog(false)

                dispatch(notify({
                    status: 'success',
                    message: 'Successfully deleted syllabus',
                    visible: true
                }))
                nav('/syllabus')
            }).catch((err) => {
                dispatch(notify({
                    status: 'success',
                    message: err.message,
                    visible: true
                }))
            });
    }


    return (
        <>
            <Box sx={{
                width: '100%',
                height: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Stack direction='row' spacing={1}>
                    <SetStatusButton post={post} />
                    {role === 'administrator' &&
                        <>
                            <IconButton
                                onClick={() => nav(`/syllabus/edit-syllabus/${postId}`)}
                                variant='contained'
                                color='primary'
                                size='small'>
                                <Edit />
                            </IconButton>
                            <IconButton
                                onClick={() => setOpenDialog(true)}
                                variant='contained'
                                color='error'
                                size='small'>
                                <Delete />
                            </IconButton>
                        </>
                    }
                </Stack>
            </Box>
            <Box
                component='div'
                sx={{
                    height: 'calc(100% - 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Typography variant='h4' sx={{ fontWeight: '300' }} gutterBottom>
                    {post.postTitle} <StatusChip postStatus={post.postStatus} />
                </Typography>

                <PostLinkLayout
                    Author={post.postAuthor}
                    File={post.postFile}
                    Date={post.postDate}
                    subjectId={post.subjectId}
                    PreviewUrl={fileUrl}
                    DownloadUrl={downloadabelFile} />


                <Divider sx={{ margin: '1rem 0 1rem 0' }} />
                <Typography variant='body1'>{post.postDescription}</Typography>
            </Box>

            <DialogBox
                isOpen={openDialog}
                title='Confirm Syllabi Deletion'
                message='Are you sure you want to delete this syllabi?'
                handleClick={deleteSyllabus}
                handleClose={() => setOpenDialog(false)}
                isLoading={isLoading}
                btnLabel='Delete'
            />
        </>
    )
}

