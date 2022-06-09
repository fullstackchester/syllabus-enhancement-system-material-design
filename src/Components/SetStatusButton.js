import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ref, update, set } from 'firebase/database';
import { database } from '../JS/Firebase';
import { v4 } from 'uuid'

export default function SetStatusButton({ post }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function updateStatus(status) {
        update(ref(database, `posts/${post.postId}`), { postStatus: status })
            .then(() => {
                const notifId = v4()
                const newNotification = {
                    notificationId: notifId,
                    notificationDate: new Date().toLocaleString(),
                    notificationTitle: `Post Checked`,
                    notificationMessage: `Your post '${post.postTitle}' was checked: ${status}`,
                    notificationStatus: 'unread',
                    notificationType: 'check-post',
                    postId: post.postId,
                    uid: post.uid,
                }
                set(ref(database, `notifications/${notifId}`), newNotification)
                    .then(() => {

                    }).catch((err) => {
                        console.log(err)
                    });


            }).catch((err) => {
                console.log(err)
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
                sx={{ textTransform: 'none'}}
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
