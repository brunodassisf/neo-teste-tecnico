// src/app/api/mock/route.ts
import { NextResponse } from 'next/server';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Imock } from '@/interface';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filePath = path.join(process.cwd(), 'src/mocks/chamados.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const arrayOrigin: Imock[] = JSON.parse(fileData);

    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const search = searchParams.get('search')?.toLowerCase() || '';

    const status = searchParams.get('status')?.split(',').filter(Boolean) || [];
    const prioridade = searchParams.get('prioridade')?.split(',').filter(Boolean) || [];
    const area = searchParams.get('area')?.split(',').filter(Boolean) || [];

    const sortField = searchParams.get('sortField') || 'abertura';
    const sortOrder = searchParams.get('sortOrder') || 'descend';

    const baseData: Imock[] = Array.from({ length: 2000 }, (_, index) => {
      const template = faker.helpers.arrayElement(arrayOrigin);
      const dateOpen = faker.date.recent({ days: 30 });
      const dateUpdate = faker.date.between({ from: dateOpen, to: new Date() });

      return {
        ...template,
        id: 1000 + index,
        titulo: `${template.titulo} - ${faker.string.alphanumeric(4).toUpperCase()}`,

        area: faker.helpers.arrayElement(['Refrigeração', 'Energia', 'Ar-condicionado', 'Água']),
        prioridade: faker.helpers.arrayElement(['Crítica', 'Alta', 'Média', 'Baixa']),
        status: faker.helpers.arrayElement(['Aberto', 'Em andamento', 'Resolvido', 'Cancelado']),

        instalacao: `Unidade ${faker.location.city()} - ${faker.location.state({ abbreviated: true })}`,
        abertura: dateOpen.toISOString(),
        ultimaAtualizacao: dateUpdate.toISOString(),
        responsavel: faker.helpers.arrayElement([faker.person.fullName(), null]),
      };
    });

    let filteredData = baseData.filter(item => {
      const matchSearch = item.titulo.toLowerCase().includes(search);
      const matchStatus = status.length > 0 ? status.includes(item.status) : true;
      const matchPriority = prioridade.length > 0 ? prioridade.includes(item.prioridade) : true;
      const matchArea = area.length > 0 ? area.includes(item.area) : true;

      return matchSearch && matchStatus && matchPriority && matchArea;
    });

    filteredData.sort((a, b) => {
      let vA: any = a[sortField as keyof Imock] ?? '';
      let vB: any = b[sortField as keyof Imock] ?? '';

      if (sortField === 'prioridade') {
        const weights: Record<string, number> = {
          'Baixa': 1, 'Média': 2, 'Alta': 3, 'Crítica': 4
        };
        vA = weights[a.prioridade] || 0;
        vB = weights[b.prioridade] || 0;
      }

      if (vA < vB) return sortOrder === 'ascend' ? -1 : 1;
      if (vA > vB) return sortOrder === 'ascend' ? 1 : -1;
      return 0;
    });

    const total = filteredData.length;
    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    return NextResponse.json({
      items: paginatedData,
      total: total
    });
    //return NextResponse.json({ error: 'Erro ao processar métricas' }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar chamados' },
      { status: 500 }
    );
  }
}