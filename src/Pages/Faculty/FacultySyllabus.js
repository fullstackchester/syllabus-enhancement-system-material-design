import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material';
import { onValue, ref } from 'firebase/database'
import { database } from '../../JS/Firebase'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import FileCard from '../../Components/FileCard';

export default function FacultySyllabus({ uid }) {

    const [syllabus, setSyllabus] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const getSyllabus = () => onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setSyllabus(Object.values(snap.val()).filter((post) => {
                    if (post.uid === uid) {
                        return post
                    }
                }))
            }
        })
        getSyllabus()
    }, [])

    return (
        <>
            {syllabus.length !== 0 ?
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        paddingX: '3rem',
                        paddingY: '2rem'
                    }}>
                    {
                        syllabus.map((v, k) =>
                            <Grid item key={k} xs={3}>
                                <FileCard
                                    title={v.postTitle}
                                    date={v.postDate}
                                    status={v.postStatus}
                                    handleClick={() => nav(`/syllabus/${v.postId}`)} />
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
