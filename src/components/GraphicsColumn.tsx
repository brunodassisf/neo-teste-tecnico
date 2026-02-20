'use client'

import React, { useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Flex } from "antd";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type GraphicsColumnProps = {
    data: {
        label: string;
        value: number;
    }[]
}

const GraphicsColumn: React.FC<GraphicsColumnProps> = ({ data }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const chartData = {
        labels: data?.map((item) => item.label) ?? [],
        datasets: [
            {
                label: 'Chamados por Área',
                data: data?.map((item) => item.value) ?? [],
                backgroundColor: [
                    '#3c89ee',
                    '#FFCE56',
                    '#30ce30',
                ],
            },
        ],
    };

    return (
        <Flex align="center" justify="center" ref={parentRef} style={{ width: '500px', height: '350px' }}>
            <Bar data={chartData} />
        </Flex>
    );
}

export default GraphicsColumn;
