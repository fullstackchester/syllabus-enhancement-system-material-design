import { Anchor, Table } from '@mantine/core';
import { type JSX, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
// import { getFacultyList } from './faculty.service';



function FacultyPage(): JSX.Element {

    
    const [facultyList, setFacultyList] = useState<any[]>([]);
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

export default FacultyPage;