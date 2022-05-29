import { Box, Button, Link, Stack, Typography, IconButton, DialogTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { onValue, ref, remove } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { database, storage } from '../../JS/Firebase'
import Chip from '@mui/material/Chip';
import { Delete, Edit } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'

export default function MyFileInformation({ postId }) {

    const nav = useNavigate()
    const { role } = useFirebase()
    const { uid } = useParams()

    const [post, setPost] = useState({})
    const [chipColor, setColor] = useState('info')
    const [fileUrl, setFileUrl] = useState()

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const [isLoading, setLoading] = useState(false)



    useEffect(() => {
        const getSyllabi = () => onValue(ref(database, `posts/${postId}`), snap => {
            if (snap.exists()) {
                setPost(snap.val())

                getDownloadURL(storageRef(storage, snap.val().postFileUrl))
                    .then((url) => {
                        setFileUrl(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`)
                    })
                    .catch((e) => {
                        console.log(e)
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
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 0 1.25rem 0'
            }}>
                <Stack direction='row' spacing={1}>
                    {role !== 'area chair' &&
                        <>
                            <IconButton
                                onClick={() => nav(`/my-files/${uid}/edit-syllabi/${postId}`)}
                                variant='contained'
                                color='primary'
                                size='small'>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => setOpenDeleteDialog(true)} variant='contained' color='error' size='small'>
                                <Delete />
                            </IconButton>
                        </>
                    }
                </Stack>
                <Chip label={post.postStatus} color={chipColor} />
            </Box>
            <Typography variant='h4'>{post.postTitle}</Typography>
            <Typography variant='body1'>{post.postDescription}</Typography>
            <Box sx={{
                marginTop: '1rem',
            }}>
                <Stack>
                    <Typography variant='subtitle2' display='block'>{`Author: ${post.postAuthor}`}</Typography>
                    <Typography variant='subtitle2' display='block'>
                        {`Attachments: `}<Button
                            onClick={() => window.open(fileUrl, '_blank')}
                            sx={{ textTransform: 'none' }}>
                            {post.postFile}
                        </Button>
                    </Typography>
                    <Typography variant='subtitle2' display='block'>{`Subject: `}<Link href='#'>{post.subjectId}</Link>  </Typography>
                    <Typography variant='subtitle2' display='block'>{`Posted: ${post.postDate}`}</Typography>
                </Stack>
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
