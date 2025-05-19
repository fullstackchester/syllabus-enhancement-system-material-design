import { Anchor, Button, Pagination, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { type JSX, useEffect, useState } from 'react';
import dummy from './data/faculty.json';
import style from './faculty.module.css';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  dummy,
  15
);


function FacultyPage(): JSX.Element {

    const [activePage, setPage] = useState(1);
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
            <nav className={style.custom_nav}>
                <TextInput
                    placeholder="Enter Employee Id, Name, etc"
                    withErrorStyles={false}
                    rightSectionPointerEvents="none"
                    width={400}
                    rightSection={ <IconSearch size={20} /> }
                />
                <Button>Add</Button>
            </nav>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th key="eid">EID</Table.Th>
                            <Table.Th key="name">Name</Table.Th>
                            <Table.Th key="department">Department</Table.Th>
                            <Table.Th key="published">Published</Table.Th>
                            <Table.Th key="pending">Pending</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Pagination total={data.length} value={activePage} onChange={setPage} mt="sm" />
        </>
    )
}

export default FacultyPage;