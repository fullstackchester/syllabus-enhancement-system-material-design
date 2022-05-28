import React, { useContext, useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from '../JS/Firebase';

const AuthContext = React.createContext()

export function useFirebase() {
    return useContext(AuthContext);
}

export default function FirebaseProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [photoUrl, setPhotoUrl] = useState('')
    const [role, setRole] = useState()

    const value = {
        currentUser,
        userData,
        role,
        photoUrl
    }

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            if (user) {
                onValue(ref(database, `users/${user.uid}`), snapshot => {
                    if (snapshot.exists()) {
                        setRole(snapshot.val().userType)
                        setUserData(snapshot.val())

                    }
                    if (snapshot.val().photoUrl) {
                        setPhotoUrl(snapshot.val().photoUrl)
                    }
                })
            }
            setLoading(false)

        })

        return unsub
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
