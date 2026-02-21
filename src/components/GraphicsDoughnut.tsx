'use client'

import React, { useRef } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Flex } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

type GraphicsDoughnutProps = {
    data: {
        label: string;
        value: number;
    }[]
}

const GraphicsDoughnut: React.FC<GraphicsDoughnutProps> = ({ data }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const chartData = {
        labels: data?.map((item) => item.label) ?? [],
        datasets: [
            {
                label: 'Chamados por Área',
                data: data?.map((item) => item.value) ?? [],
                backgroundColor: [
                    '#1a55a3',
                    '#FFCE56',
                    '#30ce30',
                    '#36A2EB',
                ],
            },
        ],
    };

    return (
        <Flex align="center" justify="center" ref={parentRef}  className="graphics-size">
            <Doughnut data={chartData} />
        </Flex>
    );
}

export default GraphicsDoughnut;