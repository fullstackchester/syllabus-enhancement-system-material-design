import { Box, Grid, Typography, CircularProgress, Skeleton } from '@mui/material'
import React, { Suspense } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'


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

    return (
        <>
            <Box sx={{ width: '100%', padding: '1rem', }}>
                <Typography variant='h4' gutterBottom>Dashboard</Typography>
                <Grid container spacing={1} sx={{ marginBottom: '3rem' }}>
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
                        <Suspense fallback={<Skeleton />}>
                            <DashboardSyTable />
                        </Suspense>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
