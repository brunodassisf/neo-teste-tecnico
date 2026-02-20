import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { mockInterface } from '@/interface';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/mocks/chamados.json');

    const fileData = fs.readFileSync(filePath, 'utf8');
    const arrayOrigin = JSON.parse(fileData);

    const mockData = Array.from({ length: 2000 }, (_, index) => {
      const id = arrayOrigin.length + 1000 + index + 1;

      const dateOpen = faker.date.recent({ days: 30 });
      const dateUpdate = faker.date.between({ from: dateOpen, to: new Date() });

      const problemSorting: mockInterface = faker.helpers.arrayElement(arrayOrigin);

      return {
        id,
        titulo: `${problemSorting.titulo} - ${faker.string.alphanumeric(4).toUpperCase()}`,
        area: problemSorting.area,
        prioridade: problemSorting.prioridade,
        status: problemSorting.status,
        equipamento: problemSorting.equipamento,
        instalacao: `Unidade ${faker.location.city()} - ${faker.location.state({ abbreviated: true })}`,
        abertura: dateOpen.toISOString(),
        ultimaAtualizacao: dateUpdate.toISOString(),
        descricao: `${problemSorting.descricao}`,
        responsavel: faker.helpers.arrayElement([faker.person.fullName(), null]),
      };
    });

    const data = [...arrayOrigin, ...mockData];

    return NextResponse.json(data);
    //return NextResponse.json({ error: 'Erro ao processar métricas' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler o arquivo JSON' }, { status: 500 });
  }
}