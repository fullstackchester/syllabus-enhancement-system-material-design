import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: {
            uid: '',
            name: '',
            photoUrl: '',
        }
    },
    reducers: {
        retrieve: (state, action) => {
            state.value = action.payload
        },
        update: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { retrieve, update } = profileSlice.actions
export default profileSlice.reducer