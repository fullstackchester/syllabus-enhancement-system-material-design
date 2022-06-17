import React, { useState } from 'react'
import { Tab } from '@mui/material'
import { Box } from '@mui/system'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import FacultyInformation from './FacultyInformation'
import FacultySyllabus from './FacultySyllabus'
import { useParams } from 'react-router-dom'

export default function FacultyProfile() {
    const { uid } = useParams()
    const [value, setValue] = useState('1')

    const tabsPanels = [
        {
            value: '1',
            children: <FacultyInformation uid={uid} />
        },
        {
            value: '2',
            children: <FacultySyllabus uid={uid} />
        }
    ]
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TabContext value={value}>
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    position: 'sticky',
                    top: '0',
                }}>
                    <TabList
                        onChange={(event, newValue) => setValue(newValue)}
                        aria-label="basic tabs example">
                        <Tab value="1" label="Profile" />
                        <Tab value="2" label="Files" />
                    </TabList>
                </Box>
                {
                    tabsPanels.map((v, k) =>
                        <TabPanel
                            key={k}
                            value={v.value}
                            sx={{ height: '100%', padding: '0' }}>
                            {v.children}
                        </TabPanel>)
                }
            </TabContext>
        </Box>
    )
}
