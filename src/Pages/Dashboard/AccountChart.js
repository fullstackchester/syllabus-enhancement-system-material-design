import React, { useEffect, useState } from 'react'
import { Typography, Card, CardContent, CardActions, Stack, Button } from '@mui/material'
import { blue, red, green, grey } from '@mui/material/colors'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { Box } from '@mui/system';



export default function AccountChart() {
    const [post, setPost] = useState([])
    const [BA, setBA] = useState([])
    const [WMAD, setWMAD] = useState([])
    const [SERMGT, setSERMGT] = useState([])
    let total = 0

    useEffect(() => {
        onValue(ref(database, 'users'), snapshot => {
            if (snapshot.exists()) {
                setPost(Object.values(snapshot.val()))
                setWMAD(Object.values(snapshot.val()).filter(post => {
                    if (post.department === 'Web and Mobile Application Development') {
                        return post
                    }
                }))
                setSERMGT(Object.values(snapshot.val()).filter(post => {
                    if (post.department === 'Service Management') {
                        return post
                    }
                }))
                setBA(Object.values(snapshot.val()).filter(post => {
                    if (post.department === 'Business Analytics') {
                        return post
                    }
                }))
                total = Object.values(snapshot.val()).length
            }
        })
    }, [])

    const data = {
        labels: ['Business Analytics', 'Web and Mobile', 'Service Management'],
        datasets: [{
            data: [BA.length, WMAD.length, SERMGT.length],
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
            sx={{
                width: '100%',
                height: 'auto'
            }}>
            <CardContent
                sx={{
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                <Typography
                    variant='h6'
                    sx={{
                        width: '100%',
                    }}
                    gutterBottom>Users</Typography>
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
                        color='text.success'>{`BA: ${BA.length}`}</Typography>
                    <Typography
                        variant='body2'
                        color=''>{`WMAD: ${WMAD.length}`}</Typography>
                    <Typography
                        variant='body2'
                        color=''>{`SMP: ${SERMGT.length}`}</Typography>

                </Stack>
            </CardContent>
            <CardActions>
                <Button
                    size='small'>See all syllabus</Button>
            </CardActions>
        </Card>
    )
}
