import React, { useEffect, useState, Suspense } from 'react'
import { get, ref } from 'firebase/database'
import { database } from '../JS/Firebase'
import { Typography, CircularProgress } from '@mui/material'
import { useFirebase } from '../Context/FirebaseContext'

export default function Practice() {

    const [data, setData] = useState()
    const { currentUser } = useFirebase()
    useEffect(() => {
        async function getData() {
            try {
                const getUserData = await get(ref(database, `users/${currentUser.uid}`))
                return setData(getUserData.val())
            } catch (error) {
                setData(error.message)
            }
        }
        getData()
    }, [])

    return (
        <>

        </>
    )

}
