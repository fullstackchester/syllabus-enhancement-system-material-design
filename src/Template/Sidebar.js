import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { blue, grey } from '@mui/material/colors';
import { NavLink } from 'react-router-dom'
import { AccountCircle, Article, Dashboard, Group, School, Folder } from "@mui/icons-material";
import { useFirebase } from '../Context/FirebaseContext';
import '../index.css'

export default function Sidebar() {

    const { currentUser, role } = useFirebase()

    const SidebarLinks = [
        {
            label: 'Dashboard',
            link: '/dashboard',
            icon: <Dashboard />,
            hidden: role !== 'administrator' ? 'none' : '',
        },
        {
            label: 'Syllabus',
            link: '/syllabus',
            icon: <Article />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'Subjects',
            link: '/subjects',
            icon: <School />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'Faculty',
            link: '/faculty',
            icon: <Group />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'My Files',
            link: `/my-files/${currentUser.uid}`,
            icon: <Folder />,
            hidden: false,
        },
        {
            label: 'Account',
            link: `/account/${currentUser.uid}`,
            icon: <AccountCircle />,
            hidden: false,
        },
    ]
    return (
        <>
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    height: '100%',
                    width: '18vw',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Toolbar
                    sx={{
                        height: '7rem',
                    }} >

                </Toolbar>
                <Divider />
                <List>
                    {
                        SidebarLinks.map((v, k) => {
                            return (
                                <ListItemButton
                                    key={k}
                                    disableRipple
                                    component={NavLink}
                                    exact={v.link}
                                    to={v.link}
                                    style={({ isActive }) => ({
                                        color: isActive ? '#FFFFFF' : '',
                                        backgroundColor: isActive ? blue[500] : '',
                                    })}
                                    sx={{ display: v.hidden ? 'none' : '', }}>
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        {v.icon}
                                    </ListItemIcon>
                                    <ListItemText>{v.label}</ListItemText>
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Box>
        </>
    )
}
