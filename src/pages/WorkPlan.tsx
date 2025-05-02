import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PrinterIcon, DownloadIcon } from "lucide-react";
import * as XLSX from 'xlsx';

const WorkPlan = () => {
  // Valor correto da calculadora
  const totalMensal = 575950.00;
  const totalAnual = totalMensal * 12;
  
  // Usar os dados corretos da calculadora para distribuição das categorias
  // As proporções são mantidas, mas os valores são ajustados para o novo total
  const [budgetData, setBudgetData] = useState({
    recursosHumanos: {
      total: 380000.00,
      items: [
        { nome: "Médico (PSF - 40h)", qtd: 11, valor: 15000.00 },
        { nome: "Enfermeiro (40h)", qtd: 2, valor: 3000.00 },
        { nome: "Técnico de Enfermagem (40h)", qtd: 10, valor: 3500.00 },
        { nome: "Recepcionista (40h)", qtd: 24, valor: 2200.00 },
        { nome: "Vigilante (12h/dia - escala)", qtd: 11, valor: 2000.00 },
        { nome: "Porteiro (40h)", qtd: 11, valor: 1800.00 },
        { nome: "Agente de Serviços Gerais (40h)", qtd: 11, valor: 1800.00 },
      ]
    },
    capacitacao: {
      total: 45000.00,
      items: [
        { nome: "Treinamento Equipe", qtd: 15, valor: 1000.00 },
        { nome: "Treinamento Equipe Multiprofissional", qtd: 4, valor: 600.00 },
        { nome: "Treinamento ACS", qtd: 11, valor: 1000.00 },
        { nome: "Treinamento Posto de Saúde", qtd: 5, valor: 300.00 },
        { nome: "Capacitação e Treinamento Geral", qtd: 1, valor: 8000.00 },
      ]
    },
    sistemasTecnologia: {
      total: 63000.00,
      items: [
        { nome: "Prontuário eletrônico / PEC", qtd: 17, valor: 600.00 },
        { nome: "Sistema de Gestão de Dados", qtd: 17, valor: 700.00 },
        { nome: "Ponto eletrônico facial", qtd: 25, valor: 400.00 },
        { nome: "Sistema de Inteligência de BI", qtd: 1, valor: 3000.00 },
        { nome: "Servidor em Nuvem", qtd: 1, valor: 1200.00 },
        { nome: "Suporte Técnico Online e Presencial", qtd: 1, valor: 1800.00 },
        { nome: "Sistema de Georreferenciamento", qtd: 1, valor: 1200.00 },
        { nome: "Sistema de Controle de Dispositivos Móveis", qtd: 1, valor: 900.00 },
        { nome: "Sistema de Telemedicina Integrado", qtd: 1, valor: 2800.00 },
        { nome: "Sistema de Monitoramento de Indicadores", qtd: 1, valor: 1800.00 },
        { nome: "Sistema de Gestão de Estoque e Medicamentos", qtd: 1, valor: 1500.00 },
        { nome: "Sistema de Agendamento e Regulação", qtd: 1, valor: 1200.00 },
        { nome: "Sistema de Comunicação Interna e Externa", qtd: 1, valor: 1000.00 },
        { nome: "Sistema de Gestão de Protocolos Clínicos", qtd: 1, valor: 1200.00 },
        { nome: "Sistema de Satisfação do Usuário", qtd: 1, valor: 1400.00 },
        { nome: "Sistema de Gestão de Vigilância em Saúde", qtd: 1, valor: 1800.00 },
      ]
    },
    consultorias: {
      total: 41100.00,
      items: [
        { nome: "Consultoria Geral", qtd: 11, valor: 1200.00 },
        { nome: "Consultoria para Gestão da Atenção Básica", qtd: 1, valor: 3800.00 },
        { nome: "Consultoria para Profissionais de Saúde", qtd: 1, valor: 2200.00 },
        { nome: "Relatórios Mensais de Atividades", qtd: 1, valor: 2200.00 },
        { nome: "Consultoria para Captação de Recursos", qtd: 1, valor: 3800.00 },
        { nome: "Consultoria para CNES", qtd: 1, valor: 2200.00 },
        { nome: "Consultoria para Integração de Sistemas", qtd: 1, valor: 4200.00 },
      ]
    },
    instalacoesOperacao: {
      total: 46850.00,
      items: [
        { nome: "Infraestrutura Operacional", qtd: 1, valor: 20000.00 },
        { nome: "Equipamentos e Manutenção", qtd: 1, valor: 15000.00 },
        { nome: "Materiais de Consumo", qtd: 1, valor: 8000.00 },
        { nome: "Outros Custos Operacionais", qtd: 1, valor: 3850.00 },
      ]
    }
  });

  // Calcular os totais para cada categoria e para o orçamento todo
  useEffect(() => {
    const recalculateTotals = () => {
      const recursosHumanosTotal = budgetData.recursosHumanos.items.reduce((total, item) => total + (item.qtd * item.valor), 0);
      const capacitacaoTotal = budgetData.capacitacao.items.reduce((total, item) => total + (item.qtd * item.valor), 0);
      const sistemasTecnologiaTotal = budgetData.sistemasTecnologia.items.reduce((total, item) => total + (item.qtd * item.valor), 0);
      const consultoriasTotal = budgetData.consultorias.items.reduce((total, item) => total + (item.qtd * item.valor), 0);
      const instalacoesOperacaoTotal = budgetData.instalacoesOperacao.items.reduce((total, item) => total + (item.qtd * item.valor), 0);
      
      setBudgetData(prevData => ({
        ...prevData,
        recursosHumanos: { ...prevData.recursosHumanos, total: recursosHumanosTotal },
        capacitacao: { ...prevData.capacitacao, total: capacitacaoTotal },
        sistemasTecnologia: { ...prevData.sistemasTecnologia, total: sistemasTecnologiaTotal },
        consultorias: { ...prevData.consultorias, total: consultoriasTotal },
        instalacoesOperacao: { ...prevData.instalacoesOperacao, total: instalacoesOperacaoTotal }
      }));
    };
    
    recalculateTotals();
  }, []);

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
      { Categoria: "TOTAL", "Custo Mensal": totalMensal, "Custo Anual": totalAnual }
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

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Calcular o total mensal e anual
  const totalCategoriaMensal = 
    budgetData.recursosHumanos.total + 
    budgetData.capacitacao.total + 
    budgetData.sistemasTecnologia.total + 
    budgetData.consultorias.total + 
    budgetData.instalacoesOperacao.total;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Plano de Trabalho</h1>
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

        <Card className="mb-8 print:shadow-none">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-center text-xl">
              PLANO DE TRABALHO – GESTÃO COMPARTILHADA DE SAÚDE
            </CardTitle>
            <div className="text-sm text-center text-gray-600">
              Processo Administrativo Nº: [Número do Processo da Prefeitura]<br />
              Parceria entre: Prefeitura Municipal de Ibotirama/BA e [Nome do Consórcio de Saúde]<br />
              (Lei Federal nº 13.019/2014)
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">1. IDENTIFICAÇÃO DOS PARTÍCIPES</h2>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">ADMINISTRAÇÃO PÚBLICA PARCEIRA:</h3>
                    <p><strong>Órgão:</strong> Prefeitura Municipal de Ibotirama</p>
                    <p><strong>CNPJ:</strong> [CNPJ da Prefeitura]</p>
                    <p><strong>Endereço:</strong> [Endereço da Prefeitura]</p>
                    <p><strong>Representante:</strong> [Nome do(a) Prefeito(a) ou Secretário(a) Municipal de Saúde]</p>
                    <p><strong>Cargo:</strong> [Cargo do Representante]</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">ORGANIZAÇÃO PROPONENTE (Consórcio):</h3>
                    <p><strong>Nome:</strong> [Nome do Consórcio de Saúde - Ex: Consórcio Intermunicipal de Saúde Velho Chico]</p>
                    <p><strong>CNPJ:</strong> [CNPJ do Consórcio]</p>
                    <p><strong>Endereço:</strong> [Endereço Sede do Consórcio]</p>
                    <p><strong>Representante Legal:</strong> [Nome do Presidente/Diretor do Consórcio]</p>
                    <p><strong>Cargo:</strong> [Cargo do Representante]</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">CARACTERIZAÇÃO DO MUNICÍPIO:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>População:</strong> 26.309 habitantes (IBGE, Censo 2022)</li>
                      <li><strong>Área territorial:</strong> 1.740,087 km²</li>
                      <li><strong>Densidade demográfica:</strong> 15,12 hab/km²</li>
                      <li><strong>Localização:</strong> Margem direita do rio São Francisco, cortada pela BR-242 (liga Salvador a Brasília)</li>
                      <li><strong>Fundação:</strong> 14 de agosto de 1958</li>
                      <li><strong>PIB:</strong> R$ 415,6 milhões (2021), com 50,1% do valor adicionado vindo do setor de serviços</li>
                      <li><strong>PIB per capita:</strong> R$ 15.348,75 (2021)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">2. DESCRIÇÃO DO OBJETO DA PARCERIA</h2>
                <p className="text-justify">
                  Gestão compartilhada, operacionalização e execução das ações e serviços da Atenção Primária à Saúde (APS) e serviços de apoio relacionados (administrativos, tecnológicos, logísticos) no âmbito do Sistema Único de Saúde (SUS) no município de Ibotirama/BA, pelo período de 12 (doze) meses, visando a qualificação da gestão, a otimização dos recursos e a melhoria do acesso e da qualidade dos serviços prestados à população, em conformidade com as diretrizes do SUS e o Plano Municipal de Saúde.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">3. CONTEXTUALIZAÇÃO E JUSTIFICATIVA</h2>
                <p className="text-justify mb-3">
                  O município de Ibotirama/BA, com população de 26.309 habitantes (Censo 2022), localizado na região do Médio São Francisco, enfrenta desafios comuns a municípios de pequeno/médio porte na gestão e oferta de serviços de saúde, especialmente na Atenção Primária.
                </p>

                <h3 className="font-medium mb-2">Perfil Epidemiológico:</h3>
                <ul className="list-disc pl-5 mb-4">
                  <li>Taxa de mortalidade infantil de 26,88 por mil nascidos vivos, acima da média nacional</li>
                  <li>Prevalência de doenças crônicas não transmissíveis (hipertensão, diabetes)</li>
                  <li>Incidência significativa de arboviroses (dengue, zika, chikungunya)</li>
                  <li>Demanda por atendimentos em saúde mental</li>
                  <li>Necessidade de fortalecimento das ações de saúde materno-infantil</li>
                </ul>

                <h3 className="font-medium mb-2">Estrutura Atual de Saúde:</h3>
                <ul className="list-disc pl-5 mb-4">
                  <li>Unidades Básicas de Saúde com cobertura estimada de 69,50% do território</li>
                  <li>Centro de Atenção Psicossocial (CAPS I)</li>
                  <li>Serviços de apoio diagnóstico com limitações de oferta</li>
                  <li>Escassez de profissionais especializados</li>
                  <li>Alta rotatividade de médicos na Atenção Primária</li>
                  <li>Necessidade de capacitação contínua das equipes</li>
                  <li>Fragilidades nos processos de planejamento e monitoramento</li>
                  <li>Informatização parcial dos serviços de saúde</li>
                </ul>

                <p className="text-justify mb-3">
                  A presente parceria com o [Nome do Consórcio] justifica-se pela busca de maior eficiência na gestão, ganho de escala na aquisição de insumos e tecnologias, otimização da alocação de recursos humanos especializados, implementação de processos de trabalho padronizados e fortalecimento da capacidade resolutiva da rede de saúde local. 
                </p>
                
                <p className="text-justify">
                  O modelo de gestão via consórcio permite compartilhar custos e expertise, potencializando os resultados e o impacto na saúde da população, alinhado aos princípios de regionalização e integração do SUS. A parceria visa superar gargalos operacionais e assistenciais, promovendo uma gestão mais profissionalizada e focada em resultados.
                </p>
              </section>
              
              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">4. OBJETIVOS</h2>
                <p className="font-medium mb-2">Objetivo Geral:</p>
                <p className="text-justify mb-4">
                  Qualificar e ampliar o acesso aos serviços de saúde da Atenção Primária em Ibotirama, garantindo gestão eficiente, integrada e resolutiva, por meio da operacionalização consorciada dos serviços.
                </p>
                
                <p className="font-medium mb-2">Objetivos Específicos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>OE1: Garantir o quadro de profissionais adequado e completo para a operacionalização dos serviços de APS conforme planejamento.</li>
                  <li>OE2: Implementar e manter programas de capacitação e educação permanente para as equipes de saúde.</li>
                  <li>OE3: Implantar, manter e otimizar o uso de sistemas de informação e tecnologia em saúde para apoio à gestão e à assistência.</li>
                  <li>OE4: Assegurar apoio técnico especializado por meio de consultorias para aprimoramento contínuo da gestão e dos processos.</li>
                  <li>OE5: Garantir a manutenção da infraestrutura operacional básica e o suprimento de insumos necessários à execução dos serviços.</li>
                  <li>OE6: Monitorar e avaliar continuamente os indicadores de processo e resultado da gestão consorciada.</li>
                </ul>
              </section>
              
              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">5. METAS</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Meta 1 (OE1): Manter 100% do quadro de profissionais previsto no Plano de Aplicação contratado e atuante durante os 12 meses de vigência da parceria.</li>
                  <li>Meta 2 (OE2): Executar 100% do cronograma de capacitações e treinamentos previstos no Plano de Aplicação durante os 12 meses.</li>
                  <li>Meta 3 (OE3): Manter 100% dos sistemas e tecnologias listados no Plano de Aplicação operativos e disponíveis para as equipes durante os 12 meses.</li>
                  <li>Meta 4 (OE4): Manter 100% dos serviços de consultoria contratados e ativos, com entrega de relatórios/produtos conforme pactuado, durante os 12 meses.</li>
                  <li>Meta 5 (OE5): Executar 100% do orçamento previsto para despesas de custeio operacional (Instalações e Operação) durante os 12 meses.</li>
                  <li>Meta 6 (OE6): Apresentar relatórios mensais de monitoramento de indicadores e execução físico-financeira à Gestão Municipal durante os 12 meses.</li>
                </ul>
              </section>
              
              <Separator />

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

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">7. FORMA DE EXECUÇÃO DAS ATIVIDADES E METODOLOGIA</h2>
                <p className="text-justify">
                  A execução se dará por meio da gestão direta dos serviços pelo [Nome do Consórcio], que alocará equipe técnica e administrativa para a coordenação local em Ibotirama. Serão utilizados os sistemas de informação detalhados no Plano de Aplicação (PEC, BI, Gestão de Dados, Ponto Eletrônico, etc.) para registro, acompanhamento e gestão. A metodologia de trabalho seguirá os protocolos clínicos e diretrizes do SUS e do Ministério da Saúde, bem como os manuais e fluxos operacionais definidos pelo Consórcio. A gestão de pessoas incluirá controle de frequência (ponto eletrônico facial), avaliação de desempenho e programas de educação permanente. A comunicação entre as equipes e com a gestão municipal será realizada por meio de relatórios periódicos, reuniões e sistemas de comunicação interna.
                </p>
              </section>
              
              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">8. PARÂMETROS PARA AFERIÇÃO E INDICADORES (Monitoramento e Avaliação)</h2>
                
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meta</TableHead>
                        <TableHead>Indicador</TableHead>
                        <TableHead>Fórmula de Cálculo</TableHead>
                        <TableHead>Fonte de Verificação</TableHead>
                        <TableHead>Periodicidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Percentual de Profissionais Atuantes vs. Previsto</TableCell>
                        <TableCell>(Nº Profissionais Atuantes / Nº Previsto) * 100</TableCell>
                        <TableCell>Folha de Pagamento, Relatório de RH, Sistema de Ponto</TableCell>
                        <TableCell>Mensal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Percentual de Execução do Cronograma de Capacitação</TableCell>
                        <TableCell>(Nº Ações Realizadas / Nº Ações Previstas) * 100</TableCell>
                        <TableCell>Listas de Presença, Relatórios de Treinamento, Certificados</TableCell>
                        <TableCell>Trimestral</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Percentual de Disponibilidade dos Sistemas Essenciais</TableCell>
                        <TableCell>Avaliação Qualitativa/Relatório Técnico</TableCell>
                        <TableCell>Relatórios de Suporte Técnico, Checklists de Operação</TableCell>
                        <TableCell>Mensal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell>Percentual de Contratos de Consultoria Ativos e com Entregas em Dia</TableCell>
                        <TableCell>(Nº Contratos Ativos e Regulares / Nº Total) * 100</TableCell>
                        <TableCell>Relatórios de Consultoria, Atestados de Recebimento, Comprovantes de Pagamento</TableCell>
                        <TableCell>Mensal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>5</TableCell>
                        <TableCell>Percentual de Execução Orçamentária de Custeio Operacional</TableCell>
                        <TableCell>(Valor Gasto / Valor Orçado no Período) * 100</TableCell>
                        <TableCell>Relatórios Financeiros, Extratos Bancários, Notas Fiscais</TableCell>
                        <TableCell>Mensal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>6</TableCell>
                        <TableCell>Entrega dos Relatórios Mensais de Monitoramento dentro do Prazo</TableCell>
                        <TableCell>Verificação Simples (Sim/Não)</TableCell>
                        <TableCell>Protocolo de Entrega, E-mails</TableCell>
                        <TableCell>Mensal</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>
              
              <Separator />

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
                      <strong>Forma de Repasse:</strong> Repasses mensais de {formatCurrency(totalMensal)} ({totalMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim()} reais), a serem realizados pela Prefeitura Municipal de Ibotirama ao [Nome do Consórcio] até o 5º (quinto) dia útil de cada mês subsequente à prestação dos serviços, mediante apresentação de relatório de atividades e comprovação de regularidade fiscal e trabalhista.
                    </p>
                  </div>
                </div>
              </section>
              
              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">10. PLANO DE APLICAÇÃO DETALHADO (Orçamento Anual)</h2>
                <p className="mb-4">
                  (Baseado no Custo Mensal de {formatCurrency(totalMensal)} - Detalhamento abaixo é MENSAL para referência, TOTAL ANUAL = {formatCurrency(totalAnual)})
                </p>
                
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead>Categoria</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Qtd.</TableHead>
                        <TableHead className="text-right">Custo Unit. (R$)</TableHead>
                        <TableHead className="text-right">Custo Total Mensal (R$)</TableHead>
                        <TableHead className="text-right">Custo Total Anual (R$)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Recursos Humanos */}
                      <TableRow className="bg-blue-50 font-medium">
                        <TableCell>1. Recursos Humanos</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{budgetData.recursosHumanos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{(budgetData.recursosHumanos.total * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      {budgetData.recursosHumanos.items.map((item, index) => (
                        <TableRow key={`rh-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell className="text-right">{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Capacitação */}
                      <TableRow className="bg-green-50 font-medium">
                        <TableCell>2. Capacitação</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{budgetData.capacitacao.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{(budgetData.capacitacao.total * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      {budgetData.capacitacao.items.map((item, index) => (
                        <TableRow key={`cap-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell className="text-right">{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Sistemas e Tecnologia */}
                      <TableRow className="bg-purple-50 font-medium">
                        <TableCell>3. Sistemas e Tecnologia</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{budgetData.sistemasTecnologia.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{(budgetData.sistemasTecnologia.total * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      {budgetData.sistemasTecnologia.items.map((item, index) => (
                        <TableRow key={`sys-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell className="text-right">{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Consultorias */}
                      <TableRow className="bg-amber-50 font-medium">
                        <TableCell>4. Consultorias</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{budgetData.consultorias.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{(budgetData.consultorias.total * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      {budgetData.consultorias.items.map((item, index) => (
                        <TableRow key={`cons-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell className="text-right">{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Instalações/Operação */}
                      <TableRow className="bg-gray-50 font-medium">
                        <TableCell>5. Instalações/Operação</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{budgetData.instalacoesOperacao.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{(budgetData.instalacoesOperacao.total * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      {budgetData.instalacoesOperacao.items.map((item, index) => (
                        <TableRow key={`op-${index}`}>
                          <TableCell></TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.qtd}</TableCell>
                          <TableCell className="text-right">{item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right">{(item.qtd * item.valor * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                      
                      {/* TOTAL GERAL */}
                      <TableRow className="bg-gray-800 text-white font-bold">
                        <TableCell>TOTAL GERAL</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{totalAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              <Separator />

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

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">12. PROCEDIMENTOS DE MONITORAMENTO E AVALIAÇÃO</h2>
                
                <p className="text-justify mb-4">
                  O monitoramento será realizado conjuntamente pela Prefeitura Municipal de Ibotirama (por meio da Secretaria Municipal de Saúde) e pelo [Nome do Consórcio].
                </p>
                
                <p className="font-medium mb-2">Instrumentos:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Relatórios Mensais de Atividades e Execução Financeira (elaborados pelo Consórcio).</li>
                  <li>Análise dos Indicadores definidos na Seção 8.</li>
                  <li>Reuniões periódicas da Comissão de Monitoramento e Avaliação (com representantes de ambas as partes).</li>
                  <li>Visitas técnicas às unidades sob gestão do Consórcio.</li>
                  <li>Acompanhamento pelo Conselho Municipal de Saúde de Ibotirama.</li>
                </ul>
                
                <p className="text-justify">
                  <strong>Avaliação:</strong> Será realizada ao final do período de vigência (12 meses), analisando o cumprimento das metas, a execução orçamentária, os resultados alcançados (qualitativos e quantitativos) e o impacto nos serviços de saúde, podendo gerar recomendações para períodos futuros.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">13. CONTRAPARTIDA (se houver)</h2>
                
                <p className="mb-2">
                  Não se aplica contrapartida financeira para esta parceria.
                </p>
                
                <p className="text-sm italic">
                  (Opcional, se aplicável) A Prefeitura Municipal de Ibotirama oferecerá como contrapartida não financeira a cessão de uso dos imóveis onde funcionam as unidades de saúde objeto desta parceria, bem como a infraestrutura básica existente (energia, água), conforme [Termo de Cessão ou Cláusula Contratual específica].
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">14. SISTEMAS INTEGRADOS E SUPORTE TECNOLÓGICO</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">14.1 Sistemas Integrados de Gestão em Saúde</h3>
                    <p className="mb-4">
                      Realizamos criação e customização de sistemas de acordo com as necessidades do município, 
                      abrangendo os seguintes módulos integrados:
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">TFD</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">FARMÁCIA</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">ALMOXARIFADO</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">AMBULATORIAL</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">EXAMES</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">PRONTO ATENDIMENTO</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">INTEGRAÇÃO COM E-SUS AB</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">REGULAÇÃO</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">FATURAMENTO</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                        <p className="font-medium">ODONTOLOGIA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">14.2 Hospedagem em Nuvem</h3>
                    <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow-sm">
                      <p className="mb-4">
                        Fornecemos a hospedagem em nuvem para municípios que não têm ou têm dificuldades com a integração 
                        de sistemas dentro e fora do município.
                      </p>
                      
                      <ul className="list-disc pl-5 mb-4">
                        <li>Locação do servidor web para que o sistema possa ser acessado de qualquer parte do mundo</li>
                        <li>Suporte técnico 24 horas por dia 7 dias por semana com atendimento diferenciado</li>
                        <li>Solução completa de hospedagem segura para dados de saúde, com backup diário e monitoramento constante</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">14.3 Suporte In loco ou Remoto</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="mb-4">
                        Estamos prontos para lhe atender dentro da unidade de saúde quanto remotamente 
                        flexibilizando a melhor satisfação a nosso cliente.
                      </p>
                      
                      <div className="flex items-center bg-green-50 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="font-medium">Suporte via e-mail, chat, telefone e WhatsApp</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">14.4 Aplicativos Integrados</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold mb-2 text-blue-700">E-Sus Território</h4>
                          <p>Aplicativo para agentes comunitários de saúde realizarem cadastros e visitas domiciliares</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold mb-2 text-blue-700">ConectSus</h4>
                          <p>Configuração completa para integração com o aplicativo oficial do Ministério da Saúde</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold mb-2 text-blue-700">APS Atividade Coletiva</h4>
                          <p>Aplicativo para registro de atividades coletivas realizadas pelas equipes de saúde</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold mb-2 text-blue-700">E-Sus AD</h4>
                          <p>Solução para gerenciamento da Atenção Domiciliar</p>
                        </div>
                      </div>
                      
                      <p className="mb-4">
                        Realizamos o treinamento completo com os profissionais para a utilização dos aplicativos 
                        disponibilizados pelo Ministério da Saúde além das configurações e integrações necessárias 
                        para um funcionamento correto e assertivo. 
                      </p>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                        <p>
                          No aplicativo ConectSus realizamos todas as configurações para que o paciente tenha 
                          interação com sua unidade de saúde podendo até realizar agendamentos de consultas sem 
                          precisar de sair de casa e além disso receber informações de consultas no celular 
                          trazendo assim uma economia tanto para o município quanto para o paciente.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">14.5 Capacitação e Treinamento</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="mb-4">
                        Oferecemos programas completos de capacitação e treinamento para todos os profissionais 
                        envolvidos na operação dos sistemas, garantindo:
                      </p>
                      
                      <ul className="list-disc pl-5">
                        <li>Treinamento inicial presencial para implantação dos sistemas</li>
                        <li>Capacitação contínua por meio de plataforma EAD</li>
                        <li>Workshops periódicos para atualização e aprendizado de novas funcionalidades</li>
                        <li>Material didático completo (manuais, vídeos e tutoriais)</li>
                        <li>Certificação dos profissionais capacitados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">15. JUSTIFICATIVA DE INVESTIMENTO</h2>
                
                <div className="space-y-6">
                  <p className="text-justify">
                    O investimento nos serviços de atenção primária à saúde não deve ser visto apenas como um custo, mas como um 
                    investimento estratégico com retorno significativo para o sistema de saúde e para a qualidade de vida da população.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-blue-800 mb-2">Custo-Efetividade da Atenção Primária</h3>
                      <p>
                        Estudos de custo-efetividade demonstram que para cada R$ 1,00 investido na atenção básica, economiza-se 
                        entre R$ 4,00 e R$ 7,00 em custos hospitalares e de média e alta complexidade. A prevenção e o diagnóstico 
                        precoce reduzem significativamente os gastos futuros com tratamentos mais complexos.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-blue-800 mb-2">Redução da Morbimortalidade</h3>
                      <p>
                        Municípios com cobertura adequada de atenção básica apresentam redução de até 45% na mortalidade infantil e 
                        queda de até 30% nas internações por condições sensíveis à atenção primária, o que representa não apenas 
                        benefícios humanos, mas também economia substancial de recursos.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-green-800 mb-2">Impacto da Tecnologia na Qualidade da Saúde</h3>
                      <p>
                        A incorporação de tecnologias como prontuários eletrônicos, telemedicina e sistemas de gestão de indicadores 
                        permite um acompanhamento mais eficiente dos pacientes, reduzindo a duplicação de exames, melhorando a adesão 
                        a tratamentos e otimizando o fluxo de trabalho das equipes.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-green-800 mb-2">Métricas Baseadas em Dados</h3>
                      <p>
                        Sistemas de BI e análise de dados permitem identificar tendências e necessidades da população atendida, 
                        possibilitando intervenções preventivas que reduzem entre 25% e 40% o agravamento de doenças crônicas como 
                        diabetes e hipertensão.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-700 text-white p-5 rounded-lg">
                    <h3 className="font-bold text-xl mb-3">Retorno Sobre Investimento (ROI)</h3>
                    <p className="mb-3">
                      Baseado em estudos de custo-efetividade em saúde, o investimento adicional proposto para implementação 
                      dos sistemas e serviços listados possui um ROI estimado de:
                    </p>
                    <div className="bg-white text-blue-800 rounded-lg p-4 text-center font-bold text-2xl">
                      4,2x a 7,5x em 3 anos
                    </div>
                    <p className="mt-3 text-sm">
                      Este cálculo considera a redução de internações evitáveis, a otimização de recursos humanos e materiais, 
                      a melhoria na resolutividade da atenção básica e a prevenção de agravamentos de condições de saúde.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">16. CUSTOS POR UNIDADE DE SAÚDE</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">16.1 Análise Detalhada de UBS Porte 1</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 rounded-lg p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-3">Estrutura Física</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Área total do terreno: 482,06m²</li>
                          <li>Área construída: 350,68m²</li>
                          <li>Dimensões mínimas recomendadas: 31m x 61m</li>
                          <li>3-5 consultórios (médico, enfermagem, odontológico)</li>
                          <li>Espaço para acolhimento e espera dos pacientes</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-3">Capacidade Operacional</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Comporta 1 Equipe de Saúde da Família (eSF)</li>
                          <li>Capacidade de atendimento: 3.450 a 4.000 pessoas</li>
                          <li>Média de 600-800 atendimentos mensais</li>
                          <li>Funcionamento de segunda a sexta-feira, 8 horas por dia</li>
                          <li>Possibilidade de extensão para horário ampliado</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-5 shadow-sm mb-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Composição da Equipe - eSF</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>1 Médico de família e comunidade</li>
                        <li>1 Enfermeiro</li>
                        <li>2 Técnicos ou auxiliares de enfermagem</li>
                        <li>4 a 6 Agentes Comunitários de Saúde (ACS)</li>
                        <li>1 Cirurgião-dentista (opcional, equipe de Saúde Bucal)</li>
                        <li>1 Auxiliar/Técnico em Saúde Bucal (opcional)</li>
                        <li>Profissionais administrativos (recepção, limpeza, etc.)</li>
                      </ul>
                    </div>

                    <p className="text-sm text-gray-600 italic mb-6">
                      Nota: As características acima são baseadas nas normas e diretrizes do Ministério da Saúde para 
                      Unidades Básicas de Saúde Porte 1, conforme projetos referenciados disponibilizados pelo Fundo Nacional de Saúde.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-blue-700 mb-2">16.2 Cálculo dos Custos Mensais Revisados</h3>
                    <p className="mb-4">
                      A seguir, apresentamos os custos mensais estimados para a operação de uma UBS Porte 1, 
                      considerando as necessidades atuais de infraestrutura tecnológica e suporte especializado 
                      para garantir serviços de saúde de qualidade:
                    </p>

                    <div className="overflow-x-auto shadow-md rounded-lg mb-6">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-blue-800 uppercase tracking-wider">Custo Mensal (R$)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td rowSpan={8} className="px-6 py-4 whitespace-nowrap font-medium bg-gray-50">Pessoal</td>
                            <td className="px-6 py-2 whitespace-nowrap">Médico de Família (40h semanais)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">16.000,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Enfermeiro (40h semanais)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">5.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Técnicos de Enfermagem (2 × 40h)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">6.000,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Agentes Comunitários de Saúde (5)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">8.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Dentista (20h semanais)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">5.000,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">ASB/TSB (40h semanais)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">2.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Recepcionista/Administrativo (2)</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">3.600,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Auxiliar de Serviços Gerais</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.500,00</td>
                          </tr>
                          
                          <tr>
                            <td rowSpan={6} className="px-6 py-4 whitespace-nowrap font-medium bg-gray-50">Insumos e Materiais</td>
                            <td className="px-6 py-2 whitespace-nowrap">Medicamentos básicos</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">8.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Material de Consumo Médico</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">4.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Material Odontológico</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">3.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Material de Escritório</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">800,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Material de Limpeza</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">EPIs</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.500,00</td>
                          </tr>
                          
                          <tr>
                            <td rowSpan={5} className="px-6 py-4 whitespace-nowrap font-medium bg-gray-50">Infraestrutura</td>
                            <td className="px-6 py-2 whitespace-nowrap">Manutenção Predial</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">2.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Água, Luz, Telefone, Internet</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">3.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Manutenção de Equipamentos</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.800,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Depreciação de Equipamentos</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Custos Administrativos</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">2.000,00</td>
                          </tr>
                          
                          <tr>
                            <td rowSpan={5} className="px-6 py-4 whitespace-nowrap font-medium bg-gray-50">Tecnologia e Sistemas</td>
                            <td className="px-6 py-2 whitespace-nowrap">Sistema de Gestão de Saúde</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">4.200,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Prontuário Eletrônico</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">2.800,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Suporte Técnico de TI</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">1.500,00</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">Consultoria em Sistemas de Saúde</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right">2.500,00</td>
                          </tr>
                          <tr className="highlight-row bg-blue-50">
                            <td className="px-6 py-2 whitespace-nowrap font-bold">CUSTO TOTAL MENSAL</td>
                            <td className="px-6 py-2 whitespace-nowrap text-right font-bold">90.200,00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-2">Observações Importantes:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-yellow-800">
                        <li>
                          O governo federal repassa aproximadamente R$ 10.695,00 mensais por equipe eSF, 
                          cobrindo apenas cerca de 12% do custo total.
                        </li>
                        <li>
                          Os valores acima são estimativas atualizadas para 2025, considerando o cenário econômico 
                          atual e a necessidade de tecnologias modernas.
                        </li>
                        <li>
                          Existe previsão de aumento do repasse federal para equipes de Saúde da Família para até 
                          R$ 34.000,00 em 2025, o que ainda cobriria apenas 38% dos custos totais.
                        </li>
                        <li>
                          Os custos podem variar conforme especificidades regionais, porte populacional do município 
                          e disponibilidade de profissionais.
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Análise Comparativa de Fontes de Financiamento:</h4>
                      <div className="flex flex-col md:flex-row gap-4 mt-2">
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                          <h5 className="font-medium text-blue-700">Repasse Federal</h5>
                          <p className="text-2xl font-bold text-blue-800">R$ 10.695,00</p>
                          <p className="text-sm text-gray-600">12% do custo total</p>
                        </div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                          <h5 className="font-medium text-blue-700">Complementação Municipal</h5>
                          <p className="text-2xl font-bold text-blue-800">R$ 79.505,00</p>
                          <p className="text-sm text-gray-600">88% do custo total</p>
                        </div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                          <h5 className="font-medium text-blue-700">Previsão Federal 2025</h5>
                          <p className="text-2xl font-bold text-blue-800">R$ 34.000,00</p>
                          <p className="text-sm text-gray-600">38% do custo total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="font-bold text-lg mb-4 text-blue-800">17. ASSINATURAS</h2>
                
                <p className="mb-6">Ibotirama/BA, [Data da Assinatura].</p>
                
                <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0 justify-center mb-6">
                  <div className="text-center">
                    <p className="border-t border-black pt-2">[Nome do Representante da Prefeitura]</p>
                    <p className="text-sm">[Cargo]</p>
                    <p className="text-sm">Prefeitura Municipal de Ibotirama</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="border-t border-black pt-2">[Nome do Representante Legal do Consórcio]</p>
                    <p className="text-sm">[Cargo]</p>
                    <p className="text-sm">[Nome do Consórcio de Saúde Hipotético]</p>
                  </div>
                </div>
                
                <p className="text-sm italic text-center">
                  (Anexar documentos comprobatórios do Consórcio e da Prefeitura, conforme exigido pela legislação)
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <style jsx global>{`
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
      `}</style>
      
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12 print:hidden">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Sistema de Cálculo de Custos - Unidade de Saúde</p>
        </div>
      </footer>
    </div>
  );
};

export default WorkPlan;