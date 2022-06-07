import React from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

export default function CustomData(
    { children, TypoVariant, isFetching, height, type }
) {
    return (
        <>
            {isFetching ?
                <Skeleton variant={type} height={height} animation='wave' /> :
                <Typography variant={TypoVariant}>
                    {children}
                </Typography>}
        </>
    )
}
