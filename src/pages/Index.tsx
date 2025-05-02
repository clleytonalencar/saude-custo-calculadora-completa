
import React, { useState } from 'react';
import Header from '@/components/Header';
import ProfessionalsForm from '@/components/ProfessionalsForm';
import TrainingForm from '@/components/TrainingForm';
import FacilityForm from '@/components/FacilityForm';
import SystemsConsultingForm from '@/components/SystemsConsultingForm';
import CostSummary from '@/components/CostSummary';
import ReportModal from '@/components/ReportModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Professional {
  id: string;
  type: string;
  quantity: number;
  salary: number;
  workHours: number;
}

interface Training {
  id: string;
  name: string;
  description: string;
  cost: number;
  participants: number;
  hours: number;
}

interface SystemConsulting {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'system' | 'consulting';
}

interface FacilityCosts {
  infrastructure: {
    rent: number;
    utilities: number;
    maintenance: number;
  };
  equipment: {
    medical: number;
    office: number;
    technology: number;
  };
  operational: {
    supplies: number;
    insurance: number;
    other: number;
  };
}

const Index = () => {
  // Dados organizados por categoria conforme a tabela
  const initialProfessionals: Professional[] = [
    { id: "prof-1", type: "Médico (PSF - 40h)", quantity: 11, salary: 15000, workHours: 40 },
    { id: "prof-2", type: "Enfermeiro (40h)", quantity: 2, salary: 3000, workHours: 40 },
    { id: "prof-3", type: "Técnico de Enfermagem (40h)", quantity: 10, salary: 3500, workHours: 40 },
    { id: "prof-4", type: "Recepcionista (40h)", quantity: 24, salary: 2200, workHours: 40 },
    { id: "prof-5", type: "Vigilante (12h/dia - escala)", quantity: 11, salary: 2000, workHours: 12 },
    { id: "prof-6", type: "Porteiro (40h)", quantity: 11, salary: 1800, workHours: 40 },
    { id: "prof-7", type: "Agente de Serviços Gerais (40h)", quantity: 11, salary: 1800, workHours: 40 },
    { id: "prof-8", type: "Equipe de Saúde da Família", quantity: 1, salary: 30000, workHours: 40 },
    { id: "prof-9", type: "Equipe de Saúde Bucal (Cirurgião-dentista e Auxiliar)", quantity: 1, salary: 10000, workHours: 40 },
  ];

  // Dados de treinamentos organizados
  const initialTrainings: Training[] = [
    { id: "train-1", name: "Capacitação e Treinamento Geral", description: "Programas de educação continuada", cost: 8000, participants: 1, hours: 40 },
    { id: "train-2", name: "Treinamento Equipe", description: "Capacitação específica para equipe básica", cost: 1000, participants: 15, hours: 20 },
    { id: "train-3", name: "Treinamento Equipe Multiprofissional", description: "Treinamento especializado", cost: 600, participants: 4, hours: 16 },
    { id: "train-4", name: "Treinamento ACS", description: "Capacitação dos Agentes Comunitários de Saúde", cost: 1000, participants: 11, hours: 24 },
    { id: "train-5", name: "Treinamento Posto de Saúde", description: "Capacitação geral para funcionamento da unidade", cost: 300, participants: 5, hours: 8 },
  ];

  // Dados de sistemas e consultorias organizados
  const initialSystemsConsulting: SystemConsulting[] = [
    // Sistemas
    { id: "sys-1", name: "Prontuário eletrônico", description: "Sistema para 17 unidades", cost: 10200, category: "system" },
    { id: "sys-2", name: "Sistema de Gestão de Dados", description: "Sistema para 17 unidades", cost: 11900, category: "system" },
    { id: "sys-3", name: "Ponto eletrônico facial", description: "Sistema para 25 unidades", cost: 10000, category: "system" },
    { id: "sys-4", name: "Sistema PEC (Prontuário Eletrônico do Cidadão)", description: "Integrado ao e-SUS AB", cost: 2500, category: "system" },
    { id: "sys-5", name: "Sistema de Inteligência de BI", description: "Ferramentas analíticas", cost: 3000, category: "system" },
    { id: "sys-6", name: "Servidor em Nuvem", description: "Infraestrutura de dados", cost: 1200, category: "system" },
    { id: "sys-7", name: "Ponto Eletrônico via Reconhecimento Facial", description: "Sistema de controle de presença", cost: 500, category: "system" },
    { id: "sys-8", name: "Sistema de Georreferenciamento", description: "Monitoramento territorial", cost: 1200, category: "system" },
    { id: "sys-9", name: "Sistema de Controle de Dispositivos Móveis", description: "Gestão de dispositivos", cost: 900, category: "system" },
    { id: "sys-10", name: "Sistema de Telemedicina Integrado", description: "Plataforma para consultas virtuais", cost: 2800, category: "system" },
    { id: "sys-11", name: "Sistema de Monitoramento de Indicadores", description: "Acompanhamento em tempo real", cost: 1800, category: "system" },
    { id: "sys-12", name: "Sistema de Gestão de Estoque e Medicamentos", description: "Controle de insumos", cost: 1500, category: "system" },
    { id: "sys-13", name: "Sistema de Agendamento e Regulação", description: "Otimização de fluxo", cost: 1200, category: "system" },
    { id: "sys-14", name: "Sistema de Comunicação Interna e Externa", description: "Comunicação com usuários", cost: 1000, category: "system" },
    { id: "sys-15", name: "Sistema de Gestão de Protocolos Clínicos", description: "Diretrizes terapêuticas", cost: 1200, category: "system" },
    { id: "sys-16", name: "Sistema de Satisfação do Usuário", description: "Monitoramento de qualidade", cost: 1400, category: "system" },
    { id: "sys-17", name: "Sistema de Gestão de Vigilância em Saúde", description: "Ações integradas", cost: 1800, category: "system" },
    { id: "sys-18", name: "Suporte Técnico Online e Presencial", description: "Atendimento técnico", cost: 1800, category: "system" },
    // Consultorias
    { id: "cons-1", name: "Consultoria", description: "Consultoria geral para 11 unidades", cost: 13200, category: "consulting" },
    { id: "cons-2", name: "Consultoria para Gestão da Atenção Básica", description: "Assessoria especializada", cost: 3800, category: "consulting" },
    { id: "cons-3", name: "Consultoria para Profissionais de Saúde", description: "Suporte técnico", cost: 2200, category: "consulting" },
    { id: "cons-4", name: "Relatórios Mensais de Atividades", description: "Geração de análises", cost: 2200, category: "consulting" },
    { id: "cons-5", name: "Consultoria para Captação de Recursos", description: "Otimização de financiamentos", cost: 3800, category: "consulting" },
    { id: "cons-6", name: "Consultoria para CNES", description: "Suporte para regularização", cost: 2200, category: "consulting" },
    { id: "cons-7", name: "Consultoria para Integração de Sistemas", description: "Interoperabilidade", cost: 4200, category: "consulting" },
  ];

  // Dados para instalações e operação
  const initialFacilityCosts: FacilityCosts = {
    infrastructure: {
      rent: 15000,
      utilities: 8000,
      maintenance: 5000,
    },
    equipment: {
      medical: 25000,
      office: 12000,
      technology: 0, // Valor zerado pois os sistemas estão em categoria própria
    },
    operational: {
      supplies: 20000,
      insurance: 5000,
      other: 150, // Item "Outro" da tabela
    },
  };

  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings);
  const [systemsConsulting, setSystemsConsulting] = useState<SystemConsulting[]>(initialSystemsConsulting);
  const [facilityCosts, setFacilityCosts] = useState<FacilityCosts>(initialFacilityCosts);
  const [reportOpen, setReportOpen] = useState(false);

  const handleGenerateReport = () => {
    setReportOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Calculadora de Custos</h2>
            <p className="text-gray-600 mb-6">
              Preencha os campos abaixo para calcular os custos da sua unidade de saúde.
              Os resultados serão exibidos no resumo e você poderá gerar um relatório detalhado.
            </p>
            
            <Tabs defaultValue="professionals" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full">
                <TabsTrigger value="professionals">Profissionais</TabsTrigger>
                <TabsTrigger value="trainings">Capacitação</TabsTrigger>
                <TabsTrigger value="systems">Sistemas e Consultorias</TabsTrigger>
                <TabsTrigger value="facility">Instalações e Operação</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="professionals">
                  <ProfessionalsForm
                    professionals={professionals}
                    setProfessionals={setProfessionals}
                  />
                </TabsContent>
                <TabsContent value="trainings">
                  <TrainingForm
                    trainings={trainings}
                    setTrainings={setTrainings}
                  />
                </TabsContent>
                <TabsContent value="systems">
                  <SystemsConsultingForm
                    systemsConsulting={systemsConsulting}
                    setSystemsConsulting={setSystemsConsulting}
                  />
                </TabsContent>
                <TabsContent value="facility">
                  <FacilityForm
                    facilityCosts={facilityCosts}
                    setFacilityCosts={setFacilityCosts}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Resumo dos Custos</h2>
            <CostSummary
              professionals={professionals}
              trainings={trainings}
              systemsConsulting={systemsConsulting}
              facilityCosts={facilityCosts}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        </div>
      </main>
      
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        professionals={professionals}
        trainings={trainings}
        systemsConsulting={systemsConsulting}
        facilityCosts={facilityCosts}
      />
      
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Sistema de Cálculo de Custos - Unidade de Saúde</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
