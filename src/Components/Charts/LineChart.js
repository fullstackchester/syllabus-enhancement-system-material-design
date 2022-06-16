import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { red, green, blue } from '@mui/material/colors'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
export default function LineChart({ POST_WMAD, POST_SM, POST_BA }) {

    const TODAY = new Date()
    const DATE_YESTERDAY = new Date(TODAY)
    const DATE_MINUS_TWO = new Date(TODAY)
    const DATE_MINUS_THREE = new Date(TODAY)
    const DATE_MINUS_FOUR = new Date(TODAY)
    const DATE_MINUS_FIVE = new Date(TODAY)
    const DATE_MINUS_SIX = new Date(TODAY)

    // TODAY.setDate(TODAY.getDate() - 7)
    DATE_YESTERDAY.setDate(TODAY.getDate() - 1)
    DATE_MINUS_TWO.setDate(TODAY.getDate() - 2)
    DATE_MINUS_THREE.setDate(TODAY.getDate() - 3)
    DATE_MINUS_FOUR.setDate(TODAY.getDate() - 4)
    DATE_MINUS_FIVE.setDate(TODAY.getDate() - 5)
    DATE_MINUS_SIX.setDate(TODAY.getDate() - 6)


    const labels = [
        DATE_MINUS_SIX.toLocaleDateString('en-US', { weekday: 'long' }),
        DATE_MINUS_FIVE.toLocaleDateString('en-US', { weekday: 'long' }),
        DATE_MINUS_FOUR.toLocaleDateString('en-US', { weekday: 'long' }),
        DATE_MINUS_THREE.toLocaleDateString('en-US', { weekday: 'long' }),
        DATE_MINUS_TWO.toLocaleDateString('en-US', { weekday: 'long' }),
        DATE_YESTERDAY.toLocaleDateString('en-US', { weekday: 'long' }),
        'Today']


    function getPostCount(post, date) {
        let POST_COUNT = 0
        post.map((x) => {
            if (date === new Date(x.postDate).toLocaleDateString()) {
                POST_COUNT += 1
            }
        })
        return POST_COUNT
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Service Management',
                data: [
                    getPostCount(POST_SM, DATE_MINUS_SIX.toLocaleDateString()),
                    getPostCount(POST_SM, DATE_MINUS_FIVE.toLocaleDateString()),
                    getPostCount(POST_SM, DATE_MINUS_FOUR.toLocaleDateString()),
                    getPostCount(POST_SM, DATE_MINUS_THREE.toLocaleDateString()),
                    getPostCount(POST_SM, DATE_MINUS_TWO.toLocaleDateString()),
                    getPostCount(POST_SM, DATE_YESTERDAY.toLocaleDateString()),
                    getPostCount(POST_SM, TODAY.toLocaleDateString())
                ],
                borderColor: red[600],
                backgroundColor: red[600],
            },
            {
                label: 'Web and Mobile Application',
                data: [getPostCount(POST_WMAD, DATE_MINUS_SIX.toLocaleDateString()),
                getPostCount(POST_WMAD, DATE_MINUS_FIVE.toLocaleDateString()),
                getPostCount(POST_WMAD, DATE_MINUS_FOUR.toLocaleDateString()),
                getPostCount(POST_WMAD, DATE_MINUS_THREE.toLocaleDateString()),
                getPostCount(POST_WMAD, DATE_MINUS_TWO.toLocaleDateString()),
                getPostCount(POST_WMAD, DATE_YESTERDAY.toLocaleDateString()),
                getPostCount(POST_WMAD, TODAY.toLocaleDateString())

                ],
                borderColor: blue[500],
                backgroundColor: blue[500],
            },
            {
                label: 'Business Analytics',
                data: [
                    getPostCount(POST_BA, DATE_MINUS_SIX.toLocaleDateString()),
                    getPostCount(POST_BA, DATE_MINUS_FIVE.toLocaleDateString()),
                    getPostCount(POST_BA, DATE_MINUS_FOUR.toLocaleDateString()),
                    getPostCount(POST_BA, DATE_MINUS_THREE.toLocaleDateString()),
                    getPostCount(POST_BA, DATE_MINUS_TWO.toLocaleDateString()),
                    getPostCount(POST_BA, DATE_YESTERDAY.toLocaleDateString()),
                    getPostCount(POST_BA, TODAY.toLocaleDateString())

                ],
                borderColor: green[400],
                backgroundColor: green[400],
            },
        ],
    }

    return (
        <Line options={options} data={data} />
    )
}
