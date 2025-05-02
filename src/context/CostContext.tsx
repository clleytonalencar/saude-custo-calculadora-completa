import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Interfaces
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

// Dados iniciais
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

const initialTrainings: Training[] = [
  { id: "train-1", name: "Capacitação e Treinamento Geral", description: "Programas de educação continuada", cost: 8000, participants: 1, hours: 40 },
  { id: "train-2", name: "Treinamento Equipe", description: "Capacitação específica para equipe básica", cost: 1000, participants: 15, hours: 20 },
  { id: "train-3", name: "Treinamento Equipe Multiprofissional", description: "Treinamento especializado", cost: 600, participants: 4, hours: 16 },
  { id: "train-4", name: "Treinamento ACS", description: "Capacitação dos Agentes Comunitários de Saúde", cost: 1000, participants: 11, hours: 24 },
  { id: "train-5", name: "Treinamento Posto de Saúde", description: "Capacitação geral para funcionamento da unidade", cost: 300, participants: 5, hours: 8 },
];

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
    other: 150,
  },
};

// Funções de cálculo
const calculateProfessionalsCost = (professionals: Professional[]) => {
  return professionals.reduce((total, prof) => total + (prof.quantity * prof.salary), 0);
};

const calculateTrainingsCost = (trainings: Training[]) => {
  return trainings.reduce((total, training) => total + (training.cost * training.hours), 0);
};

const calculateSystemsCost = (systemsConsulting: SystemConsulting[]) => {
  return systemsConsulting
    .filter(item => item.category === 'system')
    .reduce((total, item) => total + item.cost, 0);
};

const calculateConsultingCost = (systemsConsulting: SystemConsulting[]) => {
  return systemsConsulting
    .filter(item => item.category === 'consulting')
    .reduce((total, item) => total + item.cost, 0);
};

const calculateInfrastructureCost = (facilityCosts: FacilityCosts) => {
  return Object.values(facilityCosts.infrastructure).reduce((a, b) => a + b, 0);
};

const calculateEquipmentCost = (facilityCosts: FacilityCosts) => {
  return Object.values(facilityCosts.equipment).reduce((a, b) => a + b, 0);
};

const calculateOperationalCost = (facilityCosts: FacilityCosts) => {
  return Object.values(facilityCosts.operational).reduce((a, b) => a + b, 0);
};

const calculateFacilityCost = (facilityCosts: FacilityCosts) => {
  return calculateInfrastructureCost(facilityCosts) + 
         calculateEquipmentCost(facilityCosts) + 
         calculateOperationalCost(facilityCosts);
};

const calculateSystemsConsultingCost = (systemsConsulting: SystemConsulting[]) => {
  return calculateSystemsCost(systemsConsulting) + calculateConsultingCost(systemsConsulting);
};

const calculateTotalCost = (
  professionals: Professional[], 
  trainings: Training[], 
  systemsConsulting: SystemConsulting[], 
  facilityCosts: FacilityCosts
) => {
  return calculateProfessionalsCost(professionals) + 
         calculateTrainingsCost(trainings) + 
         calculateSystemsConsultingCost(systemsConsulting) + 
         calculateFacilityCost(facilityCosts);
};

// Interface do Contexto
interface CostContextType {
  professionals: Professional[];
  trainings: Training[];
  systemsConsulting: SystemConsulting[];
  facilityCosts: FacilityCosts;
  setProfessionals: (professionals: Professional[]) => void;
  setTrainings: (trainings: Training[]) => void;
  setSystemsConsulting: (systemsConsulting: SystemConsulting[]) => void;
  setFacilityCosts: (facilityCosts: FacilityCosts) => void;
  calculateProfessionalsCost: () => number;
  calculateTrainingsCost: () => number;
  calculateSystemsCost: () => number;
  calculateConsultingCost: () => number;
  calculateSystemsConsultingCost: () => number;
  calculateInfrastructureCost: () => number;
  calculateEquipmentCost: () => number;
  calculateOperationalCost: () => number;
  calculateFacilityCost: () => number;
  calculateTotalCost: () => number;
  workPlanTotalMensal: number;
  workPlanTotalAnual: number;
  updateWorkPlanTotals: () => void;
}

