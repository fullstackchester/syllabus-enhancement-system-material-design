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
                        <TabList onChange={handleChange} aria-label="basic tabs example">
                            <Tab value="1" label="Profile" />
                            <Tab value="2" label="Security" />
                        </TabList>
                    </Box>
                    {
                        [
                            {
                                value: '1',
                                panel: <AccountProfile uid={uid} />
                            },
                            {
                                value: '2',
                                panel: <AccountSecurity uid={uid} />
                            },
                        ].map((v, k) =>
                            <TabPanel
                                key={k}
                                value={v.value}
                                style={{
                                    height: '100%',
                                    padding: '0',
                                }}>
                                {v.panel}
                            </TabPanel>
                        )
                    }
                </TabContext>


            </Box>
        </>
    )
}

{/* <TabPanel
    value="1"
    style={{
        height: '100%',
        padding: '0',
        border: '1px solid red'
    }}>
    <AccountProfile uid={uid} />
</TabPanel>
<TabPanel
    value="2"
    style={{
        height: '100%',
        padding: '0',
        border: '1px solid red'
    }}>
    <AccountSecurity uid={uid} />
</TabPanel> */}
