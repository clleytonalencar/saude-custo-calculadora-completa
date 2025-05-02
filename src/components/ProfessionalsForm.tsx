
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react";

interface Professional {
  id: string;
  type: string;
  quantity: number;
  salary: number;
  workHours: number;
}

interface ProfessionalsFormProps {
  professionals: Professional[];
  setProfessionals: React.Dispatch<React.SetStateAction<Professional[]>>;
}

const ProfessionalsForm = ({ professionals, setProfessionals }: ProfessionalsFormProps) => {
  const addProfessional = () => {
    const newProfessional: Professional = {
      id: `prof-${Date.now()}`,
      type: '',
      quantity: 1,
      salary: 0,
      workHours: 40,
    };
    setProfessionals([...professionals, newProfessional]);
  };

  const updateProfessional = (id: string, field: keyof Professional, value: string | number) => {
    setProfessionals(
      professionals.map((prof) => 
        prof.id === id ? { ...prof, [field]: value } : prof
      )
    );
  };

  const removeProfessional = (id: string) => {
    setProfessionals(professionals.filter((prof) => prof.id !== id));
  };

  const calculateTotalCost = () => {
    return professionals.reduce((total, prof) => {
      return total + (prof.quantity * prof.salary);
    }, 0);
  };

  return (
    <Card className="border-l-4 border-l-blue-600">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Profissionais</span>
          <span className="text-lg font-normal text-blue-600">
            Total: R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {professionals.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Nenhum profissional adicionado
          </div>
        ) : (
          <div className="space-y-4">
            {professionals.map((prof) => (
              <div key={prof.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-gray-50">
                <div>
                  <Label htmlFor={`type-${prof.id}`}>Tipo</Label>
                  <Input
                    id={`type-${prof.id}`}
                    value={prof.type}
                    onChange={(e) => updateProfessional(prof.id, 'type', e.target.value)}
                    placeholder="Ex: Médico, Enfermeiro"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`quantity-${prof.id}`}>Quantidade</Label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => prof.quantity > 1 && updateProfessional(prof.id, 'quantity', prof.quantity - 1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      id={`quantity-${prof.id}`}
                      type="number"
                      value={prof.quantity}
                      onChange={(e) => updateProfessional(prof.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="mx-2 text-center"
                      min="1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => updateProfessional(prof.id, 'quantity', prof.quantity + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`salary-${prof.id}`}>Salário (R$)</Label>
                  <Input
                    id={`salary-${prof.id}`}
                    type="number"
                    value={prof.salary}
                    onChange={(e) => updateProfessional(prof.id, 'salary', parseFloat(e.target.value) || 0)}
                    placeholder="0,00"
                    min="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`hours-${prof.id}`}>Horas Semanais</Label>
                  <Input
                    id={`hours-${prof.id}`}
                    type="number"
                    value={prof.workHours}
                    onChange={(e) => updateProfessional(prof.id, 'workHours', parseInt(e.target.value) || 0)}
                    min="1"
                    max="168"
                  />
                </div>
                
                <div className="flex items-end justify-center pb-1">
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => removeProfessional(prof.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          type="button" 
          onClick={addProfessional} 
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Adicionar Profissional
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfessionalsForm;
