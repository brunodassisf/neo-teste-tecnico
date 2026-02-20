import { PriorityTag } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Componente PriorityTag', () => {
    it('deve renderizar corretamente a prioridade de "Alta"', () => {
        render(<PriorityTag priority="Alta" />);
        const label = screen.getByText(/ALTA/i);
        expect(label).toBeInTheDocument();
        expect(label.parentElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente a prioridade de "Média"', () => {
        render(<PriorityTag priority="Média" />);
        const label = screen.getByText(/MÉDIA/i);
        expect(label).toBeInTheDocument();
    });

    it('deve renderizar a prioridade "Crítica" com o texto esperado', () => {
        render(<PriorityTag priority="Crítica" />);
        expect(screen.getByText(/CRÍTICA/i)).toBeInTheDocument();
    });

});