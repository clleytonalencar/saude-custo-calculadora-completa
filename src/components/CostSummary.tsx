
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FileIcon, UsersIcon, BookOpen, MonitorIcon, Briefcase } from "lucide-react";

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

interface CostSummaryProps {
  professionals: Professional[];
  trainings: Training[];
  systemsConsulting: SystemConsulting[];
  facilityCosts: FacilityCosts;
  onGenerateReport: () => void;
}

const CostSummary = ({ professionals, trainings, systemsConsulting, facilityCosts, onGenerateReport }: CostSummaryProps) => {
  const calculateProfessionalsCost = () => {
    return professionals.reduce((total, prof) => total + (prof.quantity * prof.salary), 0);
  };

  const calculateTrainingsCost = () => {
    return trainings.reduce((total, training) => total + (training.cost * training.participants), 0);
  };

  const calculateSystemsCost = () => {
    return systemsConsulting
      .filter(item => item.category === 'system')
      .reduce((total, item) => total + item.cost, 0);
  };

  const calculateConsultingCost = () => {
    return systemsConsulting
      .filter(item => item.category === 'consulting')
      .reduce((total, item) => total + item.cost, 0);
  };

  const calculateSystemsConsultingCost = () => {
    return calculateSystemsCost() + calculateConsultingCost();
  };

  const calculateFacilityCost = () => {
    const infrastructureTotal = Object.values(facilityCosts.infrastructure).reduce((a, b) => a + b, 0);
    const equipmentTotal = Object.values(facilityCosts.equipment).reduce((a, b) => a + b, 0);
    const operationalTotal = Object.values(facilityCosts.operational).reduce((a, b) => a + b, 0);
    
    return infrastructureTotal + equipmentTotal + operationalTotal;
  };

  const calculateTotalCost = () => {
    return calculateProfessionalsCost() + calculateTrainingsCost() + calculateSystemsConsultingCost() + calculateFacilityCost();
  };

  const chartData = [
    { name: 'Profissionais', value: calculateProfessionalsCost() },
    { name: 'Capacitação', value: calculateTrainingsCost() },
    { name: 'Sistemas', value: calculateSystemsCost() },
    { name: 'Consultorias', value: calculateConsultingCost() },
    { name: 'Instalações', value: calculateFacilityCost() },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#6B7280'];

  return (
    <Card className="border-l-4 border-l-gray-600">
      <CardHeader>
        <CardTitle>Resumo de Custos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-blue-600 flex items-center">
                <UsersIcon className="h-5 w-5 mr-2" />
                Profissionais
              </h3>
              <p className="text-2xl font-bold">
                R$ {calculateProfessionalsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                {professionals.length} tipo(s) de profissionais
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-green-600 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Capacitação
              </h3>
              <p className="text-2xl font-bold">
                R$ {calculateTrainingsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                {trainings.length} treinamento(s)
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-purple-600 flex items-center">
                <MonitorIcon className="h-5 w-5 mr-2" />
                Sistemas
              </h3>
              <p className="text-2xl font-bold">
                R$ {calculateSystemsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                {systemsConsulting.filter(item => item.category === 'system').length} sistema(s)
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-amber-600 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Consultorias
              </h3>
              <p className="text-2xl font-bold">
                R$ {calculateConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                {systemsConsulting.filter(item => item.category === 'consulting').length} consultoria(s)
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-600 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Instalações e Operação
              </h3>
              <p className="text-2xl font-bold">
                R$ {calculateFacilityCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                Infraestrutura, Equipamentos e Operação
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg">
              <h3 className="font-medium">Custo Total</h3>
              <p className="text-3xl font-bold">
                R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <Button 
              onClick={onGenerateReport} 
              className="w-full bg-gray-800 hover:bg-gray-700"
              disabled={calculateTotalCost() === 0}
            >
              <FileIcon className="h-4 w-4 mr-2" />
              Gerar Relatório Completo
            </Button>
          </div>
          
          <div className="h-80">
            {calculateTotalCost() > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      "Valor"
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-center">
                <div>
                  <p className="mb-2">Adicione custos para visualizar o gráfico</p>
                  <p className="text-sm">O gráfico mostrará a distribuição percentual dos custos</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostSummary;
