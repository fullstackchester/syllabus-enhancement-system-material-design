import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'

export default function Restricted({ children }) {

    const { role, currentUser } = useFirebase()

    if (role === 'faculty') {
        console.log(`ROLE: ${role}. REDIRECTING TO MY FILES PAGE`)

        return <Navigate to={`/my-files/${currentUser.uid}`} replace />
    }
    return children
}
