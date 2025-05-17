import { Button } from "@mantine/core";
import { Anchor, Group, Progress, Table, Text } from '@mantine/core';
import { JSX } from "react";
import { dummyData } from "./dummy.data";
import s from './dashboard.module.scss';

function Dashboard(): JSX.Element {

    const rows: JSX.Element[] = dummyData.map((row) => {
        const totalReviews: number = row.reviews.negative + row.reviews.positive;
        const positiveReviews: number = (row.reviews.positive / totalReviews) * 100;
        const negativeReviews: number = (row.reviews.negative / totalReviews) * 100;

        return (
            <Table.Tr key={row.title}>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.title}
                    </Anchor>
                </Table.Td>
                <Table.Td>{row.year}</Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.author}
                    </Anchor>
                </Table.Td>
                <Table.Td>{Intl.NumberFormat().format(totalReviews)}</Table.Td>
                <Table.Td>
                    <Group justify="space-between">
                        <Text fz="xs" c="teal" fw={700}>
                            {positiveReviews.toFixed(0)}%
                        </Text>
                        <Text fz="xs" c="red" fw={700}>
                            {negativeReviews.toFixed(0)}%
                        </Text>
                    </Group>
                    <Progress.Root>
                        <Progress.Section
                            className={s.progressSection}
                            value={positiveReviews}
                            color="teal"
                        />

                        <Progress.Section
                            className={s.progressSection}
                            value={negativeReviews}
                            color="red"
                        />
                    </Progress.Root>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <>

            <h1>DASHBOARD PAGE IS WORKING</h1>
            <Button>Dashboard Button</Button>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Book title</Table.Th>
                            <Table.Th>Year</Table.Th>
                            <Table.Th>Author</Table.Th>
                            <Table.Th>Reviews</Table.Th>
                            <Table.Th>Reviews distribution</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    )
}

export default Dashboard;