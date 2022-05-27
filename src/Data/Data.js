import { onValue, ref } from 'firebase/database'
import { database } from '../JS/Firebase'



export let subjectList = []
export let schoolYearList = []

export const subjectTableHeader = [
    'Course Code',
    'Title',
    'Credit Units'
]


onValue(ref(database, `subject`), snap => {
    if (snap.exists()) {
        subjectList = Object.values(snap.val())
    }
})

onValue(ref(database, `schoolYear`), snap => {
    if (snap.exists()) {
        schoolYearList = Object.values(snap.val())
    }
})


