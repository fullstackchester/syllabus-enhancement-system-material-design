import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function SubjectSyllabus({ subjectId }) {
    const [posts, setPosts] = useState([])
    let filteredPosts = []
    const nav = useNavigate()

    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPosts(Object.values(snap.val()))
            }
        })
    }, [])

    posts.forEach(post => {
        if (post.subjectId === subjectId) {
            filteredPosts.push(post)
        }
    })

    console.log(filteredPosts)
    return (
        <>
            <Grid container spacing={2}>
                {
                    filteredPosts.map((v, k) =>
                        <Grid item key={k} xs={2}>
                            <Card variant="outlined" sx={{ minHeight: '12rem', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1', }}>
                                    <Typography variant='subtitle2' color="text.primary" gutterBottom>
                                        {v.postTitle}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size='small' onClick={() => nav(`/syllabus/${v.postId}`)}>Open</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    )
                }
            </Grid>

        </>
    )
}
