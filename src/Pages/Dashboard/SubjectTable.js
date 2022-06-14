import React, { useEffect, useState } from 'react'
import {
    Card, CardContent, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import { onValue, ref } from 'firebase/database'
import { database } from '../../JS/Firebase'

export default function SubjectTable() {

    const [list, setList] = useState([])
    const [post, setPost] = useState([])

    const subTableHeader = [
        'Course Code', 'Files', 'Review', 'Revise', 'Approved'
    ]

    useEffect(() => {
        const getSubject = () => onValue(ref(database, 'subject'), snapshot => {
            if (snapshot.exists()) {
                setList(Object.values(snapshot.val()))
            }
        })
        const getPost = () => onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setPost(Object.values(snapshot.val()))
            }
        })

        getSubject()
        getPost()
    }, [])


    return (
        <Card
            sx={{ width: '100%', height: 'auto' }}
            elevation={3} >
            <CardContent
                sx={{ height: 'auto' }}>
                <Typography variant='h6' gutterBottom>Subject Files Summary</Typography>
                <TableContainer sx={{ height: 'auto', minHeight: '14rem' }}>
                    <Table aria-label="a dense table" size='small'>
                        <TableHead>
                            <TableRow>
                                {subTableHeader.map((v) =>
                                    <TableCell key={v} align='left'>{v}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list
                                .slice(0, 5)
                                .map((v, k) =>
                                    <TableRow key={k}>
                                        <TableCell>{v.courseCode}</TableCell>
                                        <TableCell>
                                            {(function () {
                                                let fileCount = 0
                                                post.forEach(i => {
                                                    if (i.subjectId === v.subjectId) {
                                                        fileCount += 1
                                                    }
                                                })
                                                return fileCount
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            {(function () {
                                                let fileCount = 0
                                                post.forEach(i => {
                                                    if (i.postStatus === 'Needs reviewing' && i.subjectId === v.subjectId) {
                                                        fileCount += 1
                                                    }
                                                })
                                                return fileCount
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            {(function () {
                                                let fileCount = 0
                                                post.forEach(i => {
                                                    if (i.postStatus === 'Needs revisions' && i.subjectId === v.subjectId) {
                                                        fileCount += 1
                                                    }
                                                })
                                                return fileCount
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            {(function () {
                                                let fileCount = 0
                                                post.forEach(i => {
                                                    if (i.postStatus === 'Approved' && i.subjectId === v.subjectId) {
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
