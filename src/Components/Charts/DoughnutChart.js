import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

export default function DoughnutChart(
    { total, }
) {

    const plugins = [{
        beforeDraw: function (chart, args, options) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            ctx.save();
            ctx.font = 'bold 1rem Roboto';
            ctx.textAlign = 'center'
            var text = total
            ctx.fillText(text, width / 2, height / 2 + top);
        }
    }]

    const data = {
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [6, 10, 3],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            borderColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
        borderColor: '#333',
        hoverOffset: 4,
        plugins: [plugins]
    }
    return (
        <Doughnut
            data={data}
            options={{
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                }
            }}
            plugins={plugins} />
    )
}
