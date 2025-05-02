import React from 'react';
import Header from '@/components/Header';
import ProfessionalsForm from '@/components/ProfessionalsForm';
import TrainingForm from '@/components/TrainingForm';
import FacilityForm from '@/components/FacilityForm';
import SystemsConsultingForm from '@/components/SystemsConsultingForm';
import CostSummary from '@/components/CostSummary';
import ReportModal from '@/components/ReportModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCostContext } from '@/context/CostContext';

const Index = () => {
  const {
    professionals, setProfessionals,
    trainings, setTrainings,
    systemsConsulting, setSystemsConsulting,
    facilityCosts, setFacilityCosts,
    updateWorkPlanTotals
  } = useCostContext();
  
  const [reportOpen, setReportOpen] = React.useState(false);

  const handleGenerateReport = () => {
    // Atualiza os totais do plano de trabalho antes de gerar o relatório
    updateWorkPlanTotals();
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
            <CostSummary onGenerateReport={handleGenerateReport} />
          </div>
        </div>
      </main>
      
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
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
