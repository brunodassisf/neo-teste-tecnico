
export interface mockInterface {
    id: number;
    titulo: string;
    area: 'Refrigeração' | 'Energia' | 'Ar-condicionado' | 'Água';
    prioridade: 'Crítica' | 'Alta' | 'Média' | 'Baixa';
    status: 'Aberto' | 'Em andamento' | 'Resolvido' | 'Cancelado';
    equipamento: string;
    instalacao: string;
    abertura: string;
    ultimaAtualizacao: string;
    descricao: string;
    responsavel: string;
}

export interface metadataInterface {
    areas: {
        id: number;
        nome: string
    }[],
    prioridades: {
        id: number;
        nome: string
    }[],
    equipamentos: {
        id: number;
        nome: string
    }[],
    instalacao: {
        id: number;
        nome: string
    }[],

}

export interface graphicsInterface {
    chamadoPorArea: {
        label: string,
        value: number,
    }[],
    chamadoPorStatus: {
        label: string,
        value: number,
    }[],
    mediaGeralChamadosAbertosDias: number
}