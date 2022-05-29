import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircle, Article, Dashboard, Group, School, Folder } from "@mui/icons-material";
import { useFirebase } from '../Context/FirebaseContext';
import Typography from '@mui/material/Typography';
import '../index.css'

export default function Sidebar() {

    const nav = useNavigate()
    const { currentUser } = useFirebase()

    const SidebarLinks = [
        {
            label: 'Dashboard',
            link: '/dashboard',
            icon: <Dashboard color='primary' />
        },
        {
            label: 'Syllabus',
            link: '/syllabus',
            icon: <Article color='primary' />
        },
        {
            label: 'Subjects',
            link: '/subjects',
            icon: <School color='primary' />
        },
        {
            label: 'Faculty',
            link: '/faculty',
            icon: <Group color='primary' />
        },
        {
            label: 'My Files',
            link: `/my-files/${currentUser.uid}`,
            icon: <Folder color='primary' />
        },
        {
            label: 'Account',
            link: `/account/${currentUser.uid}`,
            icon: <AccountCircle color='primary' />
        },
    ]
    return (
        <>
            <Box sx={{
                height: '100%',
                width: '18%',
                borderRight: '1px solid #DADCE0',
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
                                <ListItem key={k} disablePadding>
                                    <ListItemButton onClick={() => nav(v.link)} color='primary'>
                                        <ListItemIcon> {v.icon} </ListItemIcon>
                                        <ListItemText primary={v.label} />
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
