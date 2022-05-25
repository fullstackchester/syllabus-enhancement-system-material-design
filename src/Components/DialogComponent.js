import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export default function DialogComponent({ isOpen, handleClose, title, content }) {
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}
