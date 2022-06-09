import React from 'react'
import { Box } from '@mui/system'
import { Grid, Typography, Link, Button } from '@mui/material'
import { Attachment, Person, MenuBook, PushPin } from '@mui/icons-material'

export default function PostLinkLayout({
    File, Url, Date, Author, Subject
}) {

    return (
        <Box sx={{
            height: 'max-content',
            width: '60%',
        }}>
            <Grid container spacing={0}>
                <Grid item xs={1}>
                    <Person fontSize='small' />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='body2'>{Author}</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Attachment fontSize='small' />
                </Grid>
                <Grid item xs={11}>
                    <Typography
                        component={Button}
                        size='small'
                        sx={{ textTransform: 'none'}}
                        onClick={() => alert('Clicked')}
                        variant='body2'>{File}</Typography>
                </Grid>
                <Grid item xs={1} >
                    <MenuBook fontSize='small' />
                </Grid>
                <Grid item xs={11}>
                    <Typography variant='body2'>{File}</Typography>
                </Grid>
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