// Criação do Contexto
const CostContext = createContext<CostContextType | undefined>(undefined);

// Provider Component
export const CostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Verificar se existem dados salvos no localStorage
  const getSavedData = <T,>(key: string, initialData: T): T => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialData;
  };

  const [professionals, setProfessionals] = useState<Professional[]>(
    getSavedData('professionals', initialProfessionals)
  );
  
  const [trainings, setTrainings] = useState<Training[]>(
    getSavedData('trainings', initialTrainings)
  );
  
  const [systemsConsulting, setSystemsConsulting] = useState<SystemConsulting[]>(
    getSavedData('systemsConsulting', initialSystemsConsulting)
  );
  
  const [facilityCosts, setFacilityCosts] = useState<FacilityCosts>(
    getSavedData('facilityCosts', initialFacilityCosts)
  );

  const [workPlanTotalMensal, setWorkPlanTotalMensal] = useState<number>(
    getSavedData('workPlanTotalMensal', 575950)
  );
  
  const [workPlanTotalAnual, setWorkPlanTotalAnual] = useState<number>(
    getSavedData('workPlanTotalAnual', workPlanTotalMensal * 12)
  );

  // Salvar no localStorage quando os dados mudarem
  useEffect(() => {
    localStorage.setItem('professionals', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);

  useEffect(() => {
    localStorage.setItem('systemsConsulting', JSON.stringify(systemsConsulting));
  }, [systemsConsulting]);

  useEffect(() => {
    localStorage.setItem('facilityCosts', JSON.stringify(facilityCosts));
  }, [facilityCosts]);

  useEffect(() => {
    localStorage.setItem('workPlanTotalMensal', JSON.stringify(workPlanTotalMensal));
    localStorage.setItem('workPlanTotalAnual', JSON.stringify(workPlanTotalAnual));
  }, [workPlanTotalMensal, workPlanTotalAnual]);

  // Funções de cálculo específicas para este component
  const calcProfessionalsCost = () => calculateProfessionalsCost(professionals);
  const calcTrainingsCost = () => calculateTrainingsCost(trainings);
  const calcSystemsCost = () => calculateSystemsCost(systemsConsulting);
  const calcConsultingCost = () => calculateConsultingCost(systemsConsulting);
  const calcSystemsConsultingCost = () => calculateSystemsConsultingCost(systemsConsulting);
  const calcInfrastructureCost = () => calculateInfrastructureCost(facilityCosts);
  const calcEquipmentCost = () => calculateEquipmentCost(facilityCosts);
  const calcOperationalCost = () => calculateOperationalCost(facilityCosts);
  const calcFacilityCost = () => calculateFacilityCost(facilityCosts);
  const calcTotalCost = () => calculateTotalCost(professionals, trainings, systemsConsulting, facilityCosts);

  // Atualizar o total do plano de trabalho
  const updateWorkPlanTotals = () => {
    const total = calcTotalCost();
    setWorkPlanTotalMensal(total);
    setWorkPlanTotalAnual(total * 12);
  };

  return (
    <CostContext.Provider
      value={{
        professionals,
        trainings,
        systemsConsulting,
        facilityCosts,
        setProfessionals,
        setTrainings,
        setSystemsConsulting,
        setFacilityCosts,
        calculateProfessionalsCost: calcProfessionalsCost,
        calculateTrainingsCost: calcTrainingsCost,
        calculateSystemsCost: calcSystemsCost,
        calculateConsultingCost: calcConsultingCost,
        calculateSystemsConsultingCost: calcSystemsConsultingCost,
        calculateInfrastructureCost: calcInfrastructureCost,
        calculateEquipmentCost: calcEquipmentCost,
        calculateOperationalCost: calcOperationalCost,
        calculateFacilityCost: calcFacilityCost,
        calculateTotalCost: calcTotalCost,
        workPlanTotalMensal,
        workPlanTotalAnual,
        updateWorkPlanTotals,
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useCostContext = () => {
  const context = useContext(CostContext);
  if (context === undefined) {
    throw new Error('useCostContext must be used within a CostProvider');
  }
  return context;
};