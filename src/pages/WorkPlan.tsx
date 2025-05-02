
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon, DownloadIcon, Settings2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as XLSX from 'xlsx';
import { useCostContext } from '@/context/CostContext';

// Importar componentes modulares do plano de trabalho
import WorkPlanConfig from '@/components/workplan/WorkPlanConfig';
import BudgetTable from '@/components/workplan/BudgetTable';
import Participantes from '@/components/workplan/Participantes';
import Objetivos from '@/components/workplan/Objetivos';
import Cronograma from '@/components/workplan/Cronograma';
import Assinaturas from '@/components/workplan/Assinaturas';
import MonitoramentoEContrapartida from '@/components/workplan/MonitoramentoEContrapartida';
import SistemasIntegrados from '@/components/workplan/SistemasIntegrados';
import JustificativaECustos from '@/components/workplan/JustificativaECustos';

// Tipos
interface BudgetItem {
  nome: string;
  qtd: number;
  valor: number;
}

interface BudgetCategory {
  total: number;
  items: BudgetItem[];
}

interface BudgetData {
  recursosHumanos: BudgetCategory;
  capacitacao: BudgetCategory;
  sistemasTecnologia: BudgetCategory;
  consultorias: BudgetCategory;
  instalacoesOperacao: BudgetCategory;
}

