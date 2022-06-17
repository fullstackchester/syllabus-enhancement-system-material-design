import React from 'react'
import { LoadingButton } from '@mui/lab'

export default function FormButton({ label, isLoading }) {
    return (
        <LoadingButton
            type='submit'
            loading={isLoading}
            size='small'
            disableElevation
            variant='contained'
            sx={{
                marginTop: '1rem',
                width: 'max-content',
                textTransform: 'none',
                fontWeight: '600'
            }}>
            {label}
        </LoadingButton>
    )
}
