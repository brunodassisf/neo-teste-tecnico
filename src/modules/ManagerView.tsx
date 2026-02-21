'use client'

import React from "react";

import { Error, GraphicsColumn, GraphicsDoughnut, Skeleton } from "@/components";
import { useGraphics } from "@/hook/graphics";
import { Col, Divider, Empty, Flex, Row, theme, Typography } from "antd";

const ManagerView: React.FC = () => {
    const { Title } = Typography
    const { data, isLoading, error, refetch } = useGraphics();
    const { token } = theme.useToken();

    if (isLoading && !error) return <Skeleton.Graphics />;
    if (error) return <Error onClick={refetch} />;
    if (!data) return <Empty />;

    return (
        <Row justify="space-evenly">
            <Col span={24} style={{ backgroundColor: token.colorWhite, padding: token.paddingXL, borderRadius: token.borderRadiusLG, marginBottom: token.marginLG }}>
                <Row justify="center">
                    <Col xs={{ span: 24, order: 1 }} lg={{ span: 9, order: 1 }}>
                        <Title level={3} style={{ margin: '0px' }}>Tempo médio dos chamados abertos</Title>
                    </Col>
                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 3, order: 2 }}>
                        <Title level={2} style={{ margin: '0px', color: token.colorPrimary }}>{data?.mediaGeralChamadosAbertosDias} (dias)</Title>
                    </Col>
                </Row>
                <Flex align="center" justify="center" gap={10}>
                </Flex>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ backgroundColor: token.colorWhite, padding: token.paddingLG, borderRadius: token.borderRadiusLG }}>
                <Typography.Title level={4}>Áreas</Typography.Title>
                <Divider />
                <GraphicsDoughnut data={data?.chamadoPorArea || []} />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 0 }}>
                <Divider />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ backgroundColor: token.colorWhite, padding: token.paddingLG, borderRadius: token.borderRadiusLG }}>
                <Typography.Title level={4}>Status</Typography.Title>
                <Divider />
                <GraphicsColumn data={data?.chamadoPorStatus || []} />
            </Col>
        </Row>
    );
}

export default ManagerView;