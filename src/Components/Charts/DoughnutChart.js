import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function DoughnutChart() {

    const plugins = [{
        beforeDraw: function (chart, args, options) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            ctx.save();
            ctx.font = 'bold 1rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            var text = '19'
            ctx.fillText(text, width / 2, height / 2 + top);
        }
    }]

    const data = {
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [6, 10, 3],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
        borderColor: '#333',
        hoverOffset: 4,
        plugins: [plugins]
    }
    return (
        <>
            <Pie
                data={data}
                options={{ maintainAspectRatio: false }}
                plugins={plugins} />

        </>
    )
}
