import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import SetStatusButton from '../../Components/SetStatusButton'
import { database } from '../../JS/Firebase'
import Chip from '@mui/material/Chip';

export default function SyllabusInformation({ postId }) {

    const [post, setPost] = useState({})
    const [chipColor, setColor] = useState('info')



    useEffect(() => {
        onValue(ref(database, `posts/${postId}`), snap => {
            if (snap.exists()) {
                setPost(snap.val())
                if (snap.val().postStatus === 'Approved') {
                    setColor('success')
                } else if (snap.val().postStatus === 'Needs revisions') {
                    setColor('error')
                } else {
                    setColor('info')
                }
            }
        })
    }, [])



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
                <SetStatusButton postId={post.postId} />
                <Chip label={post.postStatus} color={chipColor} />
            </Box>
            <Typography variant='h4'>{post.postTitle}</Typography>
            <Typography variant='body1'>{post.postDescription}</Typography>
            <Box sx={{
                marginTop: '1rem',
            }}>
                <Stack>
                    <Typography variant='subtitle2' display='block'>{`Author: ${post.postAuthor}`}</Typography>
                    <Typography variant='subtitle2' display='block'>{`Attachments: `}<Link href='#'>{post.postFile}</Link>  </Typography>
                    <Typography variant='subtitle2' display='block'>{`Subject: `}<Link href='#'>{post.subjectId}</Link>  </Typography>
                    <Typography variant='subtitle2' display='block'>{`Posted: ${post.postDate}`}</Typography>
                </Stack>
            </Box>
        </>
    )
}
