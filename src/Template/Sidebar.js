import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { AccountCircle, Article, Dashboard, Group, School, Folder } from "@mui/icons-material";
import { useFirebase } from '../Context/FirebaseContext';
import Typography from '@mui/material/Typography';
import '../index.css'

export default function Sidebar() {

    const nav = useNavigate()
    const { currentUser, role } = useFirebase()
    const [activeLink, setActiveLink] = useState('Dashboard')

    const SidebarLinks = [
        {
            label: 'Dashboard',
            link: '/dashboard',
            icon: <Dashboard color='primary' />,
            hidden: role !== 'administrator' ? 'none' : '',
        },
        {
            label: 'Syllabus',
            link: '/syllabus',
            icon: <Article color='primary' />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'Subjects',
            link: '/subjects',
            icon: <School color='primary' />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'Faculty',
            link: '/faculty',
            icon: <Group color='primary' />,
            hidden: role === 'faculty' ? 'none' : '',
        },
        {
            label: 'My Files',
            link: `/my-files/${currentUser.uid}`,
            icon: <Folder color='primary' />,
            hidden: false,
        },
        {
            label: 'Account',
            link: `/account/${currentUser.uid}`,
            icon: <AccountCircle color='primary' />,
            hidden: false,
        },
    ]
    return (
        <>
            <Box sx={{
                height: '100%',
                width: '18%',
                position: 'sticky',
                top: '0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className='logo-title-divider'>
                        <img
                            id='logo-img'
                            src={require('../Assets/logo.svg').default} width='50' height='50' />
                        <Typography variant='h5'>CICT-SEMS</Typography>
                    </div>
                </Box>
                <List sx={{
                    flex: '1',
                    overflowY: 'auto',
                }}>
                    {
                        SidebarLinks.map((v, k) => {
                            return (
                                <ListItemButton
                                    key={k}
                                    color='primary'
                                    selected={v.label === activeLink}
                                    sx={{ display: v.hidden }}
                                    onClick={() => {
                                        nav(v.link)
                                        setActiveLink(v.label)
                                    }}
                                >
                                    <ListItemIcon> {v.icon} </ListItemIcon>
                                    <ListItemText primary={v.label} />
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Box>
        </>
    )
}
