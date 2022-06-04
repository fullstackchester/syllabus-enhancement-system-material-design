import { Box, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import DoughnutChart from '../../Components/Charts/DoughnutChart'
import { useFirebase } from '../../Context/FirebaseContext'
import DashboardSyTable from './DashboardSyTable'
import SubjectTable from './SubjectTable'
import SyllabusTable from './SyllabusTable'

export default function Dashboard() {

    const { currentUser } = useFirebase()

    return (
        <>
            <Box sx={{ width: '100%', padding: '1rem', }}>
                <Typography variant='h4' gutterBottom>Dashboard</Typography>
                <Grid container spacing={1} sx={{ marginBottom: '3rem' }}>
                    <Grid item xs={6}>
                        <SyllabusTable />
                    </Grid>
                    <Grid item xs={6}>
                        <SubjectTable />
                    </Grid>
                    <Grid item xs={12}>
                        <DashboardSyTable />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
