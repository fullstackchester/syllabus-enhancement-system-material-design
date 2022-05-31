import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/FirebaseContext'

export default function AuthListener({ children }) {

    const { currentUser } = useFirebase()
    console.log(currentUser.uid)

    if (currentUser !== null) {
        <Navigate to='/dashboard' replace />
    } else {
        return children
    }
}
