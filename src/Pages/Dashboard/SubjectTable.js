import React from 'react'
import {
    Card, CardHeader, CardContent, CardActions, Button, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material'
import { firstFiveSubjects, dashboardSubjectTableHeader, syllabusList, subjectList } from '../../Data/Data'
import StatusChip from '../../Components/StatusChip'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

export default function SubjectTable() {
    const nav = useNavigate()

    return (
        <Card sx={{ width: '100%' }} variant='outlined'>
            <CardHeader
                title={`Subjects ${String.fromCharCode(183)} ${subjectList.length}`} >
            </CardHeader>
            <CardContent sx={{ height: '23rem' }}>

                <TableContainer component={Paper} elevation={3}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {dashboardSubjectTableHeader.map((v) =>
                                    <TableCell key={v} align='left'>{v}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {firstFiveSubjects.map((v, k) =>
                                <TableRow key={k}>
                                    <TableCell>{v.courseCode}</TableCell>
                                    <TableCell>
                                        {(function () {
                                            let fileCount = 0
                                            syllabusList.forEach(i => {
                                                if (i.subjectId === v.subjectId) {
                                                    fileCount += 1
                                                }
                                            })
                                            return fileCount
                                        })()}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                <Button onClick={() => nav('/subjects')} size='small' variant='text' sx={{ textTransform: 'none' }}>View All</Button>
            </CardActions>
        </Card>
    )
}
