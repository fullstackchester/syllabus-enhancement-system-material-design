import { onValue, ref, query, limitToFirst } from 'firebase/database'
import { database } from '../JS/Firebase'


export let subjectList = []
export let schoolYearList = []
export let syllabusList = []
export let firstFiveSyllabus = []
export let firstFiveSubjects = []

export const subjectTableHeader = [
    'Course Code',
    'Title',
    'Credit Units'
]
export const syllabusTableHeader = [
    'Latest Syllabus',
    'Status'
]
export const dashboardSubjectTableHeader = [
    'Title',
    'Files'
]


onValue(ref(database, `posts`), snap => {
    if (snap.exists()) {
        syllabusList = Object.values(snap.val())
    }
})

const queryPost = query(ref(database, `posts`), limitToFirst(5))
onValue(queryPost, snap => {
    if (snap.exists()) {
        firstFiveSyllabus = Object.values(snap.val())
    }
})

const querySubjects = query(ref(database, `subject`), limitToFirst(5))
onValue(querySubjects, snap => {
    if (snap.exists()) {
        firstFiveSubjects = Object.values(snap.val())
    }
})

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

export const schoolSyllabusHeader = [
    { field: 'postTitle', headerName: 'Title', flex: 1 },
    { field: 'postStatus', headerName: 'Status', flex: 1 },
]







