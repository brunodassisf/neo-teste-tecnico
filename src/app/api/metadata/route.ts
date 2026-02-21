import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Imetadata } from '@/interface';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/mocks/chamados.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const arrayOrigin: Imetadata[] = JSON.parse(fileData);

        const getUniqueOptions = (key: keyof Imetadata) => {
            const uniqueValues = Array.from(new Set(arrayOrigin.map(item => item[key])));

            return uniqueValues.map((value) => value);
        };

        const data = {
            area: getUniqueOptions('area'),
            prioridade: getUniqueOptions('prioridade'),
            equipamento: getUniqueOptions('equipamento'),
            instalacao: getUniqueOptions('instalacao'),
        };

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao processar metadados' }, { status: 500 });
    }
}