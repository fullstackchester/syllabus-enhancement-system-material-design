import React, { useEffect, useState } from 'react'
import {
    Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import StatusChip from '../../Components/StatusChip'
import { database } from '../../JS/Firebase'
import { onValue, ref } from 'firebase/database'

export default function SyllabusTable() {
    const [list, setList] = useState([])
    const postTableHeader = [
        'Title', 'Status'
    ]

    useEffect(() => {
        const getList = () => onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setList(Object.values(snapshot.val()))
            }
        })
        getList()
    })

    return (
        <Card
            sx={{ width: '100%' }}
            elevation={3}>
            <CardContent sx={{ height: 'auto', minHeight: '17rem' }}>
                <Typography variant='h6' gutterBottom>Latest Syllabus</Typography>
                <TableContainer sx={{ height: 'auto', minHeight: '14rem' }}>
                    <Table aria-label="a dense table" size='small'>
                        <TableHead>
                            <TableRow>
                                {postTableHeader.map((v) =>
                                    <TableCell key={v} align='left'>{v}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list
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
