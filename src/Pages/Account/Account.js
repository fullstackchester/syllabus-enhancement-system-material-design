import { Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Account() {

    const { uid } = useParams()
    return (
        <>
            <Typography variant='h1'>Lorem Ipsum</Typography>
            <Typography variant='h4'>{uid}</Typography>
        </>
    )
}
