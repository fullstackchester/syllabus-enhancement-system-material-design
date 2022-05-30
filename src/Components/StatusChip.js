import { Chip } from '@mui/material'
import React, { useState, useEffect } from 'react'

export default function StatusChip({postStatus}) {
    const [chipColor, setChipColor] = useState()

    useEffect(() => {
        if (postStatus === 'Approved') {
            setChipColor('success')
        } else if (postStatus === 'Needs revision') {
            setChipColor('error')
        } else {
            setChipColor('primary')
        }
    }, [])
    return (
        <>
            <Chip color={chipColor} label={postStatus} size='small' />
        </>
    )
}
