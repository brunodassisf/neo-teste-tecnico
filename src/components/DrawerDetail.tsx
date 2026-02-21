'use client'

import React from "react";
import { Imock } from "@/interface";
import { Divider, Drawer, Flex, theme, Typography } from "antd";
import { AreaIcon, PriorityTag, StatusBadge, TimeLine, } from ".";

type DrawerDetailProps = {
    selectRow: Imock | null;
    closeDrawer: () => void;
}

const DrawerDetail: React.FC<DrawerDetailProps> = ({ selectRow, closeDrawer }) => {
    const { token } = theme.useToken();

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
                    <TimeLine data={selectRow} />
                </div>
            )}
        </Drawer>
    );
}

export default DrawerDetail;