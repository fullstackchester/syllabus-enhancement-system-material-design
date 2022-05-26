import { Avatar, Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { onValue, ref } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import '../../index.css'
import { database, storage } from '../../JS/Firebase'

export default function AccountProfile({ uid }) {


    const [account, setAccount] = useState({})
    const [avatarImg, setAvatarImg] = useState()
    useEffect(() => {
        onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setAccount(snap.val())
                getDownloadURL(storageRef(storage, `avatars/${uid}/${snap.val().photoUrl}`))
                    .then((url) => {
                        const avatar = document.getElementById('profile-avatar')
                        setAvatarImg(url)
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    }, [])

    return (
        <>
            <Box sx={{
                padding: '0px',
            }}>
                <img className='cover-photo' />
                <Box
                    sx={{
                        position: 'relative',
                        top: '-3rem',
                        right: '-2rem',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        width: '90%',
                    }}>
                    <Avatar
                        id='profile-avatar'
                        alt={account.name}
                        src={avatarImg}
                        sx={{
                            width: '10rem',
                            height: '10rem',
                            marginRight: '1rem',
                            border: '.3rem solid'
                        }} />
                    <Typography variant='h3'>{account.name}</Typography>
                    <Button
                        variant='contained'
                        size='small'
                        sx={{
                            marginLeft: '.75rem',
                            textTransform: 'none'
                        }}>Edit Profile</Button>
                    <Stack sx={{
                        width: 'max-content',
                        position: 'relative',
                        right: '-11rem'
                    }}>
                        <Typography variant='h5'>{`Employee ID: ${account.employeeId}`}</Typography>
                        <Typography variant='h5'>{`Department: ${account.department}`}</Typography>
                    </Stack>
                </Box>

            </Box>
        </>
    )
}
