'use client'

import React, { useEffect, useRef } from "react";
import { Empty, Flex, theme, Typography } from "antd";
import { useMocks } from "@/hook/called";
import { mockInterface } from "@/interface";
import { useVirtualizer } from '@tanstack/react-virtual';
import { AreaIcon, DrawerDetail, PriorityTag, StatusBadge, Error, Skeleton } from "@/components";

const TechnicalView: React.FC = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const parentRef = useRef<HTMLDivElement>(null);
    const [selectRow, setSelectRow] = React.useState<mockInterface | null>(null);
    const { token } = theme.useToken();
    const { data, isLoading, error, refetch } = useMocks();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sortedData = React.useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) =>
            new Date(b.abertura).getTime() - new Date(a.abertura).getTime()
        );
    }, [data]);

    const rowVirtualizer = useVirtualizer({
        count: sortedData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 10,
    });


    if (!isMounted || isLoading) return <Skeleton.Mock />;
    if (error) return <Error onClick={refetch} />;
    if (!data || data.length === 0) return <Empty />;

    return (
        <Flex
            vertical
            style={{
                backgroundColor: token.colorWhite,
                borderRadius: token.borderRadiusLG,
                padding: token.paddingMD,
                height: '60vh',
            }}>
            <Flex
                style={{
                    paddingLeft: token.paddingSM,
                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                    background: token.colorFillAlter
                }}>
                <Typography.Title level={5} style={{ flex: 2 }}>Título</Typography.Title>
                <Typography.Title level={5} style={{ width: 150 }}>Status</Typography.Title>
                <Typography.Title level={5} style={{ width: 200 }}>Área</Typography.Title>
                <Typography.Title level={5} style={{ width: 120 }}>Prioridade</Typography.Title>
            </Flex>

            <div
                ref={parentRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const item = data[virtualRow.index];
                        if (!item) return null;
                        return (
                            <div
                                key={virtualRow.key}
                                onClick={() => setSelectRow(item)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 12px',
                                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                className="row-hover-effect"
                            >
                                <Typography.Paragraph
                                    style={{ flex: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0px' }}>
                                    {item.titulo}
                                </Typography.Paragraph>
                                <div style={{ width: 150 }}><StatusBadge status={item.status} /></div>
                                <div style={{ width: 200 }}><AreaIcon area={item.area} /></div>
                                <div style={{ width: 120 }}><PriorityTag priority={item.prioridade} /></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <DrawerDetail selectRow={selectRow} closeDrawer={() => setSelectRow(null)} />
        </Flex>
    );
}

export default TechnicalView;