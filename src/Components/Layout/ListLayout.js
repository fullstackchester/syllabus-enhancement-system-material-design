import React from 'react'
import { Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function ListLayout(
    { path, btnTitle, btnHidden, listTitle, children }
) {
    const nav = useNavigate()
    return (
        <Container
            disableGutters
            sx={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center ',
                paddingX: '3rem',
                paddingY: '2rem',
            }}>
            <Container
                disableGutters
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                <Typography variant='h4' sx={{ fontWeight: '300' }}>{listTitle}</Typography>
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    onClick={() => nav(path)}
                    sx={{ textTransform: 'none', display: btnHidden, minWidth: 'max-content' }}
                    disableElevation>{btnTitle}</Button>
            </Container>
            {children}
        </Container>
    )
}
