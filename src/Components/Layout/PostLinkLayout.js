import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Grid, Typography, Menu, MenuItem, MenuList, ListItemText, ListItemIcon } from '@mui/material'
import { Attachment, Person, MenuBook, PushPin, Visibility, Download } from '@mui/icons-material'
import { onValue, ref } from 'firebase/database'
import { database } from '../../JS/Firebase'
import { useNavigate } from 'react-router-dom'

export default function PostLinkLayout({
    File, PreviewUrl, DownloadUrl, Date, Author, subjectId
}) {
    const nav = useNavigate()
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    return (
        <Box sx={{
            height: 'max-content',
            width: '60%',
        }}>
            <Grid container spacing={0}>
                {Author &&
                    <>
                        <Grid item xs={1}>
                            <Person fontSize='small' />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='body2'>{Author}</Typography>
                        </Grid>
                    </>
                }
                <Grid item xs={1} >
                    <Attachment fontSize='small' />
                </Grid>
                <Grid item xs={11}>
                    <Typography
                        sx={{ textTransform: 'none', cursor: 'pointer' }}
                        color='primary'
                        variant='body2'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => setAnchor(e.currentTarget)}>
                        {File}
                    </Typography>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchor}
                        open={open}
                        onClose={() => setAnchor(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuList dense>
                            <MenuItem onClick={() => {
                                window.open(PreviewUrl, '_blank')
                                setAnchor(null)
                            }}>
                                <ListItemIcon>
                                    <Visibility />
                                </ListItemIcon>
                                <ListItemText>Preview</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                window.open(DownloadUrl, '_self')
                                setAnchor(null)
                            }}>
                                <ListItemIcon>
                                    <Download />
                                </ListItemIcon>
                                <ListItemText>Download</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Grid>
                {subjectId &&
                    <>
                        <Grid item xs={1} >
                            <MenuBook fontSize='small' />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography
                                sx={{ textTransform: 'none', cursor: 'pointer' }}
                                onClick={() => nav(`/subjects/${subjectId}`)}
                                color='primary'
                                variant='body2'>
                                {(function () {
                                    let subjectTitle = ''
                                    onValue(ref(database, `subject/${subjectId}`), snapshot => {
                                        if (snapshot.exists()) {
                                            subjectTitle = snapshot.val().subjectTitle
                                        }
                                    })
                                    return subjectTitle
                                })()}
                            </Typography>
                        </Grid>
                    </>
                }
                <Grid item xs={1} >
                    <PushPin fontSize='small' />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='body2'>{Date}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
