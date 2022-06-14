import React, { useEffect, useState } from 'react'
import { Typography, Card, CardContent, CardActions, Stack, Button } from '@mui/material'
import { blue, red, green } from '@mui/material/colors'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { Box } from '@mui/system'



export default function SyllabusChart() {
    const [post, setPost] = useState([])
    const [approved, setApproved] = useState([])
    const [revise, setRevise] = useState([])
    const [review, setReview] = useState([])
    let total = 0

    useEffect(() => {
        onValue(ref(database, 'posts'), snapshot => {
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
    }, [])

    const data = {
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [approved.length, review.length, revise.length],
            backgroundColor: [green[400], blue[500], red[600]],
            borderColor: [green[400], blue[500], red[600]],
            pointStyle: 'circle'
        }],
        borderColor: '#333',
        hoverOffset: 4,
    }

    return (
        <Card
            elevation={3}
            sx={{ width: '100%' }}>
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
                    <Doughnut
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                            }
                        }} />
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
                <Button
                    size='small'>See all syllabus</Button>
            </CardActions>
        </Card>
    )
}
