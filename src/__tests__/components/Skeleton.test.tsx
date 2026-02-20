import { Skeleton } from '@/components';
import { render } from '@testing-library/react';

describe('Componente Skeleton', () => {

    it('deve renderizar corretamente o componente Skeleton.Mock', () => {
        const { container } = render(<Skeleton.Mock />);
        const skeletonElement = container.querySelector('.ant-skeleton');
        expect(skeletonElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente o componente Skeleton.Toggle"', () => {
        const { container } = render(<Skeleton.Toggle />);
        const skeletonElement = container.querySelector('.ant-skeleton');
        expect(skeletonElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente o componente Skeleton.Graphics', () => {
        const { container } = render(<Skeleton.Graphics />);
        const skeletonElement = container.querySelector('.ant-skeleton');
        expect(skeletonElement).toBeInTheDocument();
    });

});