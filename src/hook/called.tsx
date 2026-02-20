import { mockInterface } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const fecthMocks = async (): Promise<mockInterface[]> => {
    const response = await fetch('/api/mock');
    if (!response.ok) throw new Error('Erro ao carregar chamados');
    return response.json();
};

export function useMocks() {
    return useQuery({
        queryKey: ['mocks'],
        queryFn: fecthMocks,
        staleTime: 1000 * 60 * 5,
        retry: false
    });
}