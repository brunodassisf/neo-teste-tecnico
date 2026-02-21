'use client'

import React, { useState, useCallback } from "react";
import { Input, Space, theme } from "antd";
import { AreaIcon, DrawerDetail, Error, PriorityTag, StatusBadge } from "@/components";
import DataTable from "@/components/DataTable";
import { FetchParams, useMocks } from "@/hook/called";
import { Imock } from "@/interface";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";

const TechnicalView: React.FC = () => {
    const { token } = theme.useToken();
    const [selectRow, setSelectRow] = useState<Imock | null>(null);

    const [params, setParams] = useState<FetchParams>({
        page: 1,
        pageSize: 10,
        search: '',
    });


    const { data, isLoading, error, refetch } = useMocks(params);

    const columns: ColumnsType<Imock> = [
        {
            title: 'Título',
            dataIndex: 'titulo',
            ellipsis: true,
            width:300
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 180,
            render: (value) => <StatusBadge status={value} />,
            filters: [
                { text: 'Aberto', value: 'Aberto' },
                { text: 'Em andamento', value: 'Em andamento' },
                { text: 'Resolvido', value: 'Resolvido' },
                { text: 'Cancelado', value: 'Cancelado' },
            ],
        },
        {
            title: 'Área',
            dataIndex: 'area',
            width: 200,
            render: (value) => <AreaIcon area={value} />,
            filters: [
                { text: 'Refrigeração', value: 'Refrigeração' },
                { text: 'Energia', value: 'Energia' },
                { text: 'Ar-condicionado', value: 'Ar-condicionado' },
                { text: 'Água', value: 'Água' },
            ],
        },
        {
            title: 'Prioridade',
            dataIndex: 'prioridade',
            width: 150,
            render: (value) => <PriorityTag priority={value} />,
            sorter: true, // Ativa ordenação no servidor
            filters: [
                { text: 'Crítica', value: 'Crítica' },
                { text: 'Alta', value: 'Alta' },
                { text: 'Média', value: 'Média' },
                { text: 'Baixa', value: 'Baixa' },
            ],
        },
        {
            title: 'Abertura',
            dataIndex: 'abertura',
            width: 130,
            sorter: true,
            render: (value) => new Date(value).toLocaleDateString('pt-BR'),
        }
    ];

    // Função que captura mudanças de página, filtros e ordenação
    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Imock> | SorterResult<Imock>[]
    ) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

        setParams(prev => ({
            ...prev,
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
            status: filters.status as string[] | undefined,
            prioridade: filters.prioridade as string[] | undefined,
            area: filters.area as string[] | undefined,
            sortField: singleSorter.field as string | undefined,
            sortOrder: singleSorter.order as string | undefined
        }));
    };

    // Função de busca textual
    const onSearch = useCallback((value: string) => {
        setParams(prev => ({ ...prev, search: value, page: 1 }));
    }, []);

    if (error) return <Error onClick={refetch} />;

    return (
        <div style={{
            padding: token.paddingMD,
            backgroundColor: token.colorWhite,
            borderRadius: token.borderRadiusLG
        }}>
            <Space vertical style={{ width: '100%' }} size="middle">

                <Input.Search
                    placeholder="Buscar por título ou ID..."
                    onSearch={onSearch}
                    style={{ maxWidth: 400 }}
                    allowClear
                    enterButton
                />

                <DataTable<Imock>
                    loading={isLoading}
                    columns={columns}
                    dataSource={data?.items || []}
                    rowKey="id" // Importante para performance e seleção
                    pagination={{
                        current: params.page,
                        pageSize: params.pageSize,
                        total: data?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                        showTotal: (total) => `Total de ${total} chamados`,
                    }}
                    onChange={handleTableChange}
                    onRow={(record) => ({
                        onClick: () => setSelectRow(record),
                        style: { cursor: 'pointer' }
                    })}
                />
            </Space>

            <DrawerDetail
                selectRow={selectRow}
                closeDrawer={() => setSelectRow(null)}
            />
        </div>
    );
}

export default TechnicalView;