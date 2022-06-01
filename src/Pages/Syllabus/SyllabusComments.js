import { Card, CardContent, IconButton, TextField, Typography, Tooltip } from '@mui/material'
import { Box, Container } from '@mui/system'
import { onValue, ref, set } from 'firebase/database'
import React, { useState, useEffect, useRef } from 'react'
import { database } from '../../JS/Firebase'
import SendIcon from '@mui/icons-material/Send';
import '../../index.css'
import { useFirebase } from '../../Context/FirebaseContext'
import { v4 } from 'uuid'

export default function SyllabusComments({ postId }) {
    const [comment, setComment] = useState([])
    const [user, setUser] = useState()
    const commentRef = useRef()

    const { currentUser } = useFirebase()
    const uid = currentUser.uid

    useEffect(() => {
        onValue(ref(database, `comments/${postId}`), snap => {
            if (snap.exists()) {
                setComment(Object.values(snap.val()))
            }
        })

        onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setUser(snap.val())
            }
        })
    }, [])


    function newComment(e) {
        e.preventDefault()
        const userComment = {
            postId: postId,
            commentId: v4(),
            commentString: commentRef.current.value,
            commentDate: new Date().toLocaleString(),
            uid: user ? user.uid : '',
            name: user ? user.name : ''
        }


        set(ref(database, `comments/${postId}/${userComment.commentId}`), userComment)
            .then(() => {

            }).catch((err) => {
                console.log(err)
            });
        commentRef.current.value = ''
    }

    return (
        <>
            <Box
                sx={{
                    height: 'calc(100% - 4rem)',
                    padding: '.75rem'
                }}
                style={{
                    overflowY: "auto" // added scroll
                }}>
                {
                    comment
                        .sort((a, b) => new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime())
                        .map((v, k) =>
                            <Tooltip
                                title={v.commentDate}
                                placement='right'
                                key={k}>
                                <Card
                                    variant='outlined'
                                    sx={{
                                        width: '70%',
                                        height: 'auto',
                                        minHeight: '5rem',
                                        marginTop: '.75rem'
                                    }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: '1rem' }} color='primary' >{v.name}</Typography>
                                        <Typography variant='subtitle1' >{v.commentString}</Typography>
                                    </CardContent>
                                </Card>
                            </Tooltip>
                        )
                }
            </Box>
            <Box sx={{
                height: '4rem',
                padding: '.5rem 0 .5rem 0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <form
                    onSubmit={newComment}
                    className='horizontal-form'>
                    <TextField
                        variant='outlined'
                        sx={{ flex: 1 }}
                        size='small'
                        required={true}
                        inputRef={commentRef}
                        type='text'
                        placeholder='Enter your comments...'
                    />
                    <IconButton
                        color='primary'
                        type='submit'
                    >
                        <SendIcon />
                    </IconButton>
                </form>
            </Box>
        </>
    )
}
