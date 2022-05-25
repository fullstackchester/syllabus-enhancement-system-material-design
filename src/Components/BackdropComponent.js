import { Backdrop } from '@mui/material'
import React from 'react'

export default function BackdropComponent({ children, isOpen }) {
    return (
        <>
            <Backdrop open={isOpen}>
                {children}
            </Backdrop>
        </>
    )
}
