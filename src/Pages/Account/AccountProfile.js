import { Avatar, Button, Stack, Typography, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import { onValue, ref } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { database, storage } from '../../JS/Firebase'

export default function AccountProfile({ uid }) {

    const [account, setAccount] = useState({})
    const [avatarImg, setAvatarImg] = useState()
    const nav = useNavigate()
    useEffect(() => {
        onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setAccount(snap.val())
            }
            if (snap.val().photoUrl) {
                getDownloadURL(storageRef(storage, `avatars/${uid}/${snap.val().photoUrl}`))
                    .then((url) => {
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
                    {avatarImg ? <Avatar
                        id='profile-avatar'
                        alt={account.name}
                        src={avatarImg}
                        sx={{
                            width: '10rem',
                            height: '10rem',
                            marginRight: '1rem',
                            border: '.3rem solid'
                        }} />
                        :
                        <Skeleton
                            variant="circular"
                            sx={{
                                width: '10rem',
                                height: '10rem',
                                marginRight: '1rem',
                            }} />}
                    <Stack sx={{
                        flex: '1',
                        marginTop: '2.5rem'
                    }}>
                        <Typography variant='h3'>{account.name}</Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>{`Employee ID: ${account.employeeId}`}</Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'strong' }}>{`Department: ${account.department}`}</Typography>
                        <Button
                            disableElevation
                            variant='outlined'
                            size='small'
                            onClick={() => nav(`/account/edit-profile/${uid}`)}
                            sx={{
                                width: 'max-content',
                                textTransform: 'none'
                            }}>Edit Profile</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}


