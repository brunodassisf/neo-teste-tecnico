import { Igraphics } from '@/interface';
import { useQuery } from '@tanstack/react-query';

const fetchGraphics = async (): Promise<Igraphics> => {
    const response = await fetch('/api/graphics');
    if (!response.ok) throw new Error('Erro ao carregar chamados');
    return response.json();
};

export function useGraphics() {
    return useQuery({
        queryKey: ['graphics'],
        queryFn: fetchGraphics,
        staleTime: 1000 * 60 * 5, 
        retry: false
    });
}