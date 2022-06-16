import {
    Box, Button, Link, Stack, Typography, IconButton, DialogTitle, Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, Divider
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { onValue, ref, remove } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import SetStatusButton from '../../Components/SetStatusButton'
import { database, storage } from '../../JS/Firebase'
import { Delete, Edit, Download } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'
import PostLinkLayout from '../../Components/Layout/PostLinkLayout';
import StatusChip from '../../Components/StatusChip';


export default function SyllabusInformation({ postId }) {

    const [post, setPost] = useState({})
    const [chipColor, setColor] = useState('info')
    const [fileUrl, setFileUrl] = useState()
    const [downloadabelFile, setDownloadableFile] = useState()

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const nav = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

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
                    .finally(() => {
                        setFetching(false)
                    })

                if (snap.val().postStatus === 'Approved') {
                    setColor('success')
                } else if (snap.val().postStatus === 'Needs revisions') {
                    setColor('error')
                } else {
                    setColor('info')
                }
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
                    setLoading(false)
                    setOpenDeleteDialog(false)
                    nav('/syllabus')
                }).catch((err) => {
                    console.log(err.message)
                });

        }, 1500)
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
                                onClick={() => setOpenDeleteDialog(true)}
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
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Syllabi Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this syllabi?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size='small' sx={{ textTransform: 'none' }} onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <LoadingButton
                        loading={isLoading}
                        size='small'
                        sx={{ textTransform: 'none' }}
                        onClick={deleteSyllabi} color='error'>Delete</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

