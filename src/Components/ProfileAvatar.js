import React, { useEffect, useState } from 'react'
import { Avatar, Skeleton } from '@mui/material'
import { database, storage } from '../JS/Firebase'
import { onValue, ref } from 'firebase/database'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { grey } from '@mui/material/colors'

export default function ProfileAvatar({ uid, width, height, border }) {
    const [USER_AVATAR, setUSER_AVATAR] = useState('')
    const [fetching, setFetching] = useState(true)
    const [name, setName] = useState('')

    useEffect(() => {
        const getAvatar = () => onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setName(snap.val().name)
                if (snap.val().photoUrl) {
                    getDownloadURL(storageRef(storage, `avatars/${uid}/${snap.val().photoUrl}`))
                        .then((url) => {
                            setUSER_AVATAR(url)
                        }).catch((err) => {
                            console.log(err.message)
                        })
                }

            }
        })
        setFetching(false)
        getAvatar()
    }, [])

    return fetching ?
        <Skeleton
            variant='circular'
            animation='wave'
            height={height}
            width={width} /> :
        <Avatar
            alt={name}
            src={USER_AVATAR}
            sx={{
                width: width,
                height: height,
                border: `${border} solid`,
                backgroundColor: grey[700]
            }}>
            {name.slice(0, 1)}
        </Avatar>
}
