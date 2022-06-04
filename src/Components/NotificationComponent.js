import React, { useState, useEffect } from 'react'
import { Notifications, CheckCircleOutline } from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import {
    IconButton, styled, Badge, Menu, MenuItem, Tooltip,
    ListItem, Typography, ListItemText, ListItemAvatar, MenuList, Avatar
} from '@mui/material'
import { onValue, ref, update } from 'firebase/database'
import { database } from '../JS/Firebase'
import { useNavigate } from 'react-router-dom'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        padding: '0 4px',
    },
}));

export default function NotificationComponent({ uid }) {

    const nav = useNavigate()
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)


    useEffect(() => {
        onValue(ref(database, `notifications`), snap => {
            if (snap.exists()) {
                setNotifications(
                    Object.values(snap.val()).filter((notif => {
                        if (notif.uid === uid && notif.notificationType === 'check-post') {
                            return notif
                        }
                    }))
                )
                setUnreadCount(
                    Object.values(snap.val()).filter((notif => {
                        if (notif.uid === uid && notif.notificationType === 'check-post' && notif.notificationStatus === 'unread') {
                            return notif
                        }
                    }))
                )
            }
        })
    }, [])




    const handleClose = () => {
        setAnchorEl(null)
        notifications.forEach(i => {
            update(ref(database, `notifications/${i.notificationId}`), { notificationStatus: 'read' })
                .then(() => {

                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    return (
        <>
            <Tooltip title='Notifications'>
                <IconButton
                    id='notification-button'
                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <StyledBadge badgeContent={unreadCount.length} color="primary">
                        <Notifications />
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    width: '50vw',
                    maxHeight: '90vh'
                }}
                MenuListProps={{
                    'aria-labelledby': 'notification-button',
                }} >
                <MenuList>
                    <Typography component={ListItem} variant='h5' sx={{ fontWeight: 'bold' }}>Notifications</Typography>
                </MenuList>
                {notifications.length !== 0 ?
                    <MenuList>
                        {
                            notifications
                                .sort((x, y) => new Date(y.notificationDate).getTime() - new Date(x.notificationDate).getTime())
                                .map((v, k) =>
                                    <MenuItem key={k}
                                        selected={v.notificationStatus === 'unread'}
                                        onClick={() => {
                                            nav(`/my-files/${uid}/${v.postId}`)
                                            setAnchorEl(null)
                                        }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: blue[500] }}>
                                                <CheckCircleOutline />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={v.notificationTitle}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'block' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                        noWrap
                                                    >{v.notificationMessage}</Typography>
                                                    {v.notificationDate}
                                                </React.Fragment>
                                            }>

                                        </ListItemText>
                                    </MenuItem>
                                )
                        }
                    </MenuList>
                    :
                    <MenuList>
                        <Typography
                            color='text.secondary'
                            component={ListItem}
                            sx={{ fontWeight: 'strong', width: '100rem' }}>
                            No notifications to show at the moment</Typography>
                    </MenuList>}
            </Menu>

        </>
    )
}
