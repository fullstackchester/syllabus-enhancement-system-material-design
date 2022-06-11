import React from 'react'
import { IconButton, FormControl, InputLabel, InputAdornment, OutlinedInput } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'


export default function PasswordField(
    { width, fieldId, togglePass, isShowPass, label, value, onChange }) {
    return (
        <FormControl
            variant='outlined'
            size='small'
            margin='dense'
            required
            sx={{ width: width }}>
            <InputLabel htmlFor={fieldId}>{label}</InputLabel>
            <OutlinedInput
                id={fieldId}
                label={label}
                value={value}
                onChange={onChange}
                type={isShowPass ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position='end' >
                        <IconButton
                            size='small'
                            onClick={togglePass}
                            edge='end'>
                            {isShowPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
