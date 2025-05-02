
import React from 'react';
import { formatCurrency } from '../../lib/utils';

interface CronogramaProps {
  consorcio: string;
  totalMensal: number;
  totalAnual: number;
}

const Cronograma: React.FC<CronogramaProps> = ({ consorcio, totalMensal, totalAnual }) => {
  return (
    <section>
      <h2 className="font-bold text-lg mb-4 text-blue-800">9. CRONOGRAMA DE EXECUÇÃO FÍSICO-FINANCEIRO (Vigência: 12 meses)</h2>
      
      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Cronograma Físico (Principais Marcos):</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mês 1-2: Fase de Transição concluída.</li>
            <li>Mês 3-12: Manutenção da Operacionalização (Metas 1 a 5).</li>
            <li>Mensalmente: Entrega de Relatórios (Meta 6).</li>
            <li>Trimestralmente: Avaliação da Execução das Capacitações (Referente à Meta 2).</li>
          </ul>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Cronograma de Desembolso:</h3>
          <p className="mb-2">
            <strong>Valor Total da Parceria (12 meses):</strong> {formatCurrency(totalAnual)} ({totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim()} reais) - Calculado a partir do custo mensal de {formatCurrency(totalMensal)}.
          </p>
          <p>
            <strong>Forma de Repasse:</strong> Repasses mensais de {formatCurrency(totalMensal)} ({totalMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim()} reais), a serem realizados pela Prefeitura Municipal ao {consorcio} até o 5º (quinto) dia útil de cada mês subsequente à prestação dos serviços, mediante apresentação de relatório de atividades e comprovação de regularidade fiscal e trabalhista.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cronograma;
