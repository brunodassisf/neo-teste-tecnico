import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Imock } from '@/interface';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/mocks/chamados.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const arrayOrigin: Imock[] = JSON.parse(fileData);

    const mockData = Array.from({ length: 2000 }, (_, index) => {
      const id = arrayOrigin.length + 1000 + index + 1;
      const dateOpen = faker.date.recent({ days: 30 });
      const dateUpdate = faker.date.between({ from: dateOpen, to: new Date() });
      const problemSorting: Imock = faker.helpers.arrayElement(arrayOrigin);

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

    const allData = [...arrayOrigin, ...mockData];
    const agora = new Date();

    const metrics = allData.reduce((acc, curr) => {
      acc.areas[curr.area] = (acc.areas[curr.area] || 0) + 1;

      acc.statusCount[curr.status] = (acc.statusCount[curr.status] || 0) + 1;

      if (curr.status.toLowerCase() === 'aberto') {
        const dataAbertura = new Date(curr.abertura);

        const diffEmDias = Math.abs(agora.getTime() - dataAbertura.getTime()) / (1000 * 60 * 60 * 24);

        acc.totalDiasAberto += diffEmDias;
        acc.qtdAbertos += 1;
      }

      return acc;
    }, {
      areas: {} as Record<string, number>,
      statusCount: {} as Record<string, number>,
      totalDiasAberto: 0,
      qtdAbertos: 0
    });

    const response = {
      chamadoPorArea: Object.entries(metrics.areas).map(([label, value]) => ({
        label,
        value
      })),
      chamadoPorStatus: Object.entries(metrics.statusCount).map(([label, value]) => ({
        label,
        value
      })),
      mediaGeralChamadosAbertosDias: metrics.qtdAbertos > 0
        ? Number((metrics.totalDiasAberto / metrics.qtdAbertos).toFixed(0))
        : 0
    };

    return NextResponse.json(response);
    //return NextResponse.json({ error: 'Erro ao processar métricas' }, { status: 500 });
  } catch (error) {
    console.error('Erro no endpoint:', error);
    return NextResponse.json({ error: 'Erro ao processar métricas' }, { status: 500 });
  }
}