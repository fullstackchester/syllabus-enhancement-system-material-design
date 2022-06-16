import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'


export default function Protected({ children }) {

    const { currentUser } = useFirebase()

    if (currentUser === null) {
        return <Navigate to='/' replace />
    }
    return children
}
