import React from 'react'
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export default function DialogBox({
    isOpen, title, message, handleClick, handleClose, isLoading, btnLabel
}) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    size='small'
                    sx={{ textTransform: 'none' }}
                    onClick={handleClose}
                    disableElevation>Cancel</Button>

                <LoadingButton
                    loading={isLoading}
                    variant='contained'
                    size='small'
                    sx={{ textTransform: 'none' }}
                    onClick={handleClick}
                    disableElevation>{btnLabel}</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}