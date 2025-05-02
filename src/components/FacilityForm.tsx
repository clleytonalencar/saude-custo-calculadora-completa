
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface FacilityFormProps {
  facilityCosts: FacilityCosts;
  setFacilityCosts: React.Dispatch<React.SetStateAction<FacilityCosts>>;
}

const FacilityForm = ({ facilityCosts, setFacilityCosts }: FacilityFormProps) => {
  const updateInfrastructureCost = (field: keyof typeof facilityCosts.infrastructure, value: number) => {
    setFacilityCosts({
      ...facilityCosts,
      infrastructure: {
        ...facilityCosts.infrastructure,
        [field]: value
      }
    });
  };

  const updateEquipmentCost = (field: keyof typeof facilityCosts.equipment, value: number) => {
    setFacilityCosts({
      ...facilityCosts,
      equipment: {
        ...facilityCosts.equipment,
        [field]: value
      }
    });
  };

  const updateOperationalCost = (field: keyof typeof facilityCosts.operational, value: number) => {
    setFacilityCosts({
      ...facilityCosts,
      operational: {
        ...facilityCosts.operational,
        [field]: value
      }
    });
  };

  const calculateTotalCost = () => {
    const infrastructureTotal = Object.values(facilityCosts.infrastructure).reduce((a, b) => a + b, 0);
    const equipmentTotal = Object.values(facilityCosts.equipment).reduce((a, b) => a + b, 0);
    const operationalTotal = Object.values(facilityCosts.operational).reduce((a, b) => a + b, 0);
    
    return infrastructureTotal + equipmentTotal + operationalTotal;
  };

  return (
    <Card className="border-l-4 border-l-purple-600">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Instalações e Operação</span>
          <span className="text-lg font-normal text-purple-600">
            Total: R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="infrastructure">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
            <TabsTrigger value="equipment">Equipamentos</TabsTrigger>
            <TabsTrigger value="operational">Operacionais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="infrastructure" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rent">Aluguel/Imóvel (R$)</Label>
                <Input
                  id="rent"
                  type="number"
                  value={facilityCosts.infrastructure.rent}
                  onChange={(e) => updateInfrastructureCost('rent', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="utilities">Utilidades (água, luz, etc.)</Label>
                <Input
                  id="utilities"
                  type="number"
                  value={facilityCosts.infrastructure.utilities}
                  onChange={(e) => updateInfrastructureCost('utilities', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="maintenance">Manutenção</Label>
                <Input
                  id="maintenance"
                  type="number"
                  value={facilityCosts.infrastructure.maintenance}
                  onChange={(e) => updateInfrastructureCost('maintenance', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
            </div>
            
            <div className="text-right text-sm font-medium text-purple-600">
              Subtotal: R$ {Object.values(facilityCosts.infrastructure).reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </TabsContent>
          
          <TabsContent value="equipment" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="medical">Equipamentos Médicos</Label>
                <Input
                  id="medical"
                  type="number"
                  value={facilityCosts.equipment.medical}
                  onChange={(e) => updateEquipmentCost('medical', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="office">Material de Escritório</Label>
                <Input
                  id="office"
                  type="number"
                  value={facilityCosts.equipment.office}
                  onChange={(e) => updateEquipmentCost('office', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="technology">Tecnologia</Label>
                <Input
                  id="technology"
                  type="number"
                  value={facilityCosts.equipment.technology}
                  onChange={(e) => updateEquipmentCost('technology', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
            </div>
            
            <div className="text-right text-sm font-medium text-purple-600">
              Subtotal: R$ {Object.values(facilityCosts.equipment).reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </TabsContent>
          
          <TabsContent value="operational" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="supplies">Suprimentos</Label>
                <Input
                  id="supplies"
                  type="number"
                  value={facilityCosts.operational.supplies}
                  onChange={(e) => updateOperationalCost('supplies', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="insurance">Seguros</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={facilityCosts.operational.insurance}
                  onChange={(e) => updateOperationalCost('insurance', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="other">Outros Custos</Label>
                <Input
                  id="other"
                  type="number"
                  value={facilityCosts.operational.other}
                  onChange={(e) => updateOperationalCost('other', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                  min="0"
                />
              </div>
            </div>
            
            <div className="text-right text-sm font-medium text-purple-600">
              Subtotal: R$ {Object.values(facilityCosts.operational).reduce((a, b) => a + b, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FacilityForm;
