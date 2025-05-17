// import React, { useContext, useState, useEffect } from 'react'
// import { ref, onValue } from 'firebase/database'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth, database } from '../JS/Firebase';

// const AuthContext = React.createContext()

// export function useFirebase() {
//     return 
// }

// export default function FirebaseProvider({ children }) {
// /* 
//     const [currentUser, setCurrentUser] = useState()
//     const [userData, setUserData] = useState({})
//     const [loading, setLoading] = useState(true)
//     const [photoUrl, setPhotoUrl] = useState('')
//     const [role, setRole] = useState()
//     const [department, setDepartment] = useState()

//     const value = {
//         currentUser,
//         userData,
//         role,
//         photoUrl,
//         department
//     }

//     useEffect(() => {

//         const unsub = onAuthStateChanged(auth, user => {
//             setCurrentUser(user)
//             if (user) {
//                 onValue(ref(database, `users/${user.uid}`), snapshot => {
//                     if (snapshot.exists()) {
//                         setRole(snapshot.val().userType)
//                         setUserData(snapshot.val())
//                         setDepartment(snapshot.val().department)
//                     }
//                 })
//                 onValue(ref(database, `users/${user.uid}/photoUrl`), snapshot => {
//                     if (snapshot.exists()) {
//                         setPhotoUrl(snapshot.val())
//                     }
//                 })
//             }
//             setLoading(false)

//         })

//         return unsub
//     }, []); */

//     return (
//         // <AuthContext.Provider value={value}>
//         <AuthContext.Provider>
//             {/* {!loading && children} */}
//         </AuthContext.Provider>
//     )
// }
