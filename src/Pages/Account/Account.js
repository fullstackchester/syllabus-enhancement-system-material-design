import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountProfile from './AccountProfile';
import AccountSecurity from './AccountSecurity';

export default function Account() {

    const { uid } = useParams()
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
                            <Tab value="1" label="Profile" />
                            <Tab value="2" label="Security" />
                        </TabList>
                    </Box>
                    <TabPanel
                        value="1"
                        style={{
                            height: 'calc(100% - 3rem)',
                            padding: '0'
                        }}>
                        <AccountProfile uid={uid} />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        style={{
                            height: 'calc(100% - 3rem)',
                            padding: '0'
                        }}>
                        <AccountSecurity uid={uid} />
                        
                    </TabPanel>
                </TabContext>


            </Box>
        </>
    )
}
