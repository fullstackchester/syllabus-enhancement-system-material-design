import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'mode',
    initialState: { mode: 'light' },
    reducers: {
        toLight(state, action) { state.mode = 'light' },
        toDark(state, action) { state.mode = 'dark' }
    }
})

export const { toLight, toDark } = themeSlice.actions
export default themeSlice.reducer

