
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, TrashIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Training {
  id: string;
  name: string;
  description: string;
  cost: number;
  participants: number;
  hours: number;
}

interface TrainingFormProps {
  trainings: Training[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
}

const TrainingForm = ({ trainings, setTrainings }: TrainingFormProps) => {
  const addTraining = () => {
    const newTraining: Training = {
      id: `training-${Date.now()}`,
      name: 'CAPACITAÇÃO',
      description: '',
      cost: 300, // Default hourly rate of 300
      participants: 1,
      hours: 30, // Default hours of 30
    };
    setTrainings([...trainings, newTraining]);
  };

  const updateTraining = (id: string, field: keyof Training, value: string | number) => {
    setTrainings(
      trainings.map((training) => 
        training.id === id ? { ...training, [field]: value } : training
      )
    );
  };

  const removeTraining = (id: string) => {
    setTrainings(trainings.filter((training) => training.id !== id));
  };

  // New calculation method - cost is now hourly rate
  const calculateTotalCost = () => {
    return trainings.reduce((total, training) => {
      return total + (training.cost * training.hours);
    }, 0);
  };

  return (
    <Card className="border-l-4 border-l-green-600">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Capacitação</span>
          <span className="text-lg font-normal text-green-600">
            Total: R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trainings.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Nenhuma capacitação adicionada
          </div>
        ) : (
          <div className="space-y-6">
            {trainings.map((training) => (
              <div key={training.id} className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${training.id}`}>Nome do Curso/Capacitação</Label>
                    <Input
                      id={`name-${training.id}`}
                      value={training.name}
                      onChange={(e) => updateTraining(training.id, 'name', e.target.value)}
                      placeholder="Ex: Primeiros Socorros"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`cost-${training.id}`}>Valor da Hora/Aula (R$)</Label>
                    <Input
                      id={`cost-${training.id}`}
                      type="number"
                      value={training.cost}
                      onChange={(e) => updateTraining(training.id, 'cost', parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`desc-${training.id}`}>Descrição</Label>
                  <Textarea
                    id={`desc-${training.id}`}
                    value={training.description}
                    onChange={(e) => updateTraining(training.id, 'description', e.target.value)}
                    placeholder="Descrição do treinamento..."
                    className="resize-none"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`participants-${training.id}`}>Número de Participantes</Label>
                    <div className="flex items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => training.participants > 1 && updateTraining(training.id, 'participants', training.participants - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <Input
                        id={`participants-${training.id}`}
                        type="number"
                        value={training.participants}
                        onChange={(e) => updateTraining(training.id, 'participants', parseInt(e.target.value) || 0)}
                        className="mx-2 text-center"
                        min="1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateTraining(training.id, 'participants', training.participants + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`hours-${training.id}`}>Carga Horária</Label>
                    <Input
                      id={`hours-${training.id}`}
                      type="number"
                      value={training.hours}
                      onChange={(e) => updateTraining(training.id, 'hours', parseInt(e.target.value) || 0)}
                      min="1"
                    />
                  </div>
                  
                  <div className="flex items-end justify-center pb-1">
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon"
                      onClick={() => removeTraining(training.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right text-sm font-medium text-green-600">
                  Subtotal: R$ {(training.cost * training.hours).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          type="button" 
          onClick={addTraining} 
          className="mt-4 w-full bg-green-600 hover:bg-green-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Adicionar Capacitação
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingForm;
