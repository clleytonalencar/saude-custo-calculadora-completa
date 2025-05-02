import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit2, Plus, RefreshCw } from "lucide-react";
import { FacilityItem, FacilityCosts } from '@/context/CostContext';

interface FacilityFormProps {
  facilityCosts: FacilityCosts;
  setFacilityCosts: React.Dispatch<React.SetStateAction<FacilityCosts>>;
}

const FacilityForm = ({ facilityCosts, setFacilityCosts }: FacilityFormProps) => {
  // Verificação de segurança para garantir que facilityCosts tenha estrutura correta
  React.useEffect(() => {
    try {
      if (!facilityCosts) {
        console.error("facilityCosts é undefined/null");
        return;
      }

      // Verificar se as propriedades necessárias existem
      const requiredProperties = ['infrastructure', 'equipment', 'operational'];
      const missingProperties = requiredProperties.filter(prop => !facilityCosts[prop as keyof FacilityCosts]);
      
      if (missingProperties.length > 0) {
        console.error(`Propriedades ausentes em facilityCosts: ${missingProperties.join(', ')}`);
        
        // Corrigir a estrutura
        const fixedData = {
          ...(facilityCosts || {}),
          infrastructure: Array.isArray(facilityCosts?.infrastructure) ? facilityCosts.infrastructure : [],
          equipment: Array.isArray(facilityCosts?.equipment) ? facilityCosts.equipment : [],
          operational: Array.isArray(facilityCosts?.operational) ? facilityCosts.operational : []
        };
        
        setFacilityCosts(fixedData as FacilityCosts);
      }
    } catch (err) {
      console.error("Erro ao verificar facilityCosts:", err);
    }
  }, [facilityCosts, setFacilityCosts]);

  const [activeTab, setActiveTab] = useState<"infrastructure" | "equipment" | "operational">("infrastructure");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FacilityItem | null>(null);
  const [newItem, setNewItem] = useState<FacilityItem>({
    id: '',
    name: '',
    description: '',
    cost: 0
  });

  // Função segura de cálculo
  const calculateCategoryTotal = (category: keyof FacilityCosts) => {
    try {
      const items = facilityCosts[category];
      if (!Array.isArray(items)) {
        console.error(`A categoria ${category} não é um array`);
        return 0;
      }
      return items.reduce((total, item) => {
        const cost = typeof item.cost === 'number' ? item.cost : 0;
        return total + cost;
      }, 0);
    } catch (err) {
      console.error(`Erro ao calcular total da categoria ${category}:`, err);
      return 0;
    }
  };

  const calculateTotalCost = () => {
    try {
      return (
        calculateCategoryTotal('infrastructure') +
        calculateCategoryTotal('equipment') +
        calculateCategoryTotal('operational')
      );
    } catch (err) {
      console.error("Erro ao calcular custo total:", err);
      return 0;
    }
  };

  const handleAddItem = () => {
    try {
      if (!newItem.name) return;

      const item: FacilityItem = {
        ...newItem,
        id: editingItem ? editingItem.id : `${activeTab}-${Date.now()}`,
      };

      if (editingItem) {
        // Editar item existente
        setFacilityCosts((prev) => {
          if (!prev || !prev[activeTab]) {
            console.error("Estado inválido ao editar item");
            return prev;
          }
          return {
            ...prev,
            [activeTab]: prev[activeTab].map((i) => (i.id === item.id ? item : i)),
          };
        });
      } else {
        // Adicionar novo item
        setFacilityCosts((prev) => {
          if (!prev || !Array.isArray(prev[activeTab])) {
            console.error("Estado inválido ao adicionar item");
            return prev;
          }
          return {
            ...prev,
            [activeTab]: [...prev[activeTab], item],
          };
        });
      }

      // Resetar o formulário
      setNewItem({ id: '', name: '', description: '', cost: 0 });
      setEditingItem(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar/editar item:", err);
    }
  };

  const handleDeleteItem = (id: string) => {
    try {
      setFacilityCosts((prev) => {
        if (!prev || !Array.isArray(prev[activeTab])) {
          console.error("Estado inválido ao excluir item");
          return prev;
        }
        return {
          ...prev,
          [activeTab]: prev[activeTab].filter((item) => item.id !== id),
        };
      });
    } catch (err) {
      console.error("Erro ao excluir item:", err);
    }
  };

  const handleEditItem = (item: FacilityItem) => {
    try {
      setEditingItem(item);
      setNewItem({ ...item });
      setIsDialogOpen(true);
    } catch (err) {
      console.error("Erro ao preparar edição do item:", err);
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setNewItem({ id: '', name: '', description: '', cost: 0 });
    setIsDialogOpen(true);
  };

  // Função para resetar os dados para os valores iniciais
  const resetFacilityData = () => {
    try {
      // Remover dados do localStorage
      localStorage.removeItem('facilityCosts');
      
      // Definir valores iniciais
      const initialData: FacilityCosts = {
        infrastructure: [
          { id: "infra-1", name: "Aluguel", description: "Custo mensal de aluguel", cost: 15000 },
          { id: "infra-2", name: "Utilidades", description: "Custo de água, energia e internet", cost: 8000 },
          { id: "infra-3", name: "Manutenção", description: "Custo de manutenção predial", cost: 5000 },
        ],
        equipment: [
          { id: "equip-1", name: "Equipamentos médicos", description: "Custo de equipamentos médicos", cost: 25000 },
          { id: "equip-2", name: "Equipamentos de escritório", description: "Custo de equipamentos de escritório", cost: 12000 },
          { id: "equip-3", name: "Tecnologia", description: "Custo de equipamentos tecnológicos", cost: 0 },
        ],
        operational: [
          { id: "oper-1", name: "Suprimentos", description: "Custo de suprimentos operacionais", cost: 20000 },
          { id: "oper-2", name: "Seguro", description: "Custo de seguro", cost: 5000 },
          { id: "oper-3", name: "Outros", description: "Outros custos operacionais", cost: 150 },
        ],
      };
      
      // Atualizar estado
      setFacilityCosts(initialData);
      
      // Atualizar o localStorage com os dados iniciais
      localStorage.setItem('facilityCosts', JSON.stringify(initialData));
      
      // Recarregar a página para aplicar as mudanças
      window.location.reload();
    } catch (err) {
      console.error("Erro ao resetar dados:", err);
      alert("Erro ao resetar dados. Por favor, recarregue a página manualmente.");
    }
  };

  // Renderização com tratamento de erros
  try {
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
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
              <TabsTrigger value="equipment">Equipamentos</TabsTrigger>
              <TabsTrigger value="operational">Operacionais</TabsTrigger>
            </TabsList>
            
            {(["infrastructure", "equipment", "operational"] as const).map((category) => (
              <TabsContent key={category} value={category} className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{
                    category === "infrastructure" ? "Infraestrutura" :
                    category === "equipment" ? "Equipamentos" : "Operacionais"
                  }</h3>
                  <Button onClick={openAddDialog} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Item
                  </Button>
                </div>
                
                {!facilityCosts[category] || facilityCosts[category].length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    Nenhum item adicionado. Clique em "Adicionar Item" para começar.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Array.isArray(facilityCosts[category]) && facilityCosts[category].map((item) => (
                      <div key={item.id} className="flex items-center justify-between border p-3 rounded-md">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">
                            R$ {(typeof item.cost === 'number' ? item.cost : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-right text-sm font-medium text-purple-600">
                  Subtotal: R$ {calculateCategoryTotal(category).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Editar Item" : "Adicionar Novo Item"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Item</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Custo (R$)</Label>
                  <Input
                    id="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.cost}
                    onChange={(e) => setNewItem({ ...newItem, cost: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddItem}>
                  {editingItem ? "Salvar Alterações" : "Adicionar Item"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFacilityData}
            className="flex items-center gap-1 text-gray-500"
          >
            <RefreshCw className="h-4 w-4" />
            Resetar Dados
          </Button>
        </CardFooter>
      </Card>
    );
  } catch (err) {
    console.error("Erro ao renderizar FacilityForm:", err);
    return (
      <Card className="border-l-4 border-l-red-600 p-4">
        <h3 className="font-bold text-red-600">Erro ao carregar o formulário de Instalações e Operação</h3>
        <p className="text-gray-600 mt-2">Ocorreu um erro ao carregar este componente.</p>
        <Button 
          className="mt-4"
          variant="outline" 
          onClick={resetFacilityData}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar Resetar Dados
        </Button>
      </Card>
    );
  }
};

export default FacilityForm;
