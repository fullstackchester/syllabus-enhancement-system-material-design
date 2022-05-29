import React from 'react'
import { Notifications } from '@mui/icons-material'
import { IconButton, Tooltip, styled, Badge, Menu, MenuItem } from '@mui/material'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        padding: '0 4px',
    },
}));

export default function NotificationComponent({ uid }) {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton id='notification-button' onClick={handleClick}>
                <StyledBadge badgeContent={10} color="primary">
                    <Notifications />
                </StyledBadge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'notification-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

        </>
    )
}
