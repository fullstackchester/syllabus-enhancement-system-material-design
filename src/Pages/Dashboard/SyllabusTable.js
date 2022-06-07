import React from 'react'
import {
    Card, CardHeader, CardContent, CardActions, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import { syllabusList, syllabusTableHeader } from '../../Data/Data'
import StatusChip from '../../Components/StatusChip'
import { useNavigate } from 'react-router-dom'

export default function SyllabusTable() {
    const nav = useNavigate()
    return (
        <Card sx={{ width: '100%' }} variant='outlined'>
            <CardHeader
                title={`Syllabus ${String.fromCharCode(183)} ${syllabusList.length}`}>
            </CardHeader>
            <CardContent sx={{ height: 'auto' }}>
                <TableContainer component={Paper} elevation={3}>
                    <Table aria-label="a dense table" >
                        <TableHead>
                            <TableRow>
                                {syllabusTableHeader.map((v) =>
                                    <TableCell key={v} align='left'>{v}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                syllabusList
                                    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                    .slice(0, 5)
                                    .map((v, k) => {
                                        return (
                                            <TableRow key={k}>
                                                <TableCell>{v.postTitle}</TableCell>
                                                <TableCell><StatusChip postStatus={v.postStatus} /></TableCell>
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                <Button onClick={() => nav('/syllabus')} size='small' variant='text' sx={{ textTransform: 'none' }}>View All</Button>
            </CardActions>
        </Card>
    )
}
