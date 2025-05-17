// import React, { useEffect, useState } from 'react'
// import { onValue, ref, set, remove } from 'firebase/database'
// import { database } from '../../JS/Firebase'
// import { Box } from '@mui/system'
// import { schoolYearList } from '../../Data/Data'
// import { DataGrid, GridToolbar } from '@mui/x-data-grid'
// import {
//     Paper, Typography, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//     TextField, FormControl, InputLabel, Input, Grid, Snackbar, Alert, IconButton
// } from '@mui/material'
// import { LoadingButton } from '@mui/lab'
// import { v4 } from 'uuid'
// import { useFirebase } from '../../Context/FirebaseContext'

// export default function DashboardSyTable() {

//     const { role } = useFirebase()
//     const [open, setOpen] = useState(false)
//     const [isLoading, setLoading] = useState(false)

//     const [syStart, setSyStart] = useState()
//     const [syEnd, setSyEnd] = useState()

//     // for action notification and alert
//     const [actionMessage, setActionMessage] = useState('')
//     const [actionStatus, setActionStatus] = useState()
//     const [snakcOpen, setSnackOpen] = useState(false)


//     const [selected, setSelected] = useState([])

//     const schoolYearTableHeader = [
//         { field: 'syTitle', headerName: 'Title', flex: 1 },
//         { field: 'syStart', headerName: 'Start Date', flex: 1 },
//         { field: 'syEnd', headerName: 'End Date', flex: 1 },
//     ]


//     function addSy(e) {
//         e.preventDefault()
//         setLoading(true)
//         setTimeout(() => {
//             const newSchoolYearId = v4()
//             const newSchoolYear = {
//                 syId: newSchoolYearId,
//                 syStart: syStart,
//                 syEnd: syEnd,
//                 syDateCreated: new Date().toLocaleString(),
//                 syTitle: `SY ${new Date(syStart).getFullYear()}-${new Date(syEnd).getFullYear()}`,
//                 syStatus: 'open'
//             }

//             set(ref(database, `schoolYear/${newSchoolYearId}`), newSchoolYear)
//                 .then(() => {
//                     setLoading(false)
//                     setActionStatus('success')
//                     setActionMessage('School Year Added')
//                     setSnackOpen(true)
//                 }).catch((err) => {
//                     setLoading(false)
//                     setActionStatus('error')
//                     setActionMessage(err.message)
//                     setSnackOpen(true)
//                 });

//             setOpen(false)
//             setLoading(false)
//         }, 1000)
//     }

//     function DeleteSy(e) {
//         e.preventDefault()
//         console.log(selected)
//     }

//     return (
//         <>
//             <Box sx={{ height: '50vh', marginTop: '3rem' }}>
//                 <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }} >
//                     <Typography variant='h5' sx={{ flex: '1' }} gutterBottom>School Year</Typography>
//                     {
//                         role === 'administrator' &&
//                         <>
//                             {selected.length !== 0 &&
//                                 <Button
//                                     variant='outlined'
//                                     sx={{ textTransform: 'none' }}
//                                     color='error'
//                                     size='small'
//                                     type='button'
//                                     onClick={DeleteSy}
//                                 >Delete</Button>}
//                             <Button
//                                 variant='outlined'
//                                 sx={{ textTransform: 'none', marginLeft: '.5rem' }}
//                                 size='small'
//                                 type='button'
//                                 onClick={() => setOpen(true)}>Add</Button>
//                         </>
//                     }
//                 </Stack>
//                 <DataGrid
//                     columns={schoolYearTableHeader}
//                     rows={schoolYearList}
//                     getRowId={(row) => row.syId}
//                     components={{ Toolbar: GridToolbar }}
//                     onSelectionModelChange={(id) => {
//                         setSelected(id)
//                     }}
//                     checkboxSelection
//                 />
//             </Box>
//             <Dialog open={open} maxWidth='md'>
//                 <DialogTitle>
//                     New School Year
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box
//                         component='form'
//                         id='add-school-year-form'
//                         onSubmit={addSy}>
//                         <Grid container spacing={1} sx={{ width: '40vw' }}>
//                             <Grid item xs={12}>
//                                 <Typography
//                                     component='label'
//                                     htmlFor='sy-start-date'
//                                     variant='subtitle2'
//                                     color='text.secondary'>Start School Year</Typography>
//                                 <TextField
//                                     id='sy-start-date'
//                                     type='date'
//                                     onChange={(e) => setSyStart(e.target.value)}
//                                     fullWidth
//                                     required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Typography
//                                     component='label'
//                                     htmlFor='sy-end-date'
//                                     variant='subtitle2'
//                                     color='text.secondary'>End School Year</Typography>
//                                 <TextField
//                                     id='sy-end-date'
//                                     type='date'
//                                     onChange={(e) => setSyEnd(e.target.value)}
//                                     fullWidth
//                                     required />
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         type='button'
//                         onClick={() => setOpen(false)}>Cancel</Button>
//                     <LoadingButton
//                         type='submit'
//                         form='add-school-year-form'
//                         loading={isLoading}
//                         size='small'
//                         variant='contained'
//                         disableElevation>Add</LoadingButton>
//                 </DialogActions>
//             </Dialog>
//             <Snackbar
//                 open={snakcOpen}
//                 onClose={() => setSnackOpen(false)}
//                 autoHideDuration={1000}>
//                 <Alert severity={actionStatus} >
//                     {actionMessage}
//                 </Alert>
//             </Snackbar>
//         </>
//     )
// }
