import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import React, { useState } from 'react'
import { Stack } from '@mui/material';
import { useFirebase } from '../Context/FirebaseContext';
import ThemeModeSwitch from '../Components/ThemeModeSwitch';
import NotificationComponent from '../Components/NotificationComponent';
import { useNavigate } from 'react-router-dom';
import { auth } from '../JS/Firebase';
import { signOut } from 'firebase/auth';
import ProfileAvatar from '../Components/ProfileAvatar';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';


export default function Header({ ACCOUNT_NAME }) {
    const [isOpen, setOpen] = useState(false)
    const { currentUser } = useFirebase()
    const [isLoading, setLoading] = useState(false)

    const nav = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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
        <Box
            sx={{
                height: '4rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '0',
                boxShadow: '0 0 0 0'
            }}>
            <ThemeModeSwitch />
            <Stack spacing={1} direction='row'>
                <NotificationComponent uid={currentUser.uid} />
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <ProfileAvatar
                                uid={currentUser.uid}
                                height={32}
                                width={32}
                                border='2px' />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
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
        </Box>
    )
}
