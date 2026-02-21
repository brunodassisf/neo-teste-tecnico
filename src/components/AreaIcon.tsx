'use client'

import { Space, Tag } from 'antd';
import { Imock } from '@/interface';
import { SlEnergy } from "react-icons/sl";
import { PiThermometerCold } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { IoWaterOutline } from "react-icons/io5";

const areaConfig: Record<Imock['area'], { color: string; icon: React.ReactNode; label: string }> = {
    'Refrigeração': {
        color: 'default',
        icon: <PiThermometerCold />,
        label: 'Refrigeração'
    },
    'Energia': {
        color: 'default',
        icon: <SlEnergy />,
        label: 'Energia'
    },
    'Ar-condicionado': {
        color: 'default',
        icon: <TbAirConditioning />,
        label: 'Ar-condicionado'
    },
    'Água': {
        color: 'default',
        icon: <IoWaterOutline />,
        label: 'Água'
    },
};

type AreaIconProps = {
    area: Imock['area']
}

const AreaIcon: React.FC<AreaIconProps> = ({ area }) => {
    const { color, icon, label } = areaConfig[area];

    return (
        <Tag color={color} style={{ backgroundColor: 'transparent' }}>
            <Space size={4} style={{
                fontSize: '14px',
                padding: '4px 10px',
                height: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                width: '180px',
            }}>
                {icon}
                {label.toUpperCase()}
            </Space>
        </Tag>
    );
};

export default AreaIcon;


