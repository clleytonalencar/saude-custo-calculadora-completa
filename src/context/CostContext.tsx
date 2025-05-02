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

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  cost: number;
}

export interface FacilityCosts {
  infrastructure: FacilityItem[];
  equipment: FacilityItem[];
  operational: FacilityItem[];
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

// Updated initialTrainings with default values as requested
const initialTrainings: Training[] = [
  { id: "train-1", name: "CAPACITAÇÃO", description: "", cost: 300, participants: 1, hours: 30 }
];

const initialSystemsConsulting: SystemConsulting[] = [
  // Systems
  { id: "sys-1", name: "SISTEMAS", description: "", cost: 14000, category: "system" },
  // Consulting
  { id: "cons-1", name: "CONSULTORIA", description: "", cost: 10000, category: "consulting" },
];

const initialFacilityCosts: FacilityCosts = {
  infrastructure: [
    { id: "infra-1", name: "Aluguel/Imóvel", description: "Custo mensal de aluguel", cost: 0 },
    { id: "infra-2", name: "Utilidades (água, luz, etc.)", description: "Custo de água, energia e internet", cost: 0 },
    { id: "infra-3", name: "Manutenção", description: "Custo de manutenção predial", cost: 0 },
  ],
  equipment: [
    { id: "equip-1", name: "Equipamentos Médicos", description: "Custo de equipamentos médicos", cost: 0 },
    { id: "equip-2", name: "Material de Escritório", description: "Custo de equipamentos de escritório", cost: 0 },
    { id: "equip-3", name: "Tecnologia", description: "Custo de equipamentos tecnológicos", cost: 0 },
  ],
  operational: [
    { id: "oper-1", name: "Suprimentos", description: "Custo de suprimentos operacionais", cost: 0 },
    { id: "oper-2", name: "Seguros", description: "Custo de seguro", cost: 0 },
    { id: "oper-3", name: "Outros Custos", description: "Outros custos operacionais", cost: 0 },
  ],
};

// Funções de cálculo
const calculateProfessionalsCost = (professionals: Professional[]) => {
  return professionals.reduce((total, prof) => total + (prof.quantity * prof.salary), 0);
};

// Updated calculation for trainings - now uses cost (hourly rate) * hours
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
  return facilityCosts.infrastructure.reduce((total, item) => total + item.cost, 0);
};

const calculateEquipmentCost = (facilityCosts: FacilityCosts) => {
  return facilityCosts.equipment.reduce((total, item) => total + item.cost, 0);
};

const calculateOperationalCost = (facilityCosts: FacilityCosts) => {
  return facilityCosts.operational.reduce((total, item) => total + item.cost, 0);
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
    if (!saved) return initialData;
    
    try {
      const parsedData = JSON.parse(saved);
      
      // Migração de dados antigos para o novo formato (específico para facilityCosts)
      if (key === 'facilityCosts') {
        const oldData = parsedData as any;
        
        // Verificação mais segura para o formato antigo
        if (
          oldData && 
          typeof oldData === 'object' && 
          oldData.infrastructure && 
          !Array.isArray(oldData.infrastructure)
        ) {
          // Valores padrão para garantir que não ocorram erros
          const newFormat: FacilityCosts = {
            infrastructure: [
              { 
                id: "infra-1", 
                name: "Aluguel", 
                description: "Custo mensal de aluguel", 
                cost: oldData.infrastructure && typeof oldData.infrastructure.rent === 'number' 
                  ? oldData.infrastructure.rent 
                  : 0 
              },
              { 
                id: "infra-2", 
                name: "Utilidades", 
                description: "Custo de água, energia e internet", 
                cost: oldData.infrastructure && typeof oldData.infrastructure.utilities === 'number' 
                  ? oldData.infrastructure.utilities 
                  : 0 
              },
              { 
                id: "infra-3", 
                name: "Manutenção", 
                description: "Custo de manutenção predial", 
                cost: oldData.infrastructure && typeof oldData.infrastructure.maintenance === 'number' 
                  ? oldData.infrastructure.maintenance 
                  : 0 
              }
            ],
            equipment: [
              { 
                id: "equip-1", 
                name: "Equipamentos médicos", 
                description: "Custo de equipamentos médicos", 
                cost: oldData.equipment && typeof oldData.equipment.medical === 'number' 
                  ? oldData.equipment.medical 
                  : 0 
              },
              { 
                id: "equip-2", 
                name: "Equipamentos de escritório", 
                description: "Custo de equipamentos de escritório", 
                cost: oldData.equipment && typeof oldData.equipment.office === 'number' 
                  ? oldData.equipment.office 
                  : 0 
              },
              { 
                id: "equip-3", 
                name: "Tecnologia", 
                description: "Custo de equipamentos tecnológicos", 
                cost: oldData.equipment && typeof oldData.equipment.technology === 'number' 
                  ? oldData.equipment.technology 
                  : 0 
              }
            ],
            operational: [
              { 
                id: "oper-1", 
                name: "Suprimentos", 
                description: "Custo de suprimentos operacionais", 
                cost: oldData.operational && typeof oldData.operational.supplies === 'number' 
                  ? oldData.operational.supplies 
                  : 0 
              },
              { 
                id: "oper-2", 
                name: "Seguro", 
                description: "Custo de seguro", 
                cost: oldData.operational && typeof oldData.operational.insurance === 'number' 
                  ? oldData.operational.insurance 
                  : 0 
              },
              { 
                id: "oper-3", 
                name: "Outros", 
                description: "Outros custos operacionais", 
                cost: oldData.operational && typeof oldData.operational.other === 'number' 
                  ? oldData.operational.other 
                  : 0 
              }
            ]
          };
          
          // Atualiza o localStorage com o novo formato
          localStorage.setItem(key, JSON.stringify(newFormat));
          return newFormat as unknown as T;
        }
        
        // Verificar se os dados estão no formato correto esperado
        if (
          !Array.isArray(oldData.infrastructure) || 
          !Array.isArray(oldData.equipment) || 
          !Array.isArray(oldData.operational)
        ) {
          console.error('Formato inválido de facilityCosts no localStorage, restaurando padrões');
          localStorage.setItem(key, JSON.stringify(initialData));
          return initialData;
        }
        
        // Caso já esteja no formato correto
        return parsedData;
      }
      
      return parsedData;
    } catch (error) {
      console.error(`Erro ao carregar dados do localStorage (${key}):`, error);
      // Em caso de erro, removemos os dados corrompidos e usamos os iniciais
      localStorage.removeItem(key);
      return initialData;
    }
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
    getSavedData('workPlanTotalMensal', 65108)  // Updated with the value you provided
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
