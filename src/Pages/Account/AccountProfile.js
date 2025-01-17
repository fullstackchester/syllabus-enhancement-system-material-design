import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.scss'
import { database } from '../../JS/Firebase'
import ProfileAvatar from '../../Components/ProfileAvatar'

export default function AccountProfile({ uid }) {

    const [account, setAccount] = useState({})

    const nav = useNavigate()
    useEffect(() => {
        const getData = () => onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setAccount(snap.val())
            }
        })
        getData()
    }, [])

    return (
        <Box sx={{
            height: 'auto',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            scrollBehavior: 'smooth'
        }}>
            <Box
                id='cover-photo'
                className='cover-photo'
                component='img'
                sx={{
                    height: '15rem',
                    width: '100%',
                    objectFit: 'cover',
                    opacity: '50%',
                }}
            >
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    top: '3rem',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    width: '100%',
                    padding: '1rem 2rem 1rem 2rem',
                    position: 'sticky',

                }}>
                <ProfileAvatar
                    uid={uid}
                    height={200}
                    width={200}
                    border='.3rem' />
                <Stack
                    sx={{
                        flex: '1',
                        marginLeft: '1rem',
                    }}>
                    <Typography variant='h3'>{account.name}</Typography>
                    <Typography variant='body1' sx={{ fontWeight: '500' }}>{`Employee ID: ${account.employeeId}`}</Typography>
                    <Typography variant='body1' sx={{ fontWeight: '500' }}>{`Department: ${account.department}`}</Typography>
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
            <Box
            sx={{
                height: "40rem",
                width: '100%',
            }}>
            </Box>
        </Box>
    )
}


