import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Chartbar from '../../Components/Charts/Chartbar'
import { useFirebase } from '../../Context/FirebaseContext'

export default function Dashboard() {

    const { currentUser } = useFirebase()
    return (
        <>

            <Box sx={{ width: '100%', height: '100%', padding: '1rem' }}>
                <Stack direction='column'>
                    <Typography variant='h4'>Dashboard</Typography>
                    <Chartbar styles={{ width: '70%' }} />
                    <Typography variant='h1'>Syllabus Reports</Typography>

                </Stack>
            </Box>
        </>
    )
}
