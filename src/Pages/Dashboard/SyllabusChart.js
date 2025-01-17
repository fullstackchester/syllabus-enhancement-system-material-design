import React, { useEffect, useState } from 'react'
import { Typography, Card, CardContent, CardActions, Stack } from '@mui/material'
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { Box } from '@mui/system'
import DoughnutChart from '../../Components/Charts/DoughnutChart';



export default function SyllabusChart() {
    const [post, setPost] = useState([])
    const [approved, setApproved] = useState([])
    const [revise, setRevise] = useState([])
    const [review, setReview] = useState([])
    const [expand, setExpand] = useState(false)
    let total = 0

    useEffect(() => {
        const getData = () => onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setPost(Object.values(snapshot.val()))
                setApproved(Object.values(snapshot.val()).filter(post => {
                    if (post.postStatus === 'Approved') {
                        return post
                    }
                }))
                setRevise(Object.values(snapshot.val()).filter(post => {
                    if (post.postStatus === 'Needs revisions') {
                        return post
                    }
                }))
                setReview(Object.values(snapshot.val()).filter(post => {
                    if (post.postStatus === 'Needs reviewing') {
                        return post
                    }
                }))
                total = Object.values(snapshot.val()).length
            }
        })

        getData()
    }, [])

    return (
        <Card
            elevation={3}
            initial={{ scale: 1 }}
            animate={{ scale: expand ? 1.2 : 1 }}
            style={{ scale: expand }}
            sx={{
                width: '100%',
            }}>
            <CardContent
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                <Typography
                    variant='h6'
                    sx={{
                        width: '100%',
                    }}
                    gutterBottom>Syllabus</Typography>
                <Box
                    sx={{
                        height: '10rem',
                        width: '60%',
                    }}>
                    <DoughnutChart
                        chartLabel={['Approved', 'Needs Reviews', 'Need Revisions']}
                        chartData={[approved.length, review.length, revise.length]} />
                </Box>
                <Stack
                    direction='column'
                    sx={{
                        width: '40%',
                        height: '100%',
                    }}>
                    <Typography
                        variant='body1'
                        sx={{ fontWeight: '600' }}
                        gutterBottom>{`TOTAL: ${post.length}`}</Typography>
                    <Typography
                        variant='body2'
                        color='text.success'>{`APPROVED: ${approved.length}`}</Typography>
                    <Typography
                        variant='body2'
                        color=''>{`REVISE: ${revise.length}`}</Typography>
                    <Typography
                        variant='body2'
                        color=''>{`REVIEW: ${review.length}`}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}
