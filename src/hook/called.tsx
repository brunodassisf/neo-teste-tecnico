import { IresponseMock } from '@/interface';
import { useQuery } from '@tanstack/react-query';

export interface FetchParams {
    page: number;
    pageSize: number;
    search?: string;
    status?: string[];
    prioridade?: string[];
    area?: string[];
    sortField?: string;
    sortOrder?: string;
}

const fetchMocks = async (params: FetchParams): Promise<IresponseMock> => {
    const query = new URLSearchParams({
        page: params.page.toString(),
        pageSize: params.pageSize.toString(),
        search: params.search || '',
        sortField: params.sortField || 'abertura',
        sortOrder: params.sortOrder || 'descend',
    });

    if (params.status?.length) query.append('status', params.status.join(','));
    if (params.prioridade?.length) query.append('prioridade', params.prioridade.join(','));
    if (params.area?.length) query.append('area', params.area.join(','));

    const response = await fetch(`/api/mock?${query.toString()}`);
    if (!response.ok) throw new Error('Erro ao carregar chamados');
    return response.json();
};

export function useMocks(params: FetchParams) {
    return useQuery({
        queryKey: ['mocks', params],
        queryFn: () => fetchMocks(params),
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}