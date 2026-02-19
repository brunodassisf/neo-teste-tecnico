'use client';

import React, { useState } from 'react';
import { Col, Drawer, Layout, Row, theme } from 'antd';
import Image from 'next/image';
import { MenuOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const {
        token: { colorPrimary, colorBgContainer, colorWhite, boxShadowTertiary, marginLG },
    } = theme.useToken();

    const toogleDrawer = () => setOpen(!open);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                backgroundColor: colorPrimary,
                padding: '0px 16px 0px 0px',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center'
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
                        <MenuOutlined 
                            style={{ fontSize: '24px', color: colorWhite, cursor: 'pointer' }} 
                            onClick={toogleDrawer} 
                        />
                    </Col>
                </Row>
            </Header>

            <Content style={{ display: 'flex', flexDirection: 'column' }}>
                <Drawer title="Neo Estech" placement='left' onClose={toogleDrawer} open={open} mask={{blur: true}}>
                    <p>Conteúdo do Menu...</p>
                </Drawer>

                <Row style={{ flex: 1, marginTop: marginLG, marginBottom: marginLG }} justify="center">
                    <Col 
                        xs={22} sm={20} md={18} lg={22} xl={22} 
                        style={{ 
                            backgroundColor: colorBgContainer, 
                            boxShadow: boxShadowTertiary, 
                            borderRadius: '8px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {children}
                    </Col>
                </Row>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                Neo Estech {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default Template;