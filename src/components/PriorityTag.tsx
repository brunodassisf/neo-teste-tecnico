'use client'

import { Space, Tag } from 'antd';
import { Imock } from '@/interface';
import { RiAlarmWarningFill } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { IoAlertOutline } from "react-icons/io5";
import { RiSlowDownLine } from "react-icons/ri";

const prioridadeConfig: Record<Imock['prioridade'], { color: string; icon: React.ReactNode; label: string }> = {
    'Crítica': {
        color: 'error',
        icon: <RiAlarmWarningFill />,
        label: 'Crítica'
    },
    'Alta': {
        color: 'warning',
        icon: <TiWarning />,
        label: 'Alta'
    },
    'Média': {
        color: 'processing',
        icon: <IoAlertOutline />,
        label: 'Média'
    },
    'Baixa': {
        color: 'success',
        icon: <RiSlowDownLine />,
        label: 'Baixa'
    },
};

type PriorityTagProps = {
    priority: Imock['prioridade']
}

const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
    const { color, icon, label } = prioridadeConfig[priority];

    return (
        <Tag color={color} style={{
            fontSize: '16px',
            padding: '4px 10px',
            height: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            width: '100px',
            backgroundColor: 'transparent'
        }}>
            <Space size={4}>
                {icon}
                {label.toUpperCase()}
            </Space>
        </Tag>
    );
};

export default PriorityTag;