const WorkPlan = () => {
  const {
    professionals,
    trainings,
    systemsConsulting,
    facilityCosts,
    calculateProfessionalsCost,
    calculateTrainingsCost,
    calculateSystemsCost,
    calculateConsultingCost,
    calculateFacilityCost,
    calculateTotalCost,
    workPlanTotalMensal,
    workPlanTotalAnual,
    updateWorkPlanTotals
  } = useCostContext();

  // Dados do município e da parceria
  const [workPlanConfig, setWorkPlanConfig] = useState({
    municipio: 'Ibotirama/BA',
    populacao: '26.309',
    consorcio: 'Consórcio de Saúde',
    cnpjConsorcio: '',
    cnpjPrefeitura: '',
    representanteConsorcio: '',
    representantePrefeitura: '',
    cargoRepresentanteConsorcio: '',
    cargoRepresentantePrefeitura: '',
    enderecoPrefeitura: '',
    enderecoConsorcio: '',
    numeroProcAdm: '',
    dataAssinatura: ''
  });

  // Usar os dados da calculadora para distribuição das categorias
  const [budgetData, setBudgetData] = useState<BudgetData>({
    recursosHumanos: {
      total: 0,
      items: []
    },
    capacitacao: {
      total: 0,
      items: []
    },
    sistemasTecnologia: {
      total: 0,
      items: []
    },
    consultorias: {
      total: 0,
      items: []
    },
    instalacoesOperacao: {
      total: 0,
      items: []
    }
  });

  // Carregar dados da configuração do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('workPlanConfig');
    if (savedConfig) {
      setWorkPlanConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Salvar configurações quando alteradas
  useEffect(() => {
    localStorage.setItem('workPlanConfig', JSON.stringify(workPlanConfig));
  }, [workPlanConfig]);

  // Função auxiliar para encontrar um item por nome na coleção
  const findItemCostByName = (collection: Array<{name: string, cost: number}>, name: string): number => {
    const item = collection.find(item => item.name.toLowerCase().includes(name.toLowerCase()));
    return item ? item.cost : 0;
  };

  // Converter dados da calculadora para o formato do plano de trabalho
  useEffect(() => {
    // Garantir que temos o valor total atualizado antes de continuar
    updateWorkPlanTotals();

    // Profissionais
    const profItems = professionals.map(prof => ({
      nome: prof.type,
      qtd: prof.quantity,
      valor: prof.salary
    }));

    // Capacitações
    const trainItems = trainings.map(train => ({
      nome: train.name,
      qtd: train.participants,
      valor: train.cost * (train.hours / 8) // Convertendo para diárias
    }));

    // Sistemas
    const systemItems = systemsConsulting
      .filter(item => item.category === 'system')
      .map(sys => ({
        nome: sys.name,
        qtd: 1,
        valor: sys.cost
      }));

    // Consultorias
    const consultingItems = systemsConsulting
      .filter(item => item.category === 'consulting')
      .map(cons => ({
        nome: cons.name,
        qtd: 1,
        valor: cons.cost
      }));

    // Instalações e Operação
    // Agora tratando corretamente os arrays de FacilityItem
    const facilityItems = [
      { nome: "Infraestrutura (Aluguel, Utilidades)", qtd: 1, valor: 
        findItemCostByName(facilityCosts.infrastructure, 'Aluguel') + 
        findItemCostByName(facilityCosts.infrastructure, 'Utilidades') 
      },
      { nome: "Manutenção", qtd: 1, valor: findItemCostByName(facilityCosts.infrastructure, 'Manutenção') },
      { nome: "Equipamentos Médicos", qtd: 1, valor: findItemCostByName(facilityCosts.equipment, 'Equipamentos Médicos') },
      { nome: "Equipamentos de Escritório", qtd: 1, valor: findItemCostByName(facilityCosts.equipment, 'Material de Escritório') },
      { nome: "Suprimentos", qtd: 1, valor: findItemCostByName(facilityCosts.operational, 'Suprimentos') },
      { nome: "Seguros", qtd: 1, valor: findItemCostByName(facilityCosts.operational, 'Seguros') },
      { nome: "Outros Custos Operacionais", qtd: 1, valor: findItemCostByName(facilityCosts.operational, 'Outros Custos') }
    ];

    setBudgetData({
      recursosHumanos: { 
        total: calculateProfessionalsCost(), 
        items: profItems 
      },
      capacitacao: { 
        total: calculateTrainingsCost(), 
        items: trainItems 
      },
      sistemasTecnologia: { 
        total: calculateSystemsCost(), 
        items: systemItems 
      },
      consultorias: { 
        total: calculateConsultingCost(), 
        items: consultingItems 
      },
      instalacoesOperacao: { 
        total: calculateFacilityCost(), 
        items: facilityItems 
      }
    });
  }, [professionals, trainings, systemsConsulting, facilityCosts, updateWorkPlanTotals, calculateProfessionalsCost, calculateTrainingsCost, calculateSystemsCost, calculateConsultingCost, calculateFacilityCost]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    // Dados para o Excel
    const planData = [
      { Categoria: "Recursos Humanos", "Custo Mensal": budgetData.recursosHumanos.total, "Custo Anual": budgetData.recursosHumanos.total * 12 },
      { Categoria: "Capacitação", "Custo Mensal": budgetData.capacitacao.total, "Custo Anual": budgetData.capacitacao.total * 12 },
      { Categoria: "Sistemas e Tecnologia", "Custo Mensal": budgetData.sistemasTecnologia.total, "Custo Anual": budgetData.sistemasTecnologia.total * 12 },
      { Categoria: "Consultorias", "Custo Mensal": budgetData.consultorias.total, "Custo Anual": budgetData.consultorias.total * 12 },
      { Categoria: "Instalações/Operação", "Custo Mensal": budgetData.instalacoesOperacao.total, "Custo Anual": budgetData.instalacoesOperacao.total * 12 },
      { Categoria: "TOTAL", "Custo Mensal": workPlanTotalMensal, "Custo Anual": workPlanTotalAnual }
    ];

    // Criar planilha
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(planData), "Plano de Trabalho");
    
    // Detalhamento por categoria
    const recursosHumanosData = budgetData.recursosHumanos.items.map(item => ({
      "Item": item.nome,
      "Quantidade": item.qtd,
      "Valor Unitário": item.valor,
      "Valor Total Mensal": item.qtd * item.valor,
      "Valor Total Anual": item.qtd * item.valor * 12
    }));
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(recursosHumanosData), "Recursos Humanos");
    
    // Gerar e baixar o arquivo
    const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    XLSX.writeFile(workbook, `Plano-de-Trabalho-${date}.xlsx`);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Atualizar configurações do plano de trabalho
  const updateConfig = (field: string, value: string) => {
    setWorkPlanConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="plan">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Plano de Trabalho</h1>
            <div className="flex items-center">
              <TabsList className="mr-4">
                <TabsTrigger value="plan">Visualização</TabsTrigger>
                <TabsTrigger value="config"><Settings2Icon className="h-4 w-4 mr-2" />Configuração</TabsTrigger>
              </TabsList>
              <div className="space-x-2 print:hidden">
                <Button variant="outline" onClick={handlePrint}>
                  <PrinterIcon className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" onClick={handleExportToExcel}>
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Exportar Excel
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="config">
            <WorkPlanConfig 
              workPlanConfig={workPlanConfig} 
              updateConfig={updateConfig} 
            />
          </TabsContent>
          
          <TabsContent value="plan">
            <Card className="mb-8 print:shadow-none">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-center text-xl">
                  PLANO DE TRABALHO – GESTÃO COMPARTILHADA DE SAÚDE
                </CardTitle>
                <div className="text-sm text-center text-gray-600">
                  Processo Administrativo Nº: {workPlanConfig.numeroProcAdm || "[Número do Processo da Prefeitura]"}<br />
                  Parceria entre: Prefeitura Municipal de {workPlanConfig.municipio} e {workPlanConfig.consorcio}<br />
                  (Lei Federal nº 13.019/2014)
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Partícipes */}
                  <Participantes 
                    municipio={workPlanConfig.municipio} 
                    representanteMunicipio={{
                      nome: workPlanConfig.representantePrefeitura,
                      cargo: workPlanConfig.cargoRepresentantePrefeitura
                    }}
                    representanteConsorcio={{
                      nome: workPlanConfig.representanteConsorcio,
                      cargo: workPlanConfig.cargoRepresentanteConsorcio
                    }}
                  />
                  
                  <Separator />
                  
                  {/* Objetivos, Contextualização e Metas */}
                  <Objetivos municipio={workPlanConfig.municipio} />

                  <Separator />

                  {/* Seção 6: Atividades / Ações */}
                  <section>
                    <h2 className="font-bold text-lg mb-4 text-blue-800">6. ATIVIDADES / AÇÕES (ETAPAS / FASES)</h2>
                    
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Fase 1: Transição e Implantação (Meses 1-2)</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Assunção formal da gestão dos serviços definidos no objeto.</li>
                          <li>Transferência/gestão de contratos de pessoal, sistemas e serviços existentes.</li>
                          <li>Diagnóstico situacional rápido e validação do planejamento operacional.</li>
                          <li>Implantação ou ajuste inicial de sistemas de gestão do Consórcio.</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Fase 2: Operacionalização e Manutenção (Meses 1-12)</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Gestão de RH (Meta 1): Manutenção de contratos, folha de pagamento, gestão de ponto, alocação de equipes.</li>
                          <li>Capacitação (Meta 2): Execução dos treinamentos planejados (Equipe, Multiprofissional, ACS, etc.).</li>
                          <li>Sistemas e Tecnologia (Meta 3): Pagamento de licenças, suporte técnico, manutenção de servidores, gestão de prontuários e dados.</li>
                          <li>Consultorias (Meta 4): Acompanhamento dos contratos, recebimento e análise de produtos/relatórios.</li>
                          <li>Operação (Meta 5): Pagamento de despesas de custeio, aquisição de materiais básicos (se aplicável), manutenção geral.</li>
                          <li>Monitoramento (Meta 6): Coleta de dados, elaboração e envio de relatórios mensais de acompanhamento.</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  
                  <Separator />

                  {/* Seção 7: Forma de Execução */}
                  <section>
                    <h2 className="font-bold text-lg mb-4 text-blue-800">7. FORMA DE EXECUÇÃO DAS ATIVIDADES E METODOLOGIA</h2>
                    <p className="text-justify">
                      A execução se dará por meio da gestão direta dos serviços pelo {workPlanConfig.consorcio}, que alocará equipe técnica e administrativa para a coordenação local em {workPlanConfig.municipio}. Serão utilizados os sistemas de informação detalhados no Plano de Aplicação (PEC, BI, Gestão de Dados, Ponto Eletrônico, etc.) para registro, acompanhamento e gestão. A metodologia de trabalho seguirá os protocolos clínicos e diretrizes do SUS e do Ministério da Saúde, bem como os manuais e fluxos operacionais definidos pelo Consórcio. A gestão de pessoas incluirá controle de frequência (ponto eletrônico facial), avaliação de desempenho e programas de educação permanente. A comunicação entre as equipes e com a gestão municipal será realizada por meio de relatórios periódicos, reuniões e sistemas de comunicação interna.
                    </p>
                  </section>
                  
                  <Separator />

                  {/* Seção 8: Parâmetros para Aferição */}
                  <section>
                    <h2 className="font-bold text-lg mb-4 text-blue-800">8. PARÂMETROS PARA AFERIÇÃO E INDICADORES (Monitoramento e Avaliação)</h2>
                    
                    <div className="overflow-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicador</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fórmula de Cálculo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonte de Verificação</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodicidade</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">Percentual de Profissionais Atuantes vs. Previsto</td>
                            <td className="px-6 py-4 whitespace-nowrap">(Nº Profissionais Atuantes / Nº Previsto) * 100</td>
                            <td className="px-6 py-4 whitespace-nowrap">Folha de Pagamento, Relatório de RH, Sistema de Ponto</td>
                            <td className="px-6 py-4 whitespace-nowrap">Mensal</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                            <td className="px-6 py-4 whitespace-nowrap">Percentual de Execução do Cronograma de Capacitação</td>
                            <td className="px-6 py-4 whitespace-nowrap">(Nº Ações Realizadas / Nº Ações Previstas) * 100</td>
                            <td className="px-6 py-4 whitespace-nowrap">Listas de Presença, Relatórios de Treinamento, Certificados</td>
                            <td className="px-6 py-4 whitespace-nowrap">Trimestral</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">3</td>
                            <td className="px-6 py-4 whitespace-nowrap">Percentual de Disponibilidade dos Sistemas Essenciais</td>
                            <td className="px-6 py-4 whitespace-nowrap">Avaliação Qualitativa/Relatório Técnico</td>
                            <td className="px-6 py-4 whitespace-nowrap">Relatórios de Suporte Técnico, Checklists de Operação</td>
                            <td className="px-6 py-4 whitespace-nowrap">Mensal</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                  
                  <Separator />
                  
                  {/* Cronograma */}
                  <Cronograma 
                    consorcio={workPlanConfig.consorcio}
                    totalMensal={workPlanTotalMensal}
                    totalAnual={workPlanTotalAnual}
                  />
                  
                  <Separator />

                  {/* Seção 10: Plano de Aplicação */}
                  <section>
                    <h2 className="font-bold text-lg mb-4 text-blue-800">10. PLANO DE APLICAÇÃO DETALHADO (Orçamento Anual)</h2>
                    <p className="mb-4">
                      (Baseado no Custo Mensal de {formatCurrency(workPlanTotalMensal)} - Detalhamento abaixo é MENSAL para referência, TOTAL ANUAL = {formatCurrency(workPlanTotalAnual)})
                    </p>
                    
                    <BudgetTable 
                      budgetData={budgetData}
                      totalMensal={workPlanTotalMensal}
                      totalAnual={workPlanTotalAnual}
                    />
                  </section>

                  <Separator />

                  {/* Seção 11: Equipe de Trabalho */}
                  <section>
                    <h2 className="font-bold text-lg mb-4 text-blue-800">11. EQUIPE DE TRABALHO (Alocada pelo Consórcio)</h2>
                    <div className="space-y-2">
                      <p>
                        <strong>Coordenação Geral:</strong> 1 Coordenador(a) de Projeto/Gestor(a) Local (responsável pela execução do Plano de Trabalho).
                      </p>
                      <p>
                        <strong>Equipe Assistencial e de Apoio:</strong> Profissionais detalhados na seção 1 do Plano de Aplicação (Médicos, Enfermeiros, Técnicos de Enfermagem, etc.).
                      </p>
                      <p>
                        <strong>Equipe Administrativa:</strong> Profissionais detalhados na seção 1 do Plano de Aplicação (Recepcionistas, etc.) e equipe administrativa/financeira da sede do Consórcio para suporte.
                      </p>
                      <p className="text-sm italic mt-2">
                        Obs: A remuneração da equipe alocada diretamente à execução do objeto está prevista no Plano de Aplicação.
                      </p>
                    </div>
                  </section>

                  <Separator />

                  {/* Seção 12: Sistemas Integrados */}
                  <SistemasIntegrados />

                  <Separator />
                  
                  {/* Seção 13: Justificativa e Custos */}
                  <JustificativaECustos 
                    municipio={workPlanConfig.municipio}
                    populacaoEstimada={parseInt(workPlanConfig.populacao) || 26309}
                  />

                  <Separator />
                  
                  {/* Seções 14 e 15: Monitoramento e Contrapartida */}
                  <MonitoramentoEContrapartida
                    municipio={workPlanConfig.municipio}
                    consorcio={workPlanConfig.consorcio}
                  />

                  <Separator />

                  {/* Seção 16: Assinaturas */}
                  <Assinaturas 
                    municipio={workPlanConfig.municipio} 
                    data={workPlanConfig.dataAssinatura}
                    responsavelPrefeitura={{
                      nome: workPlanConfig.representantePrefeitura,
                      cargo: workPlanConfig.cargoRepresentantePrefeitura
                    }}
                    responsavelConsorcio={{
                      nome: workPlanConfig.representanteConsorcio,
                      cargo: workPlanConfig.cargoRepresentanteConsorcio
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Estilos para impressão */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              font-size: 12pt;
            }
            
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            
            .print\\:hidden {
              display: none !important;
            }
            
            table {
              break-inside: avoid;
            }
            
            h2, h3, table {
              page-break-inside: avoid;
            }
            
            section {
              break-inside: avoid;
            }
          }
        `
      }} />
      
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12 print:hidden">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Sistema de Cálculo de Custos - Unidade de Saúde</p>
        </div>
      </footer>
    </div>
  );
};

export default WorkPlan;
