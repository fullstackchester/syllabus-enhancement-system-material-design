import { Container, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function SyllabusAdd() {

    const { postId } = useParams()
    
    return (
        <>
            <Container
                sx={{
                    height: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <Typography variant='h4'>New Syllabus</Typography>
            </Container>
            <Container
                sx={{
                    height: 'calc(100% - 5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #333'
                }}>

            </Container>

        </>
    )
}
