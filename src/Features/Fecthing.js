import { createSlice } from '@reduxjs/toolkit'

export const fetchSlice = createSlice({
    name: 'fetch',
    initialState: {
        fetching: false
    },
    reducers: {
        fetch(state, action) { state.fetching = true },
        pause(state, action) { state.fetching = false },
    }
})

export const { fetch, pause } = fetchSlice.actions
export default fetchSlice.reducer