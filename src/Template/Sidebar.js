import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { SidebarLinks } from '../Data/SidebarLink'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {

    const nav = useNavigate()
    return (
        <>
            <Box sx={{
                height: '100%',
                width: '18%',
                backgroundColor: '#FFF',
                borderRight: '1px solid #DADCE0',
                position: 'sticky',
                top: '0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '8rem',
                }}>

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
