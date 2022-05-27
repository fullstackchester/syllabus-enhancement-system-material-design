import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import React, { useState } from 'react'
import { Stack } from '@mui/material';
import { useFirebase } from '../Context/FirebaseContext';

export default function Header() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { userData, role } = useFirebase()

    console.log(userData)
    console.log(role)
    return (
        <>
            <div className='header'>
                <Box></Box>
                <Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>{userData.name}</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>
            </div>
        </>
    )
}
