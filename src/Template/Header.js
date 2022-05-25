import { Avatar, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Header() {
    return (
        <>
            <div className='header'>
                <Box></Box>
                <Avatar alt='Account-avatar' src='./Assets/Img/sample-avatar.jpg' />
            </div>
        </>
    )
}
