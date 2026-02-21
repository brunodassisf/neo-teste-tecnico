
export interface Imock {
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
    responsavel: string | null;
}

export interface IresponseMock {
    items: Imock[];
    total: number;
}

export interface Imetadata {
    area: {
        id: number;
        nome: string;
    }[],
    prioridade: {
        id: number;
        nome: string;
    }[],
    equipamento: {
        id: number;
        nome: string;
    }[],
    instalacao: {
        id: number;
        nome: string;
    }[],

}

export interface Igraphics {
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