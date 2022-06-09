import React from 'react'
import {
    DataGrid, GridToolbarExport,
    GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,
} from '@mui/x-data-grid'
import { Button, LinearProgress, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useFirebase } from '../Context/FirebaseContext'




export default function CustomDataGrid(
    { columns, rows, onClick, getPrimaryKey, isFetching, selectedItemAction }) {

    function CustomToolbar() {
        const { role } = useFirebase()
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {role === 'administrator' && <GridToolbarExport />}
            </GridToolbarContainer>
        )
    }
    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{ height: '100%', width: '100%', }}>

            <DataGrid
                columns={columns}
                rows={rows}
                onCellDoubleClick={onClick}
                getRowId={getPrimaryKey}
                loading={isFetching}
                onSelectionModelChange={selectedItemAction}
                components={{
                    Toolbar: CustomToolbar,
                    LoadingOverlay: LinearProgress
                }}
                checkboxSelection />
        </Box>

    )
}
