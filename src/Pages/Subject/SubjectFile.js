import React, { useState } from 'react'
import { Tab } from '@mui/material'
import { Box } from '@mui/system'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import { useParams } from 'react-router-dom';
import SubjectSyllabus from './SubjectSyllabus';
import SubjectInformation from './SubjectInformation';

export default function SubjectFile() {
    const { subjectId } = useParams()
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabsPanels = [
        {
            value: '1',
            children: <SubjectInformation subjectId={subjectId} />
        },
        {
            value: '2',
            children: <SubjectSyllabus subjectId={subjectId} />
        }
    ]
    return (
        <>
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
                        <TabList onChange={handleChange} aria-label="basic tabs example">
                            <Tab value="1" label="Subject Information" />
                            <Tab value="2" label="Syllabus" />
                        </TabList>
                    </Box>
                    {
                        tabsPanels.map((v, k) =>
                            <TabPanel
                                key={k} value={v.value}
                                sx={{ height: '100%', paddingY: '2rem', paddingX: '3rem' }}>
                                {v.children}
                            </TabPanel>)
                    }
                </TabContext>
            </Box>
        </>
    )
}
