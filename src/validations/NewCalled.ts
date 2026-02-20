import { z } from 'zod';

export const newCalled = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  descricao: z.string().min(10, "A descrição deve ser mais detalhada"),
  area: z.string().min(1, "Selecione uma área"),
  prioridade: z.string().min(1, "Selecione a prioridade"),
  equipamento: z.string().min(1, "Selecione o equipamento"),
  instalacao: z.string().min(1, "Selecione uma instalação")
});

export type CalledFormData = z.infer<typeof newCalled>;