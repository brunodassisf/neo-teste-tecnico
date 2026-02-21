'use client'

import { Modal } from '@/components';
import { useMetadata } from '@/hook/metadata';
import { Igraphics, IobjectGraphics, IresponseMock } from '@/interface';
import { CalledFormData, newCalled } from '@/validations/NewCalled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { App, Button, Flex, Form, Input, Select, theme } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
    titulo: "",
    descricao: "",
    area: "",
    prioridade: "",
    equipamento: "",
    instalacao: ""
};

const ModalCalled: React.FC = () => {
    const queryClient = useQueryClient();
    const { token } = theme.useToken();
    const { data } = useMetadata()
    const { message } = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

            queryClient.setQueriesData({ queryKey: ['mocks'] }, (oldData: IresponseMock | undefined) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    total: oldData.total + 1,
                    items: [novoChamado, ...oldData.items].slice(0, 10)
                };
            });


            queryClient.setQueryData(['graphics'], (oldData: Igraphics | undefined) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    chamadoPorArea: oldData.chamadoPorArea.map((item: IobjectGraphics) =>
                        item.label === novoChamado.area
                            ? { ...item, value: item.value + 1 }
                            : item
                    ),
                    chamadoPorStatus: oldData.chamadoPorStatus.map((item: IobjectGraphics) =>
                        item.label === novoChamado.status
                            ? { ...item, value: item.value + 1 }
                            : item
                    ),
                };
            });
            message.success("Chamado criado com sucesso!");
            handleClose();
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
            <Flex justify='end' style={{ margin: token.marginLG }}>
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
                            <Select {...field} options={data?.equipamento.map((item) => ({ value: item, label: item })) || []} />
                        )} />
                    </Form.Item>

                    <Flex gap="middle">
                        <Form.Item label="Área" style={{ flex: 1 }} validateStatus={errors.area ? 'error' : ''} help={errors.area?.message}>
                            <Controller name="area" control={control} render={({ field }) => (
                                <Select {...field} options={data?.area.map((item) => ({ value: item, label: item })) || []} />
                            )} />
                        </Form.Item>


                        <Form.Item label="Prioridade" style={{ flex: 1 }} validateStatus={errors.prioridade ? 'error' : ''} help={errors.prioridade?.message}>
                            <Controller name="prioridade" control={control} render={({ field }) => (
                                <Select {...field} options={data?.prioridade.map((item) => ({ value: item, label: item })) || []} />
                            )} />
                        </Form.Item>
                    </Flex>

                    <Form.Item label="Instalação" validateStatus={errors.instalacao ? 'error' : ''} help={errors.instalacao?.message}>
                        <Controller name="instalacao" control={control} render={({ field }) => (
                            <Select {...field} options={data?.instalacao.map((item) => ({ value: item, label: item })) || []} />
                        )} />
                    </Form.Item>

                    <Form.Item label="Descrição" validateStatus={errors.descricao ? 'error' : ''} help={errors.descricao?.message}>
                        <Controller name="descricao" control={control} render={({ field }) => <Input.TextArea {...field} rows={4} />} />
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

export default ModalCalled;