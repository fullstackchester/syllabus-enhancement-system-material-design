import { Box, Grid, Typography, CircularProgress, Skeleton, Card, CardContent } from '@mui/material'
import React, { Suspense } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import AccountChart from './AccountChart'
import SchoolYearAccordionTable from './SchoolYearAccordionTable'
import SyllabusChart from './SyllabusChart'


const SyllabusTable = React.lazy(() => {
    return import('./SyllabusTable')
})

const SubjectTable = React.lazy(() => {
    return import('./SubjectTable')
})

const DashboardSyTable = React.lazy(() => {
    return import('./DashboardSyTable')
})

export default function Dashboard() {

    const { currentUser } = useFirebase()

    const CHART_BOXES = [
        <SyllabusChart />, <AccountChart />, <SchoolYearAccordionTable />
    ]

    return (
        <>
            <Box sx={{
                width: '100%',
                paddingX: '3rem',
                paddingY: '2rem',
            }}>
                <Typography variant='h4' gutterBottom>Dashboard</Typography>
                <Grid
                    container
                    spacing={3}
                    sx={{ marginBottom: '3rem' }}>
                    {
                        CHART_BOXES.map((v, k) =>
                            <Grid
                                key={k}
                                item
                                xs={4}>
                                {v}
                            </Grid>)
                    }
                    <Grid item xs={6}>
                        <Suspense fallback={<Skeleton />}>
                            <SyllabusTable />
                        </Suspense>
                    </Grid>
                    <Grid item xs={6}>
                        <Suspense fallback={<Skeleton />}>
                            <SubjectTable />
                        </Suspense>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
