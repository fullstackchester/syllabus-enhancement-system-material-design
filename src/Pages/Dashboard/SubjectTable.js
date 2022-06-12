import React from 'react'
import {
    Card, CardContent,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { firstFiveSubjects, dashboardSubjectTableHeader, syllabusList } from '../../Data/Data'

export default function SubjectTable() {

    return (
        <Card
            sx={{ width: '100%' }}
            elevation={3} >
            <CardContent sx={{ height: '17rem' }}>
                <TableContainer>
                    <Table aria-label="a dense table" size='small'>
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
        </Card>
    )
}
