import { render, screen, fireEvent } from '@testing-library/react';
import { DrawerDetail } from '@/components';
import { Imock } from '@/interface';

const mockRow: Imock = {
    id: 1001,
    titulo: "Compressor com temperatura acima do limite",
    area: "Ar-condicionado",
    prioridade: "Crítica",
    status: "Aberto",
    equipamento: "Compressor Bitzer 4TCS-8.2",
    instalacao: "Loja Centro - SP",
    abertura: "2026-02-10T08:30:00Z",
    ultimaAtualizacao: "2026-02-10T14:22:00Z",
    descricao: "Temperatura do compressor atingiu 92°C (limite: 85°C). Risco de parada.",
    responsavel: "Carlos Silva"
};

describe('DrawerDetail Component', () => {
    const closeDrawerMock = jest.fn();

    it('não deve renderizar o conteúdo se selectRow for nulo', () => {
        const { queryByText } = render(
            <DrawerDetail selectRow={null} closeDrawer={closeDrawerMock} />
        );
        const tituloDrawer = screen.queryByText('Detalhes do Chamado');
        expect(tituloDrawer).not.toBeInTheDocument();
    });

    it('deve exibir as informações do chamado corretamente quando aberto', () => {
        render(<DrawerDetail selectRow={mockRow} closeDrawer={closeDrawerMock} />);

        expect(screen.getByText('Compressor com temperatura acima do limite')).toBeInTheDocument();
        expect(screen.getByText(/Ar-condicionado/i)).toBeInTheDocument();
        expect(screen.getByText(/Crítica/i)).toBeInTheDocument();
        expect(screen.getByText(/Aberto/i)).toBeInTheDocument();
        expect(screen.getByText('Carlos Silva')).toBeInTheDocument();
    });

    it('deve "vazio" quando o responsável estiver vazio', () => {
        const rowSemResponsavel = { ...mockRow, responsavel: '' };
        render(<DrawerDetail selectRow={rowSemResponsavel} closeDrawer={closeDrawerMock} />);

        expect(screen.getByText(/Não atribuído/i)).toBeInTheDocument();
    });

    it('deve chamar a função closeDrawer ao clicar no botão de fechar', () => {
        render(<DrawerDetail selectRow={mockRow} closeDrawer={closeDrawerMock} />);

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(closeDrawerMock).toHaveBeenCalledTimes(1);
    });
});