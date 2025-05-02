import React from 'react';

interface MonitoramentoEContrapartidaProps {
  municipio: string;
  consorcio: string;
}

const MonitoramentoEContrapartida: React.FC<MonitoramentoEContrapartidaProps> = ({ 
  municipio, 
  consorcio 
}) => {
  return (
    <>
      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">14. PROCEDIMENTOS DE MONITORAMENTO E AVALIAÇÃO</h2>
        
        <p className="text-justify mb-4">
          O monitoramento será realizado conjuntamente pela Prefeitura Municipal de {municipio} (por meio da Secretaria Municipal de Saúde) e pelo {consorcio}.
        </p>
        
        <p className="font-medium mb-2">Instrumentos:</p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Relatórios Mensais de Atividades e Execução Financeira (elaborados pelo Consórcio).</li>
          <li>Análise dos Indicadores definidos na Seção 8.</li>
          <li>Reuniões periódicas da Comissão de Monitoramento e Avaliação (com representantes de ambas as partes).</li>
          <li>Visitas técnicas às unidades sob gestão do Consórcio.</li>
          <li>Acompanhamento pelo Conselho Municipal de Saúde de {municipio}.</li>
        </ul>
        
        <p className="text-justify">
          <strong>Avaliação:</strong> Será realizada ao final do período de vigência (12 meses), analisando o cumprimento das metas, a execução orçamentária, os resultados alcançados (qualitativos e quantitativos) e o impacto nos serviços de saúde, podendo gerar recomendações para períodos futuros.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">15. CONTRAPARTIDA (se houver)</h2>
        
        <p className="mb-2">
          Não se aplica contrapartida financeira para esta parceria.
        </p>
        
        <p className="text-sm italic">
          (Opcional, se aplicável) A Prefeitura Municipal de {municipio} oferecerá como contrapartida não financeira a cessão de uso dos imóveis onde funcionam as unidades de saúde objeto desta parceria, bem como a infraestrutura básica existente (energia, água), conforme [Termo de Cessão ou Cláusula Contratual específica].
        </p>
      </section>
    </>
  );
};

export default MonitoramentoEContrapartida;