'use client'

import React from "react";
import { Imock } from "@/interface";
import { Flex, Timeline, TimelineItemProps, Typography } from "antd";

type DrawerDetailProps = {
    data: Imock | null;
}

const DrawerDetail: React.FC<DrawerDetailProps> = ({ data }) => {

    const timelineItems = [
        data?.ultimaAtualizacao ? {
            title: <Typography.Text type="secondary">{new Date(data.ultimaAtualizacao).toLocaleString()}</Typography.Text>,
            content: (
                <>
                    <Typography.Text strong>Última Atualização</Typography.Text>
                    <Typography.Paragraph>{data.descricao}</Typography.Paragraph>
                </>
            ),
            color: 'green',
        } : null,
        {
            title: <Typography.Text type="secondary">{new Date(data?.abertura as string).toLocaleString()}</Typography.Text>,
            content: (
                <>
                    <Typography.Text strong>Instalação</Typography.Text>
                    <Typography.Paragraph>{data?.instalacao}</Typography.Paragraph>
                </>
            ),
            color: 'gray',
        },
    ].filter(Boolean) as TimelineItemProps[];

    return (

        <Flex vertical gap="middle">
            <Typography.Title level={5} style={{ margin: 0 }}>
                TimeLine
            </Typography.Title>
            <Timeline items={timelineItems} titleSpan="100px" />
        </Flex>

    );
}

export default DrawerDetail;