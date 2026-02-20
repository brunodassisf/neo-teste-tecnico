'use client'

import { Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdManageAccounts } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '.';

type modeType = 'technical' | 'manager';

const ToggleViews: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentMode: modeType = pathname.includes('/gestor') ? 'manager' : 'technical';

    const handleNavigation = (newMode: modeType) => {
        router.push(newMode === 'technical' ? '/tecnico' : '/gestor');
    };

    if (!isMounted) {
        return (
            <Skeleton.Toggle />
        );
    }

    return (
        <Flex justify='center'>
            <Flex className='toggle-view-content'>
                <div
                    className={`toggle-view-box v-left ${currentMode === 'technical' ? 'v-active' : ''}`}
                    onClick={() => handleNavigation('technical')}
                >
                    <MdManageAccounts size={30} />
                    <Typography.Title level={5}>Técnico</Typography.Title>
                </div>
                <div
                    className={`toggle-view-box v-right ${currentMode === 'manager' ? 'v-active' : ''}`}
                    onClick={() => handleNavigation('manager')}
                >
                    <FaChartPie size={30} />
                    <Typography.Title level={5}>Gestor</Typography.Title>
                </div>
            </Flex>
        </Flex>
    );
};

export default ToggleViews;