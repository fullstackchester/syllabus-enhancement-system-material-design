import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ref, update } from 'firebase/database';
import { database } from '../JS/Firebase';

export default function SetStatusButton({ postId }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function updateStatus(status) {
        update(ref(database, `posts/${postId}`), { postStatus: status })
            .then(() => {

            }).catch((err) => {

            });
        setAnchorEl(null)
    };

    return (
        <>
            <Button
                id="basic-button"
                variant='contained'
                disableElevation
                size='small'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >Set Status</Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }} >
                <MenuItem onClick={() => updateStatus('Approved')}>Approved</MenuItem>
                <MenuItem onClick={() => updateStatus('Needs reviewing')}>Needs Reviewing</MenuItem>
                <MenuItem onClick={() => updateStatus('Needs revisions')}>Needs Revisions</MenuItem>
            </Menu>
        </>
    )
}
