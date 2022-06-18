import { Box, Stack, Typography, IconButton, Divider } from '@mui/material'
import { onValue, ref, remove } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { database, storage } from '../../JS/Firebase'
import { Delete, Edit } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { notify } from '../../Features/PopAlert'
import { useDispatch } from 'react-redux'
import StatusChip from '../../Components/StatusChip';
import PostLinkLayout from '../../Components/Layout/PostLinkLayout';
import DialogBox from '../../Components/DialogBox'

export default function MyFileInformation({ postId }) {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const { uid } = useParams()

    const [post, setPost] = useState({})
    const [fileUrl, setFileUrl] = useState()
    const [downloadabelFile, setDownloadableFile] = useState()


    const [openDialog, setOpenDialog] = useState(false)
    const [isLoading, setLoading] = useState(false)



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

    function deleteSyllabi(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            remove(ref(database, `posts/${postId}`))
                .then(() => {
                    dispatch(notify({
                        status: 'success',
                        message: 'Successfully deleted syllabus',
                        visible: true
                    }))
                    nav(-1)
                }).catch((err) => {
                    dispatch(notify({
                        status: 'error',
                        message: err.message,
                        visible: true
                    }))
                })
            setLoading(false)
        }, 2000)
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 0 1.25rem 0'
            }}>
                <Stack direction='row' spacing={1}>
                    <IconButton
                        onClick={() => nav(`/my-files/${uid}/edit-syllabi/${postId}`)}
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
                    File={post.postFile}
                    Date={post.postDate}
                    PreviewUrl={fileUrl}
                    DownloadUrl={downloadabelFile} />
                <Divider sx={{ margin: '1rem 0 1rem 0' }} />
                <Typography variant='body1'>{post.postDescription}</Typography>
            </Box>

            <DialogBox
                isOpen={openDialog}
                title='Confirm file deletion'
                message='Are you sure you want to delete this file?'
                handleClick={deleteSyllabi}
                handleClose={() => setOpenDialog(false)}
                btnLabel='Delete'
                isLoading={isLoading}
            />
        </>
    )
}
