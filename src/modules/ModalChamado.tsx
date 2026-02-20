'use client'

import React, { useState } from 'react';
import { Button, Flex, theme, Input, Select, Form, App } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalledFormData, newCalled } from '@/validations/NewCalled';
import { useQueryClient } from '@tanstack/react-query';
import { useMetadata } from '@/hook/metadata';
import { Modal } from '@/components';

const { TextArea } = Input;

const defaultValues = {
    titulo: "",
    descricao: "",
    area: "",
    prioridade: "",
    equipamento: "",
    instalacao: ""
};

const ModalChamado: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = theme.useToken();
    const queryClient = useQueryClient();

    const { data } = useMetadata()
    const { message } = App.useApp();

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CalledFormData>({
        resolver: zodResolver(newCalled),
        defaultValues: defaultValues
    });

    const onSubmit = async (data: CalledFormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const novoChamado = {
                ...data,
                id: Math.floor(Math.random() * 10000),
                abertura: new Date().toISOString(),
                status: "Aberto",
            };
            queryClient.setQueryData(['mocks'], (oldData: any) => {
                if (!oldData) return [novoChamado];
                return [novoChamado, ...oldData];
            });
            message.success("Chamado criado com sucesso!");
            setIsModalOpen(false);
            reset();
        } catch (error) {
            message.error("Erro ao criar chamado.");
        }
    };


    const handleClose = () => {
        setIsModalOpen(false);
        reset(defaultValues);
    };

    return (
        <>
            <Flex justify='end' style={{ marginBottom: token.marginSM }}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Novo Chamado</Button>
            </Flex>
            <Modal
                title="Novo Chamado"
                open={isModalOpen}
                handleClose={handleClose}
            >
                <Form layout="vertical">
                    <Form.Item label="Título" validateStatus={errors.titulo ? 'error' : ''} help={errors.titulo?.message}>
                        <Controller name="titulo" control={control} render={({ field }) => <Input {...field} />} />
                    </Form.Item>

                    <Form.Item label="Equipamento" validateStatus={errors.equipamento ? 'error' : ''} help={errors.equipamento?.message}>
                        <Controller name="equipamento" control={control} render={({ field }) => (
                            <Select {...field} options={data?.equipamentos.map((item) => ({ value: item, label: item })) || []} />
                        )} />
                    </Form.Item>

                    <Flex gap="middle">
                        <Form.Item label="Área" style={{ flex: 1 }} validateStatus={errors.area ? 'error' : ''} help={errors.area?.message}>
                            <Controller name="area" control={control} render={({ field }) => (
                                <Select {...field} options={data?.areas.map((item) => ({ value: item, label: item })) || []} />
                            )} />
                        </Form.Item>


                        <Form.Item label="Prioridade" style={{ flex: 1 }} validateStatus={errors.prioridade ? 'error' : ''} help={errors.prioridade?.message}>
                            <Controller name="prioridade" control={control} render={({ field }) => (
                                <Select {...field} options={data?.prioridades.map((item) => ({ value: item, label: item })) || []} />
                            )} />
                        </Form.Item>
                    </Flex>

                    <Form.Item label="Instalação" validateStatus={errors.instalacao ? 'error' : ''} help={errors.instalacao?.message}>
                        <Controller name="instalacao" control={control} render={({ field }) => (
                            <Select {...field} options={data?.instalacao.map((item) => ({ value: item, label: item })) || []} />
                        )} />
                    </Form.Item>

                    <Form.Item label="Descrição" validateStatus={errors.descricao ? 'error' : ''} help={errors.descricao?.message}>
                        <Controller name="descricao" control={control} render={({ field }) => <TextArea {...field} rows={4} />} />
                    </Form.Item>

                    <Flex justify="end" gap="small">
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="primary" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>Criar Chamado</Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
};

export default ModalChamado;