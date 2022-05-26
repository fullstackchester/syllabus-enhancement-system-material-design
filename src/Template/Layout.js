import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';
import Sidebar from './Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';



export default function Layout() {
    const [mode, setMode] = useState('light')
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='template-body'>
                <Sidebar />
                <div className='outlet'>
                    <div className='header'>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Switch onChange={() => mode === 'light' ? setMode('dark') : setMode('light')} />
                            {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                        </Box>
                        <Avatar alt='Account-avatar' src='./Assets/Img/sample-avatar.jpg' />
                    </div>
                    <div className='viewport'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </ThemeProvider>

    )
}
