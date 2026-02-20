import { StatusBadge } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Componente StatusBadge', () => {
    it('deve renderizar corretamente o status de "Aberto"', () => {
        render(<StatusBadge status="Aberto" />);
        const label = screen.getByText(/ABERTO/i);
        expect(label).toBeInTheDocument();
        expect(label.parentElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente o status de "Cancelado"', () => {
        render(<StatusBadge status="Cancelado" />);
        const label = screen.getByText(/CANCELADO/i);
        expect(label).toBeInTheDocument();
    });

    it('deve renderizar corretamente o status de "Em andamento"', () => {
        render(<StatusBadge status="Em andamento" />);
        const label = screen.getByText(/EM ANDAMENTO/i);
        expect(label).toBeInTheDocument();
    });

    it('deve renderizar o status "Resolvido" com o texto esperado', () => {
        render(<StatusBadge status="Resolvido" />);
        expect(screen.getByText(/RESOLVIDO/i)).toBeInTheDocument();
    });

});