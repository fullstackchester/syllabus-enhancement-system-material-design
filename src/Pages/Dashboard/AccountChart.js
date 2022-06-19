import React, { useEffect, useState } from 'react'
import { Typography, Card, CardContent, CardActions, Stack, Button } from '@mui/material'
import { blue, red, green } from '@mui/material/colors'
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { Box } from '@mui/system';
import DoughnutChart from '../../Components/Charts/DoughnutChart';



export default function AccountChart() {
    const [post, setPost] = useState([])
    const [BA, setBA] = useState([])
    const [WMAD, setWMAD] = useState([])
    const [SERMGT, setSERMGT] = useState([])
    let total = 0

    useEffect(() => {
        const getData = () => onValue(ref(database, 'users'), snapshot => {
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
        getData()
    }, [])

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
                    <DoughnutChart
                        chartData={[BA.length, WMAD.length, SERMGT.length]}
                        chartLabel={['Business Analytics', 'Web and Mobile', 'Service Management']} />
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
            </CardActions>
        </Card>
    )
}
