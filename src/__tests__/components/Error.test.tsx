import { Error } from '@/components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Componente Error', () => {
    const mockFuncao = jest.fn();

    it('deve renderizar corretamente o component Error e clicar no botão "Tentar novamente"', () => {
        render(<Error onClick={mockFuncao} />);
        const retry = screen.getByText('Tentar novamente');
        fireEvent.click(retry);
        expect(mockFuncao).toHaveBeenCalledTimes(1);
    });

});