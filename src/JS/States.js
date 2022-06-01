import { configureStore, createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'mode',
    initialState: { mode: 'light' },
    reducers: {
        toLight(state, action) { state.mode = 'light' },
        toDark(state, action) { state.mode = 'dark' }
    }
})

// const acccountDataSlice = createSlice({
//     name: 'accountData',
//     initialState: {},
//     reducers: {
//         fetchData(state, action) {

//         }
//     }
// })

const store = configureStore({
    reducer: themeSlice.reducer
})

export const changeTheme = themeSlice.actions
export default store