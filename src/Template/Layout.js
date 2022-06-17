import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import Sidebar from './Sidebar';
import { Box } from '@mui/system'
import { Divider } from '@mui/material';
import { signOut } from 'firebase/auth'
import { auth } from '../JS/Firebase';
import Header from './Header';





export default function Layout() {

    const [isOpen, setOpen] = useState(false)

    const [isLoading, setLoading] = useState(false)
    const nav = useNavigate()

    function logoutAccount(e) {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            signOut(auth)
                .then(() => {
                    setLoading(false)
                    nav('/')
                }).catch((err) => {
                    console.log(err.message)
                });
        }, 2000)
    }

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
