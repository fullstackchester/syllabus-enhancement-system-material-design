import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { Box, Container } from '@mui/system'
import { Add } from '@mui/icons-material'
import { Grid, Card, CardContent, CardHeader, CardActions, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid'
import ListLayout from '../../Components/Layout/ListLayout';
import FileCard from '../../Components/FileCard';

export default function MyFiles() {

    const { uid } = useParams()
    const nav = useNavigate()
    const [posts, setPosts] = useState([])


    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPosts(Object.values(snap.val()).filter(post => {
                    if (post.uid === uid) {
                        return post
                    }
                }))
            }
        })
    }, [])

    return (
        <ListLayout
            listTitle='My Files'
            btnTitle='New Syllabi'
            path={`/my-files/${uid}/new-syllabi/${v4()}`}>
            <Box sx={{
                height: 'calc(100% - 5rem)',
                width: '100%',
                padding: '0',
            }}>
                {posts.length !== 0 ?
                    <Grid container spacing={2}>
                        {
                            posts
                                .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                .map((v, k) =>
                                    <Grid item key={k} xs={3}>
                                        <FileCard
                                            title={v.postTitle}
                                            date={v.postDate}
                                            status={v.postStatus}
                                            handleClick={() => nav(`/my-files/${uid}/${v.postId}`)} />
                                    </Grid>
                                )
                        }
                    </Grid>
                    :
                    <Box sx={{
                        width: '100%', height: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>No Files Found</Typography>
                    </Box>
                }
            </Box>
        </ListLayout>
    )
}