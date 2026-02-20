'use client'

import { Space, Tag } from 'antd';
import { mockInterface } from '@/interface';
import { FaFolderOpen } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const statusConfig: Record<mockInterface['status'], { color: string; icon: React.ReactNode; label: string }> = {
    'Aberto': {
        color: 'processing',
        icon: <FaFolderOpen />,
        label: 'Aberto'
    },
    'Em andamento': {
        color: 'warning',
        icon: <GrInProgress />,
        label: 'Em Andamento'
    },
    'Resolvido': {
        color: 'success',
        icon: <FaCheck />,
        label: 'Resolvido'
    },
    'Cancelado': {
        color: 'default',
        icon: <IoMdClose />,
        label: 'Cancelado'
    },
};

type StatusBadgeProps = {
    status: mockInterface['status']
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const { color, icon, label } = statusConfig[status];

    return (
        <Tag color={color} style={{
            fontSize: '14px',
            padding: '4px 10px',
            height: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            width: '150px',
            backgroundColor: 'transparent'
        }}>
            <Space size={4}>
                {icon}
                {label.toUpperCase()}
            </Space>
        </Tag>
    );
};

export default StatusBadge;