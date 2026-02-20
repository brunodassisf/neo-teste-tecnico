'use client'

import React from "react";
import { mockInterface } from "@/interface";
import { Divider, Drawer, Flex, theme, Timeline, TimelineItemProps, Typography } from "antd";
import { StatusBadge, PriorityTag, AreaIcon, } from ".";

type DrawerDetailProps = {
    selectRow: mockInterface | null;
    closeDrawer: () => void;
}

const DrawerDetail: React.FC<DrawerDetailProps> = ({ selectRow, closeDrawer }) => {
    const { token } = theme.useToken();

    const timelineItems = [
        selectRow?.ultimaAtualizacao ? {
            label: <Typography.Text type="secondary">{new Date(selectRow.ultimaAtualizacao).toLocaleString()}</Typography.Text>,
            children: (
                <>
                    <Typography.Text strong>Última Atualização</Typography.Text>
                    <Typography.Paragraph>{selectRow.descricao}</Typography.Paragraph>
                </>
            ),
            color: 'green',
        } : null,
        {
            label: <Typography.Text type="secondary">{new Date(selectRow?.abertura as string).toLocaleString()}</Typography.Text>,
            children: (
                <>
                    <Typography.Text strong>Instalação</Typography.Text>
                    <Typography.Paragraph>{selectRow?.instalacao}</Typography.Paragraph>
                </>
            ),
            color: 'gray',
        },
    ].filter(Boolean) as TimelineItemProps[];

    return (
            <Drawer
                title="Detalhes do Chamado"
                placement='right'
                onClose={closeDrawer}
                open={!!selectRow}
            >
                {selectRow && (
                    <div>
                        <Typography.Title level={4} style={{ marginTop: '0px' }}>{selectRow.titulo}</Typography.Title>
                        <Divider plain style={{ borderColor: token.colorPrimary }} />
                        <Flex vertical gap={5}>
                            <Typography.Text><strong>Local:</strong> {selectRow.instalacao}</Typography.Text>
                            <Typography.Text><strong>Descrição:</strong> {selectRow.descricao}</Typography.Text>
                            <Typography.Text><strong>Responsável:</strong> {selectRow.responsavel || 'Não atribuído'}</Typography.Text>
                        </Flex>
                        <Divider plain style={{ borderColor: token.colorPrimary }} />
                        <Flex vertical gap={5}>
                            <div><strong>Status:</strong> <StatusBadge status={selectRow.status} /></div>
                            <div><strong>Área:</strong> <AreaIcon area={selectRow.area} /></div>
                            <div><strong>Prioridade:</strong> <PriorityTag priority={selectRow.prioridade} /></div>
                        </Flex>
                        <Divider plain style={{ borderColor: token.colorPrimary }} />
                        <div>
                            <Flex vertical gap="middle">
                                <Typography.Title level={5} style={{ margin: 0 }}>
                                    TimeLine
                                </Typography.Title>
                                <Timeline items={timelineItems} titleSpan="100px" />
                            </Flex>
                        </div>
                    </div>
                )}
            </Drawer>
    );
}

export default DrawerDetail;