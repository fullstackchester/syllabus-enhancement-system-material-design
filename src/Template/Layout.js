import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import Sidebar from './Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system'
import { DarkMode, LightMode, Notifications } from '@mui/icons-material';
import PoppinsTTf from '../Fonts/Poppins/Poppins-Regular.ttf';
import Logout from '@mui/icons-material/Logout';
import { useFirebase } from '../Context/FirebaseContext';
import Button from '@mui/material/Button';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, ListItemIcon, MenuItem, Menu, ToggleButton, ToggleButtonGroup,
    CssBaseline, Avatar, Stack, Tooltip, styled, Badge, Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signOut } from 'firebase/auth'
import { auth, database, storage } from '../JS/Firebase';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { onValue, ref } from 'firebase/database';
import NotificationComponent from '../Components/NotificationComponent';





export default function Layout() {
    const [mode, setMode] = useState('light')
    const [isOpen, setOpen] = useState(false)
    const customTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const { userData, role, currentUser } = useFirebase()
    const [isLoading, setLoading] = useState(false)
    const nav = useNavigate()


    // for displayin avatar
    const [avatar, setAvatar] = useState()
    useEffect(() => {
        onValue(ref(database, `users/${currentUser.uid}`), snap => {
            if (snap.exists()) {
                getDownloadURL(storageRef(storage, `avatars/${currentUser.uid}/${snap.val().photoUrl}`))
                    .then((url) => {
                        setAvatar(url)
                    }).catch((err) => {
                        console.log(err.message)
                    })
            }
        })
    }, [])

    const handleMode = (event, newMode) => {
        setMode(newMode);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <div className='template-body'>
                <Sidebar />
                <Divider orientation='vertical' />
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
                                    <DarkMode />
                                </ToggleButton>
                                <ToggleButton value="light" aria-label="left aligned" onClick={(e) => setMode(e.target.value)}>
                                    <LightMode />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Stack spacing={1} direction='row'>
                            <Box>
                                <NotificationComponent uid={currentUser.uid} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar
                                            alt={userData.name}
                                            sx={{ width: 32, height: 32 }}
                                            src={avatar} />

                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => setOpen(true)}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Stack>
                    </div>
                    <Divider />
                    <div className='viewport'>
                        <Outlet />
                    </div>
                </div>
                <Dialog
                    open={isOpen}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Confirm Account Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <LoadingButton loading={isLoading} onClick={logoutAccount} autoFocus>
                            Logout
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>

    )
}
