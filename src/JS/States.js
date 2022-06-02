import { configureStore, createSlice } from '@reduxjs/toolkit'
import { subjectList } from '../Data/Data'

const themeSlice = createSlice({
    name: 'mode',
    initialState: { mode: 'light' },
    reducers: {
        toLight(state, action) { state.mode = 'light' },
        toDark(state, action) { state.mode = 'dark' }
    }
})

const subjectSlice = createSlice({
    name: "subjects",
    initialState: { value: subjectList },
    reducers: {
        addSubject: (state, action) => { },

    }
})

// const store = configureStore({ reducer: themeSlice.reducer })

const store = configureStore({ reducer: themeSlice.reducer })



export const changeTheme = themeSlice.actions
export default store