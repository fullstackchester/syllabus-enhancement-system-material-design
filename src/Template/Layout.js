import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Sidebar from './Sidebar';
import { Box } from '@mui/system'
import { Divider } from '@mui/material';
import Header from './Header';

export default function Layout() {

    return (
        <div className='template-body'>
            <Sidebar />
            <Divider orientation='vertical' />
            <div className='outlet'>
                <Header />
                <Divider />
                <Box sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                    <Outlet />
                </Box>
            </div>
        </div>

    )
}
