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
    let myPostedSyllabus = []


    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPosts(Object.values(snap.val()))
            }
        })
    }, [])

    posts.forEach(post => {
        if (post.uid === uid) {
            myPostedSyllabus.push(post)
        }
    })

    console.log(myPostedSyllabus)

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
                        nav(`/syllabus/new-syllabus/${v4()}`)
                    }}
                    disableElevation>Add</Button>
            </Container>
            <Box sx={{
                height: 'calc(100% - 5rem)',
                width: '100%',
                padding: '1.5rem'
            }}>
                <Grid container spacing={2}>
                    {
                        myPostedSyllabus.map((v, k) =>
                            <Grid item key={k} xs={3}>
                                <Card variant="outlined" sx={{ height: '13rem', display: 'flex', flexDirection: 'column' }}>
                                    <CardHeader
                                        title={v.postTitle}
                                        subheader={v.postDate}>
                                    </CardHeader>
                                    <CardContent sx={{flex: '1'}}>

                                    </CardContent>
                                    <CardActions>
                                        <Button size='small' onClick={() => nav(`/syllabus/${v.postId}`)}>Open</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>


        </>
    )
}
