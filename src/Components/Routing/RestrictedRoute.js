import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'

export default function Restricted({ children }) {

    const { role, currentUser } = useFirebase()

    if (role === 'faculty') {
        return <Navigate to={`/my-files/${currentUser.uid}`} replace />
    }

    if (role === "area chair") {
        return <Navigate to='/syllabus' replace />
    }
    else {
        return children
    }
}
