import { Typography } from '@mui/material'
import React from 'react'
import { useFirebase } from '../../Context/FirebaseContext'

export default function Dashboard() {

    const { currentUser } = useFirebase()
    return (
        <>
            <Typography variant='h2'>{currentUser.uid}</Typography>
        </>
    )
}
