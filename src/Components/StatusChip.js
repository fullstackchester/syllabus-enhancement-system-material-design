import { Chip } from '@mui/material'
import React from 'react'

export default function StatusChip({ postStatus }) {
    return (
        <Chip
            color={postStatus === 'Approved' ? 'success' : postStatus === 'Needs revisions' ? 'error' : 'primary'}
            label={postStatus}
            size='small'
            sx={{ fontWeight: '600' }} />
    )
}
