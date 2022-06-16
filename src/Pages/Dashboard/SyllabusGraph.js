import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LineChart from '../../Components/Charts/LineChart'
import { onValue, ref, get } from 'firebase/database'
import { database } from '../../JS/Firebase'

export default function SyllabusGraph() {
    const [post_WMAD, setWMAD] = useState([])
    const [post_SM, setSM] = useState([])
    const [post_BA, setBA] = useState([])


    function GetDepartment(uid) {
        let USER_DEPARTMENT = ''
        onValue(ref(database, `users/${uid}`), snapshot => {
            if (snapshot.exists()) {
                USER_DEPARTMENT = snapshot.val().department
            } else {
                USER_DEPARTMENT = 'No User Data Found'
            }
        })
        return USER_DEPARTMENT
    }

    useEffect(() => {
        const getPost = () => onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setWMAD(Object.values(snapshot.val()).filter((post) => {
                    if (GetDepartment(post.uid) === 'Web and Mobile Application Development') {
                        return post
                    }
                }))
                setSM(Object.values(snapshot.val()).filter((post) => {
                    if (GetDepartment(post.uid) === 'Service Management') {
                        return post
                    }
                }))
                setBA(Object.values(snapshot.val()).filter((post) => {
                    if (GetDepartment(post.uid) === 'Business Analytics') {
                        return post
                    }
                }))
            }
        })
        getPost()
    }, [])

    return (
        <Card
            elevation={3}
            sx={{ width: '100%' }}>
            <CardContent
                sx={{
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                <Typography
                    variant='h6'
                    sx={{
                        width: '100%',
                    }}
                    gutterBottom>Syllabus Weekly Submission Chart</Typography>
                <Box
                    sx={{
                        height: 'auto',
                        minHeight: '15rem',
                        width: '100%',
                    }}>
                    <LineChart
                        POST_WMAD={post_WMAD}
                        POST_SM={post_SM}
                        POST_BA={post_BA} />
                </Box>
            </CardContent>
        </Card>
    )
}
