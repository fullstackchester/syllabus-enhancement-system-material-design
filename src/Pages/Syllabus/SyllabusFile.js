import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SyllabusInformation from './SyllabusInformation';
import SyllabusComments from './SyllabusComments';


export default function SyllabusFile() {
    const { postId } = useParams()
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TabContext value={value}>
                    <Box sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        position: 'sticky',
                        top: '0',
                    }}>
                        <TabList onChange={handleChange} sx={{ height: '3rem' }} aria-label="basic tabs example">
                            <Tab value="1" label="Syllabi Information" />
                            <Tab value="2" label="Comments" />
                            <Tab value="3" label="Edit History" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SyllabusInformation postId={postId} />
                    </TabPanel>

                    <TabPanel
                        value="2"
                        style={{
                            height: 'calc(100% - 3.3rem)',
                            padding: '0'
                        }}>
                        <SyllabusComments postId={postId} />
                    </TabPanel>

                    <TabPanel value="3"
                        sx={{
                            height: '100%'
                        }}>Item Three</TabPanel>
                </TabContext>
            </Box>
        </>
    )
}
