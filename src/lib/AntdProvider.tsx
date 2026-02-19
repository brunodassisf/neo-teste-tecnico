'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import React from 'react';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
    return (
        <AntdRegistry>
            <ConfigProvider
                locale={ptBR}
                theme={{
                    token: {
                        colorPrimary: '#ec6725',
                    },
                }}
            >
                    {children}
            </ConfigProvider>
        </AntdRegistry>
    );
}