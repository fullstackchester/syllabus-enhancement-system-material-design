import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyFileInformation from './MyFileInformation';
import MyFileComments from './MyFileComments';
import MyFileHistory from './MyFileHistory';


export default function MyFileView() {
    const { postId } = useParams()
    const [value, setValue] = useState('1')

    const tabPanelList = [
        {
            value: '1',
            label: 'Syllabi Information',
            children: <MyFileInformation postId={postId} />
        },
        {
            value: '2',
            label: 'Comments',
            children: <MyFileComments postId={postId} />
        },
        {
            value: '3',
            label: 'Edit History',
            children: <MyFileHistory postId={postId} />
        },
    ]

    return (
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
                    <TabList onChange={(e, newValue) => setValue(newValue)} aria-label="basic tabs example">
                        <Tab value="1" label="Syllabi Information" />
                        <Tab value="2" label="Comments" />
                        <Tab value="3" label="Edit History" />
                    </TabList>
                </Box>
                {
                    tabPanelList.map((v, k) => {
                        return (
                            <TabPanel
                                key={k}
                                value={v.value}
                                sx={{
                                    height: '100%',
                                    paddingY: '2rem',
                                    paddingX: '3rem',
                                    overflowY: 'hidden'
                                }}>
                                {v.children}
                            </TabPanel>
                        )
                    })
                }
            </TabContext>
        </Box>
    )
}
