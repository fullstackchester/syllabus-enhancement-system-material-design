import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@mui/material';
import { Card, CardActions, CardContent } from '@mui/material';
import { onValue, ref } from 'firebase/database'
import { database } from '../../JS/Firebase'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

export default function FacultySyllabus({ uid }) {

    const [syllabus, setSyllabus] = useState([])
    const nav = useNavigate()
    let facultySyllabus = []

    useEffect(() => {
        const getSyllabus = () => onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setSyllabus(Object.values(snap.val()))
            }
        })
        getSyllabus()
    }, [])

    syllabus.forEach(syllabi => {
        if (syllabi.uid === uid) {
            facultySyllabus.push(syllabi)
        }
    })

    return (
        <>
            {facultySyllabus.length !== 0 ?
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    {
                        facultySyllabus.map((v, k) =>
                            <Grid item key={k} xs={3}>
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
                :
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>No Files Found</Typography>
                </Box>
            }
        </>
    )
}
