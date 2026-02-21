'use client'

import React from 'react';
import { Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import type { TableProps } from 'antd';

interface DataTableProps<RecordType extends AnyObject = AnyObject> extends TableProps<RecordType> {
    shouldSortAlphabetically?: boolean;
}

const DataTable = <T extends AnyObject>({ dataSource, shouldSortAlphabetically, ...props }: DataTableProps<T>) => {

    const tblRef: Parameters<typeof Table>[0]['ref'] = React.useRef(null);


    const processedData = React.useMemo(() => {
        if (!dataSource) return [];

        if (shouldSortAlphabetically) {
            return [...dataSource].sort((a, b) =>
                String(a.titulo || '').localeCompare(String(b.titulo || ''))
            );
        }

        return dataSource;
    }, [dataSource, shouldSortAlphabetically]);

    return (
        <Table
            bordered
            virtual
            dataSource={processedData}
            rowKey="id"
            scroll={{ x: 200, y: 400 }}
            pagination={false}
            ref={tblRef}
            {...props}
        />
    );
};

export default DataTable;