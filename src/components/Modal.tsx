'use client'

import { Modal } from 'antd';
import React from 'react';

type ModalCoreProps = {
    open: boolean;
    title: string;
    children: React.ReactNode;
    handleClose?: () => void;
}

const ModalCore: React.FC<ModalCoreProps> = ({ children, open, title, handleClose }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={handleClose}
            mask={{ closable: false }}
            closeIcon
            footer={null}
        >
            {children}
        </Modal>
    );
};

export default ModalCore;