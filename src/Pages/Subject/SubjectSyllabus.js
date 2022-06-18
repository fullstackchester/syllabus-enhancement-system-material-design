import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { database } from '../../JS/Firebase';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import FileCard from '../../Components/FileCard';

export default function SubjectSyllabus({ subjectId }) {
    const [posts, setPosts] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const getList = () => onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPosts(Object.values(snap.val()).filter((post) => {
                    if (post.subjectId === subjectId) {
                        return post
                    }
                }))
            }
        })
        getList()
    }, [])


    return (
        <Grid container spacing={2}>
            {
                posts.map((v, k) =>
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
    )
}
