import { metadataInterface } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const fetchMetadata = async (): Promise<metadataInterface> => {
    const response = await fetch('/api/metadata');
    if (!response.ok) throw new Error('Erro ao carregar metadata');
    return response.json();
};

export function useMetadata() {
    return useQuery({
        queryKey: ['metadata'],
        queryFn: fetchMetadata,
        staleTime: 1000 * 60 * 5,
    });
}