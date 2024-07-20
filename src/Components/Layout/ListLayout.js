import React from 'react'
import { Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function ListLayout(
    { path, btnTitle, btnHidden, listTitle, children }
) {
    const nav = useNavigate()
    const { container1, container2 } = listLayoutStyles
    return (
        <Container
            disableGutters
            sx={ container1 }>
            <Container
                disableGutters
                sx={ container2 }>
                <Typography variant='h4' sx={{ fontWeight: '300' }}>{listTitle}</Typography>
                <Button
                    variant     ='contained'
                    size        ='small'
                    startIcon   ={<AddIcon />}
                    onClick     ={() => nav(path)}
                    sx          ={{ textTransform: 'none', display: btnHidden, minWidth: 'max-content' }}
                    disableElevation>
                    {btnTitle}
                </Button>
            </Container>
            {children}
        </Container>
    )
}

export const listLayoutStyles = {
    container1: {
        flex:           '1',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        alignItems:     'center ',
        paddingX:       '3rem',
        paddingY:       '2rem',
    },
    container2: {
        display:        'flex',
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '1rem'
    }
}
