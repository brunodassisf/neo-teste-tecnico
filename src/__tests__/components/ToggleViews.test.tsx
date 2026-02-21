import { ToggleViews } from '@/components';
import { render, screen, fireEvent } from '@testing-library/react';

import { usePathname, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}));

describe('ToggleViews Component', () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    it('deve renderizar os textos corretamente', () => {
        (usePathname as jest.Mock).mockReturnValue('/tecnico');
        render(<ToggleViews />);

        expect(screen.getByText('Técnico')).toBeInTheDocument();
        expect(screen.getByText('Gestor')).toBeInTheDocument();
    });

    it('deve navegar para "/gestor" ao clicar na opção de Gestor', () => {
        (usePathname as jest.Mock).mockReturnValue('/tecnico');
        render(<ToggleViews />);
        const gestorButton = screen.getByText('Gestor').closest('div');
        fireEvent.click(gestorButton!);
        expect(pushMock).toHaveBeenCalledWith('/gestor');
    });

    it('deve navegar para "/tecnico" ao clicar na opção de Técnico', () => {
        (usePathname as jest.Mock).mockReturnValue('/gestor');
        render(<ToggleViews />);
        const tecnicoButton = screen.getByText('Técnico').closest('div');
        fireEvent.click(tecnicoButton!);

        expect(pushMock).toHaveBeenCalledWith('/tecnico');
    });

    it('deve aplicar a classe "v-active" no modo correto baseado na URL', () => {
        (usePathname as jest.Mock).mockReturnValue('/gestor');
        render(<ToggleViews />);
        const gestorBox = screen.getByText('Gestor').closest('.toggle-view-box');
        const tecnicoBox = screen.getByText('Técnico').closest('.toggle-view-box');
        expect(gestorBox).toHaveClass('v-active');
        expect(tecnicoBox).not.toHaveClass('v-active');
    });
});