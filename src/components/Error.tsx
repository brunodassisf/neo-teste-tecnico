'use client'

import React from "react";
import { Button, Col, Empty, Row, theme, Typography } from "antd";

type ErrorProps = {
    onClick: () => void;
}

const Error: React.FC<ErrorProps> = ({ onClick }) => {

    const { token } = theme.useToken();

    return (
        <Row>
            <Col span={24} style={{ backgroundColor: token.colorWhite, padding: token.paddingLG, borderRadius: token.borderRadiusLG }}>
                <Empty
                    image="./error.png"
                    styles={{ image: { height: 300 } }}
                    description={
                        <Typography.Title level={5}>
                            Ocorreu um erro ao carregar a página
                        </Typography.Title>
                    }
                >
                    <Button type="primary" onClick={() => onClick()}>Tentar novamente</Button>
                </Empty>
            </Col>
        </Row>
    )

}

export default Error;