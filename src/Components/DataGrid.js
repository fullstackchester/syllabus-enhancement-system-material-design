import React from 'react'
import {
    DataGrid, GridToolbarExport,
    GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,
} from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { useFirebase } from '../Context/FirebaseContext'



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
export default function CustomDataGrid({ columns, rows, onClick, getPrimaryKey, isFetching }) {

    return (
        <DataGrid
            columns={columns}
            rows={rows}
            onCellDoubleClick={onClick}
            getRowId={getPrimaryKey}
            components={{ Toolbar: CustomToolbar, LoadingOverlay: LinearProgress }}
            loading={isFetching}
            autoPageSize
            checkboxSelection
        />
    )
}
