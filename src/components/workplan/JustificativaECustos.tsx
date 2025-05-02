import React from 'react';
import { formatCurrency } from '../../lib/utils';

interface UnidadeSaudeInfo {
  nome: string;
  atendimentosMes: number;
  valorPorAtendimento: number;
}

interface JustificativaECustosProps {
  municipio?: string;
  populacaoEstimada?: number;
  numUnidadesSaude?: number;
  unidades?: UnidadeSaudeInfo[];
  valorTotalMensal?: number;
  valorTotalAnual?: number;
  justificativaAdicional?: string;
}

const JustificativaECustos: React.FC<JustificativaECustosProps> = ({
  municipio = "Município",
  populacaoEstimada = 50000,
  numUnidadesSaude = 8,
  unidades = [
    { nome: "UBS Central", atendimentosMes: 1200, valorPorAtendimento: 15.50 },
    { nome: "UBS Norte", atendimentosMes: 850, valorPorAtendimento: 15.50 },
    { nome: "UBS Sul", atendimentosMes: 750, valorPorAtendimento: 15.50 },
    { nome: "UBS Leste", atendimentosMes: 680, valorPorAtendimento: 15.50 },
    { nome: "UBS Oeste", atendimentosMes: 720, valorPorAtendimento: 15.50 },
    { nome: "USF Vila Nova", atendimentosMes: 520, valorPorAtendimento: 15.50 },
    { nome: "USF Esperança", atendimentosMes: 480, valorPorAtendimento: 15.50 },
    { nome: "USF Bela Vista", atendimentosMes: 520, valorPorAtendimento: 15.50 }
  ],
  valorTotalMensal,
  valorTotalAnual,
  justificativaAdicional = ""
}) => {
  const calculatedMensalTotal = valorTotalMensal || unidades.reduce(
    (total, unidade) => total + (unidade.atendimentosMes * unidade.valorPorAtendimento),
    0
  );
  
  const calculatedAnualTotal = valorTotalAnual || calculatedMensalTotal * 12;

  return (
    <section className="space-y-8">
      <h2 className="font-bold text-lg mb-4 text-blue-800">13. JUSTIFICATIVA E CUSTOS</h2>
      
      <div className="space-y-4">
        <p className="text-justify">
          O município de {municipio}, com população estimada de {populacaoEstimada.toLocaleString('pt-BR')} habitantes, 
          possui atualmente {numUnidadesSaude} unidades de saúde na Atenção Primária. Considerando o volume de atendimentos 
          e a necessidade de aprimoramento contínuo dos serviços prestados, justifica-se o investimento em consultoria 
          especializada, sistemas integrados e capacitação profissional.
        </p>

        <p className="text-justify">
          A implementação do presente plano de trabalho visa otimizar os processos de trabalho, melhorar os indicadores 
          de saúde e garantir maior eficiência na aplicação dos recursos públicos, resultando em benefícios diretos 
          à população atendida pelo SUS.
        </p>

        {justificativaAdicional && <p className="text-justify">{justificativaAdicional}</p>}
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold mb-4 text-blue-700">Detalhamento dos Custos por Unidade de Saúde:</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Unidade de Saúde</th>
                <th className="border border-gray-300 p-2 text-right">Atendimentos/Mês</th>
                <th className="border border-gray-300 p-2 text-right">Valor por Atendimento</th>
                <th className="border border-gray-300 p-2 text-right">Valor Mensal</th>
              </tr>
            </thead>
            <tbody>
              {unidades.map((unidade, index) => {
                const valorMensal = unidade.atendimentosMes * unidade.valorPorAtendimento;
                return (
                  <tr key={`unidade-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-2">{unidade.nome}</td>
                    <td className="border border-gray-300 p-2 text-right">{unidade.atendimentosMes.toLocaleString('pt-BR')}</td>
                    <td className="border border-gray-300 p-2 text-right">{formatCurrency(unidade.valorPorAtendimento)}</td>
                    <td className="border border-gray-300 p-2 text-right">{formatCurrency(valorMensal)}</td>
                  </tr>
                );
              })}
              <tr className="bg-blue-50 font-semibold">
                <td className="border border-gray-300 p-2 text-right" colSpan={3}>Total Mensal:</td>
                <td className="border border-gray-300 p-2 text-right">{formatCurrency(calculatedMensalTotal)}</td>
              </tr>
              <tr className="bg-blue-100 font-bold">
                <td className="border border-gray-300 p-2 text-right" colSpan={3}>Total Anual:</td>
                <td className="border border-gray-300 p-2 text-right">{formatCurrency(calculatedAnualTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">Observação:</span> Os valores acima foram calculados com base no volume de atendimentos de cada unidade e 
            no valor de referência estabelecido para os serviços contratados, incluindo todos os custos operacionais, 
            insumos, recursos humanos e tecnológicos necessários para a execução do plano de trabalho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JustificativaECustos;