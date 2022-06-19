import React, { useEffect, useState } from 'react'
import {
    Card, CardContent, CardActions, Typography,
    TableContainer, Table, TableHead, TableBody, TableCell, TableRow
} from '@mui/material'
import { onValue, ref } from 'firebase/database'
import { database } from '../../JS/Firebase'

export default function SchoolYearAccordionTable() {
    const [list, setList] = useState([])
    const [files, setFiles] = useState([])
    const syTableHeader = [
        'School Year', 'Files'
    ]
    useEffect(() => {
        const getSy = () => onValue(ref(database, 'schoolYear'), snapshot => {
            if (snapshot.exists()) {
                setList(Object.values(snapshot.val()))
            }
        })
        const getPost = () => onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setFiles(Object.values(snapshot.val()))
            }
        })

        getSy()
        getPost()
    }, [])

    return (
        <Card
            elevation={3}
            sx={{
                width: '100%',
                height: 'auto'
            }}>
            <CardContent
                sx={{
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                <Typography
                    variant='h6'
                    sx={{
                        width: '100%',
                    }}
                    gutterBottom>School Year</Typography>
                <TableContainer
                    sx={{
                        height: '10rem',
                        width: '100%',
                    }}>
                    <Table aria-label="a dense table" size='small'>
                        <TableHead>
                            <TableRow>
                                {syTableHeader.map((v) =>
                                    <TableCell key={v} align='left'>{v}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list
                                .sort((a, b) => new Date(b.syDateCreated).getTime() - new Date(a.syDateCreated).getTime())
                                .map((v, k) =>
                                    <TableRow key={k}>
                                        <TableCell>{v.syTitle}</TableCell>
                                        <TableCell>
                                            {(function () {
                                                let fileCount = 0
                                                files.forEach(i => {
                                                    if (i.syId === v.syId) {
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
            </CardActions>
        </Card>
    )
}
