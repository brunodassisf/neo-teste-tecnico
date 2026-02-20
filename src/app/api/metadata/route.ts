import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { mockInterface } from '@/interface';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/mocks/chamados.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const arrayOrigin: mockInterface[] = JSON.parse(fileData);

        const getUniqueOptions = (key: keyof mockInterface) => {
            const uniqueValues = Array.from(new Set(arrayOrigin.map(item => item[key])));

            return uniqueValues.map((value) => value);
        };

        const data = {
            areas: getUniqueOptions('area'),
            prioridades: getUniqueOptions('prioridade'),
            equipamentos: getUniqueOptions('equipamento'),
            instalacao: getUniqueOptions('instalacao'),
        };

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao processar metadados' }, { status: 500 });
    }
}