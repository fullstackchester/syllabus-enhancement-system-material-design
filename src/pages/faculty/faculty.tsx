import { Anchor, Button, Pagination, Table, TextInput, ActionIcon , Menu, Text, Drawer } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { type JSX, useEffect, useState } from 'react';
import dummy from './data/faculty.json';
import style from './faculty.module.css';
import {
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconFilter,
  IconFilter2
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

let data = chunk(
  dummy,
  15
);


function FacultyPage(): JSX.Element {

    const [activePage, setPage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        fetchFacultyList();
    }, [])

    function fetchFacultyList(): void {
        // getFacultyList()
        // .then((response) => response.json())
        // .then((val) => {
        //     if(val) {
        //         setFacultyList(val);
        //     }
        // }).catch((e) => {
        //     console.error(e);
        // })
    }

    function filterCurrentData() {
        data[activePage] = []
    }

    const rows: JSX.Element[] = data[activePage].map((row, i) => {
        return (
            <Table.Tr key={i}>
                <Table.Td width={300}>
                    <Anchor component="button" fz="sm">
                        {row.uid}
                    </Anchor>
                </Table.Td>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.department}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.files}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                        {row.files?.length}
                </Table.Td>
            </Table.Tr>
        );
    });

    return(
        <>
            <Drawer size="xl" opened={opened} onClose={close} title="New Faculty">
                {/* Drawer content */}
            </Drawer>
            <nav className={style.custom_nav}>
                <TextInput
                    placeholder="Enter Employee Id, Name, etc"
                    withErrorStyles={false}
                    rightSectionPointerEvents="none"
                    width={400}

                    rightSection={ <IconSearch size={20} /> }
                />
                <Button onClick={open}>Add</Button>
            </nav>
            <Table.ScrollContainer minWidth={300}>
                <Table verticalSpacing="xs" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th key="eid">EID</Table.Th>
                            <Table.Th key="name" style={{ display: 'flex', justifyContent: 'space-between'}}>
                                Name
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle" size={'xs'} color='gray' aria-label="Settings">
                                            <IconFilter2 />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>Filter By</Menu.Label>
                                        <Menu.Item leftSection={<IconSettings size={14} />}>
                                        Settings
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                                        Messages
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconPhoto size={14} />}>
                                        Gallery
                                        </Menu.Item>
                                        <Menu.Item
                                        leftSection={<IconSearch size={14} />}
                                        rightSection={
                                            <Text size="xs" c="dimmed">
                                            ⌘K
                                            </Text>
                                        }
                                        >
                                        Search
                                        </Menu.Item>

                                        <Menu.Divider />

                                        <Menu.Label>Danger zone</Menu.Label>
                                        <Menu.Item
                                        leftSection={<IconArrowsLeftRight size={14} />}
                                        >
                                        Transfer my data
                                        </Menu.Item>
                                        <Menu.Item
                                        color="red"
                                        leftSection={<IconTrash size={14} />}
                                        >
                                        Delete my account
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Table.Th>
                            <Table.Th key="department">Department</Table.Th>
                            <Table.Th key="published">Published</Table.Th>
                            <Table.Th key="pending">Pending</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Pagination total={data.length -1} value={activePage} onChange={setPage} mt="sm" />
        </>
    )
}



export default FacultyPage;