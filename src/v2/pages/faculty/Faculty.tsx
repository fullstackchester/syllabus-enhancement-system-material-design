import { Anchor, Table } from '@mantine/core';
import { JSX, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { getFacultyList } from './faculty.service';



function FacultyPage(): JSX.Element {

    
    const [facultyList, setFacultyList] = useState<any[]>([]);
    useEffect(() => {
        fetchFacultyList();
    }, [])

    function fetchFacultyList(): void {
        getFacultyList()
        .then((response) => response.json())
        .then((val) => {
            if(val) {
                setFacultyList(val);
            }
        }).catch((e) => {
            console.error(e);
        })
    }

    const rows: JSX.Element[] = facultyList.map((row, i) => {
        return (
            <Table.Tr key={i}>
                <Table.Td width={300}>
                    <Anchor component="button" fz="sm">
                        {row.uid}
                    </Anchor>
                </Table.Td>
                <Table.Td>{row.name} + {i}</Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.department}
                    </Anchor>
                </Table.Td>
            </Table.Tr>
        );
    });

    return(
        <>
            faculty
            <Outlet />
        </>
    )
}

/* 
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


*/

export default FacultyPage;