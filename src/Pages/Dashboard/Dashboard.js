// import { Box, Grid, Typography } from '@mui/material'
import React, { Suspense } from 'react'
// import { useFirebase } from '../../Context/FirebaseContext'
// import AccountChart from './AccountChart'
// import SchoolYearAccordionTable from './SchoolYearAccordionTable'
// import SyllabusChart from './SyllabusChart'
// import SubjectTable from './SubjectTable'
// import SyllabusTable from './SyllabusTable'

export default function Dashboard() {

    // const { currentUser } = useFirebase()
    // const WeatherCard = React.lazy(() => import('./WeatherCard'))
    // const SyllabusGraph = React.lazy(() => import('./SyllabusGraph'))

    // const CHART_BOXES = [
    //     <SyllabusChart />, <AccountChart />, <SchoolYearAccordionTable />
    // ]

    return (
        <>
            {/* <Box sx={{
                width: '100%',
                paddingX: '3rem',
                paddingY: '2rem',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Typography variant='h4' gutterBottom>Dashboard</Typography>
                    <Typography
                        variant='subtitle1'
                        gutterBottom>
                        {new Date().toLocaleDateString('en-US',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                    </Typography>
                </Box>
                <Grid
                    container
                    spacing={3}
                    sx={{ marginBottom: '3rem' }}>
                    {
                        CHART_BOXES.map((v, k) =>
                            <Grid
                                key={k}
                                xs={4}
                                item>
                                {v}
                            </Grid>)
                    }
                    <Grid item xs={6}>
                        <SyllabusTable />
                    </Grid>
                    <Grid item xs={6}>
                        <SubjectTable />
                    </Grid>
                    <Grid item xs={9}>
                        <Suspense fallback={`Loading...`}>
                            <SyllabusGraph />
                        </Suspense>
                    </Grid>
                    <Grid item xs={3}>
                        <Suspense fallback={`Loading...`}>
                            <WeatherCard />
                        </Suspense>
                    </Grid>
                </Grid>
            </Box> */}
        </>
    )
}
