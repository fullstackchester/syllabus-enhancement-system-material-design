import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { blue } from '@mui/material/colors';
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
            hidden: role === 'faculty' ? 'none' : '',
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
                    disableGutters
                    sx={{
                        height: '5rem',
                        display: 'grid',
                        placeContent: 'center',
                        alignContent: 'center'
                    }} >
                    <Stack direction={`row`} sx={{ alignItems: 'center' }}>
                        <img src={require('../Assets/logo.svg').default} width={50} height={50} />
                        <Typography sx={{ fontSize: '1.5rem' }}>CICT-SEMS</Typography>
                    </Stack>

                </Toolbar>
                <Divider />
                <List>
                    {
                        SidebarLinks.map((v, k) => {
                            return (
                                <ListItem
                                    key={k}
                                    dense
                                >
                                    <ListItemButton
                                        disableRipple
                                        component={NavLink}
                                        exact={v.link}
                                        to={v.link}
                                        style={({ isActive }) => ({
                                            color: isActive ? '#FFFFFF' : '',
                                            backgroundColor: isActive ? blue[500] : '',
                                        })}
                                        sx={{
                                            display: v.hidden ? 'none' : '',
                                            borderRadius: '.5rem'
                                        }}>
                                        <ListItemIcon
                                            sx={{ color: 'inherit' }}>
                                            {v.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={v.label}
                                        ></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
        </>
    )
}
