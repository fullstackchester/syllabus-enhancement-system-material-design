import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import { Box, Container } from '@mui/system'
import { Add } from '@mui/icons-material'
import { Grid, Card, CardContent, CardHeader, CardActions, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid'

export default function MyFiles() {

    const { uid } = useParams()
    const nav = useNavigate()
    const [posts, setPosts] = useState([])


    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPosts(Object.values(snap.val()).filter(post => {
                    if(post.uid === uid){
                        return post
                    }
                }))
            }
        })
    }, [])

    return (
        <>
            <Container sx={{
                height: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h4'>My Files</Typography>
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<Add />}
                    onClick={() => {
                        nav(`/my-files/${uid}/new-syllabi/${v4()}`)
                    }}
                    disableElevation>Add</Button>
            </Container>
            <Box sx={{
                height: 'calc(100% - 5rem)',
                width: '100%',
                padding: '1.5rem',
            }}>
                {posts.length !== 0 ?
                    <Grid container spacing={2}>
                        {
                            posts
                                .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                .map((v, k) =>
                                    <Grid item key={k} xs={3}>
                                        <Card elevation={2} sx={{ height: '13rem', display: 'flex', flexDirection: 'column' }}>
                                            <CardHeader
                                                sx={{ fontSize: '.75rem', }}
                                                title={
                                                    <Typography sx={{ fontWeight: 'bold' }}>{v.postTitle}</Typography>
                                                }
                                                subheader={<Typography sx={{ fontSize: '.8rem', }} color='text.secondary'>
                                                    {`Posted: ${new Date(v.postDate).toLocaleDateString()}`}
                                                </Typography>}
                                            >

                                            </CardHeader>
                                            <CardContent sx={{ flex: '1' }}>
                                            </CardContent>
                                            <CardActions>
                                                <Button size='small' onClick={() => nav(`/my-files/${uid}/${v.postId}`)}>Open</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                        }
                    </Grid>
                    :
                    <Box sx={{
                        width: '100%', height: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>No Files</Typography>
                    </Box>
                }
            </Box>
        </>
    )
}
