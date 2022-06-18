import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Typography } from '@mui/material'
import StatusChip from './StatusChip'

export default function FileCard({ title, date, status, handleClick }) {
    return (
        <Card
            elevation={3}
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
                height: 'auto',
                minHeight: '13rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
            <CardHeader
                title={
                    <Typography variant='subtitle1'>
                        {title}
                    </Typography>}
                subheader={
                    <Typography variant='subtitle2' color='text.secondary'>
                        {`Posted: ${new Date(date).toLocaleDateString('en-US',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}`}
                    </Typography>
                }
            >
            </CardHeader>
            <CardContent
                sx={{
                    flex: '1'
                }}>

            </CardContent>
            <CardActions
                sx={{
                    justifyContent: 'flex-end'
                }}>
                {status && <StatusChip postStatus={status} />}
            </CardActions>
        </Card>
    )
}
