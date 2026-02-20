import { AreaIcon } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Componente AreaIcon', () => {
    it('deve renderizar corretamente a área de "Energia"', () => {
        render(<AreaIcon area="Energia" />);
        const label = screen.getByText(/ENERGIA/i);
        expect(label).toBeInTheDocument();
        expect(label.parentElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente a área de "Água"', () => {
        render(<AreaIcon area="Água" />);
        const label = screen.getByText(/ÁGUA/i);
        expect(label).toBeInTheDocument();
    });

    it('deve renderizar a área de "Ar-condicionado" com o texto esperado', () => {
        render(<AreaIcon area="Ar-condicionado" />);
        expect(screen.getByText(/AR-CONDICIONADO/i)).toBeInTheDocument();
    });

});