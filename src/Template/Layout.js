import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';
import Sidebar from './Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar, Switch, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



export default function Layout() {
    const [mode, setMode] = useState('light')
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const handleMode = (event, newMode) => {
        setMode(newMode);
    };

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
                            <ToggleButtonGroup
                                value={mode}
                                exclusive
                                size='small'
                                color='primary'
                                onChange={handleMode}
                                aria-label="text alignment" >
                                <Tooltip title='Dark Mode' placement='bottom'>
                                    <ToggleButton value="dark" aria-label="left aligned">
                                        <DarkModeIcon />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title='Light Mode' placement='bottom'>
                                    <ToggleButton value="light" aria-label="left aligned">
                                        <LightModeIcon />
                                    </ToggleButton>
                                </Tooltip>

                            </ToggleButtonGroup>
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
