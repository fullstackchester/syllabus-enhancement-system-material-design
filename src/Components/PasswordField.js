import React from 'react'
import { IconButton, FormControl, InputLabel, InputAdornment, OutlinedInput } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

export default function PasswordField(
    { width, fieldId, togglePass, isShowPass, label, value, onChange }) {
    return (
        <FormControl
            variant='outlined'
            size='small'
            sx={{ width: width }}>
            <InputLabel htmlFor={fieldId}>{label}</InputLabel>
            <OutlinedInput
                id={fieldId}
                label={label}
                value={value}
                margin='dense'
                onChange={onChange}
                type={isShowPass ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position='end' >
                        <IconButton onClick={togglePass}
                            edge='end'>
                            {isShowPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
