import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { blue, red, green, grey } from '@mui/material/colors'
import Chart from 'chart.js/auto';

export default function DoughnutChart({ total, chartLabel, chartData }) {

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
        labels: chartLabel.map((v) => v),
        datasets: [{
            data: chartData.map((v) => v),
            backgroundColor: [green[400], blue[500], red[600]],
            borderColor: [green[400], blue[500], red[600]],
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                }
            }} />
    )
}
