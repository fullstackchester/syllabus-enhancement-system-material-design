import React from 'react'
import {
    Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { syllabusList, syllabusTableHeader } from '../../Data/Data'
import StatusChip from '../../Components/StatusChip'

export default function SyllabusTable() {

    return (
        <Card
            sx={{ width: '100%' }}
            elevation={3}>
            <CardContent sx={{ height: 'auto', minHeight: '17rem' }}>
                <TableContainer>
                    <Table aria-label="a dense table" size='small'>
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
        </Card>
    )
}
