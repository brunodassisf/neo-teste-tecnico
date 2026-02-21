'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Col, Layout, Row, theme } from 'antd';
import Image from 'next/image';
import { ToggleViews } from '.';
import ModalCalled from '@/modules/ModalCalled';

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const { token } = theme.useToken();

    return (
        <QueryClientProvider client={queryClient}>
            <Layout style={{ minHeight: '100vh', backgroundColor: token.colorBgBase }}>
                <Layout.Header style={{
                    backgroundColor: token.colorPrimary,
                    padding: '0px 16px 0px 0px',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    width: '100%',
                }}>
                    <Row style={{ width: '100%', maxWidth: '100%' }} justify="center">
                        <Col xs={22} sm={20} md={18} lg={22} xl={22} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image
                                src="/neo-logo.svg"
                                width={130}
                                height={83}
                                alt="logo-neo"
                                style={{ display: 'block' }}
                            />
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content style={{ backgroundColor: token.colorBgBase, display: 'flex', flexDirection: 'column' }}>
                    <Row style={{ flex: 1, marginTop: token.marginLG, marginBottom: token.marginLG }} justify="center">
                        <Col xs={22} sm={20} md={18} lg={22} xl={22}>
                            <ToggleViews />
                            <ModalCalled />
                            {children}
                        </Col>
                    </Row>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center', backgroundColor: token.colorBgBase }}>
                    Neo Estech {new Date().getFullYear()}
                </Layout.Footer>
            </Layout>
        </QueryClientProvider>
    );
};

export default Template;