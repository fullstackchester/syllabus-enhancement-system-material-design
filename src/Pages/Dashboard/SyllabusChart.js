import React, { useEffect, useState } from 'react'
import { Typography, Card, CardContent, CardActions } from '@mui/material'
import { blue, red, green, grey } from '@mui/material/colors'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { Box } from '@mui/system';



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

    const plugins = [{
        afterDraw: function (chart, args, options) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            ctx.font = 'bold 2rem Open Sans';
            ctx.textAlign = 'center'
            const text = post.length
            ctx.fillText(text, width / 2, height / 2 + top);
            ctx.save();
        }
    }]

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
        plugins: [plugins]
    }




    return (
        <Card
            elevation={3}
            sx={{ width: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
                <Typography
                    variant='h6'
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
                        }}
                        plugins={plugins} />
                </Box>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}
