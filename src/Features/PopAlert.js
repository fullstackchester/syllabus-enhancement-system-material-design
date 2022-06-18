import { createSlice } from '@reduxjs/toolkit'

export const popalertSlice = createSlice({
    name: 'alert',
    initialState: {
        value: {
            status: 'success',
            message: '',
            visible: false
        }
    },
    reducers: {
        notify(state, action) {
            state.value = action.payload
        }
    }
})


export const { notify } = popalertSlice.actions
export default popalertSlice.reducer;