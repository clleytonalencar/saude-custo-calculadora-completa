
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SystemConsulting {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'system' | 'consulting'; // system or consulting
}

interface SystemsConsultingFormProps {
  systemsConsulting: SystemConsulting[];
  setSystemsConsulting: React.Dispatch<React.SetStateAction<SystemConsulting[]>>;
}

const SystemsConsultingForm = ({ systemsConsulting, setSystemsConsulting }: SystemsConsultingFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState<number>(0);
  const [category, setCategory] = useState<'system' | 'consulting'>('system');
  
  const handleAddItem = () => {
    if (name && cost > 0) {
      const newItem: SystemConsulting = {
        id: `sc-${Date.now()}`,
        name,
        description,
        cost,
        category
      };
      
      setSystemsConsulting([...systemsConsulting, newItem]);
      
      // Reset form
      setName('');
      setDescription('');
      setCost(0);
    }
  };
  
  const handleDeleteItem = (id: string) => {
    setSystemsConsulting(systemsConsulting.filter(item => item.id !== id));
  };
  
  // Calculate subtotals
  const calculateSystemsTotal = () => {
    return systemsConsulting
      .filter(item => item.category === 'system')
      .reduce((total, item) => total + item.cost, 0);
  };
  
  const calculateConsultingTotal = () => {
    return systemsConsulting
      .filter(item => item.category === 'consulting')
      .reduce((total, item) => total + item.cost, 0);
  };
  
  const calculateTotal = () => {
    return systemsConsulting.reduce((total, item) => total + item.cost, 0);
  };
  
  const systemsItems = systemsConsulting.filter(item => item.category === 'system');
  const consultingItems = systemsConsulting.filter(item => item.category === 'consulting');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistemas e Consultorias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nome
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do sistema ou consultoria"
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Categoria
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'system' | 'consulting')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="system">Sistema</option>
                <option value="consulting">Consultoria</option>
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1" htmlFor="cost">
                Custo (R$)
              </label>
              <Input
                id="cost"
                type="number"
                value={cost || ''}
                onChange={(e) => setCost(Number(e.target.value))}
                placeholder="0,00"
              />
            </div>
            
            <div className="md:col-span-1 flex items-end">
              <Button onClick={handleAddItem} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Descrição
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve do sistema ou serviço de consultoria"
            />
          </div>
          
          <Accordion type="single" collapsible defaultValue="systems">
            <AccordionItem value="systems">
              <AccordionTrigger>
                <span className="text-blue-600">Sistemas ({systemsItems.length})</span>
              </AccordionTrigger>
              <AccordionContent>
                {systemsItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Custo (R$)</TableHead>
                        <TableHead className="w-16"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemsItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-sm text-gray-500">{item.description}</TableCell>
                          <TableCell className="text-right">{item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-blue-50">
                        <TableCell colSpan={2} className="font-bold text-right">
                          Subtotal Sistemas:
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          R$ {calculateSystemsTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 italic text-center py-4">Nenhum sistema adicionado</p>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="consulting">
              <AccordionTrigger>
                <span className="text-purple-600">Consultorias ({consultingItems.length})</span>
              </AccordionTrigger>
              <AccordionContent>
                {consultingItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Custo (R$)</TableHead>
                        <TableHead className="w-16"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultingItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-sm text-gray-500">{item.description}</TableCell>
                          <TableCell className="text-right">{item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-purple-50">
                        <TableCell colSpan={2} className="font-bold text-right">
                          Subtotal Consultorias:
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          R$ {calculateConsultingTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 italic text-center py-4">Nenhuma consultoria adicionada</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {systemsConsulting.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg text-right">
              <span className="font-bold text-lg">
                Total: R$ {calculateTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemsConsultingForm;
