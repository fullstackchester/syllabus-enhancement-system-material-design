import { Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../JS/States'

export default function Practice() {

    const theme = useSelector((state) => state.mode)
    const dispatch = useDispatch()
    return (
        <>
            <Typography variant='h2'>{theme}</Typography>
            <button onClick={() => dispatch(changeTheme.toDark())}>Changeto Dark Mode</button>
            <button onClick={() => dispatch(changeTheme.toLight())}>Changeto Light Mode</button>
        </>
    )
}
