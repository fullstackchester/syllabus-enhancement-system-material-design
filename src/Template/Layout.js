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
import PoppinsTTf from '../Fonts/Poppins/Poppins-Regular.ttf';



export default function Layout() {
    const [mode, setMode] = useState('light')
    const customTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const handleMode = (event, newMode) => {
        setMode(newMode);
    };

    return (
        <ThemeProvider theme={customTheme}>
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
                                onChange={handleMode}
                                exclusive
                                size='small'
                                color='primary'
                                aria-label="text alignment" >
                                <ToggleButton value="dark" aria-label="left aligned" onClick={(e) => setMode(e.target.value)}>
                                    <DarkModeIcon />
                                </ToggleButton>
                                <ToggleButton value="light" aria-label="left aligned" onClick={(e) => setMode(e.target.value)}>
                                    <LightModeIcon />
                                </ToggleButton>
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
