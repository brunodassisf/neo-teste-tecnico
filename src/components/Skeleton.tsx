'use client'


import { Col, Divider, Flex, Row, Skeleton, theme } from "antd";
import { useEffect, useState } from "react";

function Graphics() {
    const { token } = theme.useToken();
    return (
        <Row justify="space-evenly">
            <Col span={24} style={{ backgroundColor: token.colorWhite, padding: token.paddingXL, borderRadius: token.borderRadiusLG, marginBottom: token.marginLG }}>

                <Flex justify="center" align="center">
                    <Skeleton.Node active style={{ width: 280, height: 50 }} />
                </Flex>

            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ backgroundColor: token.colorWhite, padding: token.paddingLG, borderRadius: token.borderRadiusLG }}>
                <Flex justify="center" align="center">
                    <Skeleton.Node active style={{ width: 300, height: 280 }} />
                </Flex>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 0 }}>
                <Divider />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ backgroundColor: token.colorWhite, padding: token.paddingLG, borderRadius: token.borderRadiusLG }}>
                <Flex justify="center" align="center">
                    <Skeleton.Node active style={{ width: 300, height: 280 }} />
                </Flex>
            </Col>
        </Row>
    )
}

function Mock() {
    const { token } = theme.useToken();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Flex vertical
            style={{
                backgroundColor: token.colorWhite,
                borderRadius: token.borderRadiusLG,
                padding: token.paddingMD,
                height: '60vh',
            }}>
            <Flex justify="space-between"
                style={{
                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                    background: token.colorFillAlter,
                    padding: token.paddingSM
                }}>
                <Skeleton.Node active style={{ width: 100, height: 30 }} />
                <Flex gap={10}>
                    <Skeleton.Node active style={{ width: 150, height: 30 }} />
                    <Skeleton.Node active style={{ width: 200, height: 30 }} />
                    <Skeleton.Node active style={{ width: 150, height: 30 }} />
                </Flex>
            </Flex>
            <Flex gap={7} vertical style={{ marginTop: token.marginMD }}>
                {Array.from({ length: 7 }).map((_, index) => {
                    const randomWidth = isMounted ? Math.floor(Math.random() * (450 - 250 + 1)) + 450 : 450;
                    return (
                        <Flex key={index} justify="space-between">
                            <Skeleton.Node active style={{ width: randomWidth, height: 30 }} />
                            <Flex gap={10}>
                                <Skeleton.Node active style={{ width: 150, height: 30 }} />
                                <Skeleton.Node active style={{ width: 200, height: 30 }} />
                                <Skeleton.Node active style={{ width: 150, height: 30 }} />
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

function Toggle() {
    return (
        <Flex justify='center'>
            <Skeleton.Button active style={{ width: 400, height: 80 }} />
        </Flex>
    )
}

const SkeletonCore = {
    Graphics: () => <Graphics />,
    Mock: () => <Mock />,
    Toggle: () => <Toggle />,
};

export default SkeletonCore;