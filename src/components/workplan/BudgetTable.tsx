import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BudgetItem {
  nome: string;
  qtd: number;
  valor: number;
}

interface BudgetCategory {
  total: number;
  items: BudgetItem[];
}

interface BudgetData {
  recursosHumanos: BudgetCategory;
  capacitacao: BudgetCategory;
  sistemasTecnologia: BudgetCategory;
  consultorias: BudgetCategory;
  instalacoesOperacao: BudgetCategory;
}

interface BudgetTableProps {
  budgetData: BudgetData;
  totalMensal: number;
  totalAnual: number;
}

// Função auxiliar para formatar números com segurança
const safeFormatNumber = (value: any): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0,00';
  }
  return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
};

const BudgetTable: React.FC<BudgetTableProps> = ({
  budgetData,
  totalMensal = 0,
  totalAnual = 0
}) => {
  // Crie valores padrão seguros para propriedades possivelmente indefinidas
  const defaultCategory = { total: 0, items: [] };
  
  // Verifique se budgetData existe, se não, use um objeto vazio
  const data = budgetData || {
    recursosHumanos: defaultCategory,
    capacitacao: defaultCategory,
    sistemasTecnologia: defaultCategory,
    consultorias: defaultCategory,
    instalacoesOperacao: defaultCategory
  };
  
  // Garanta que cada categoria tenha um valor padrão caso seja undefined
  const recursos = data.recursosHumanos || defaultCategory;
  const capacitacao = data.capacitacao || defaultCategory;
  const sistemas = data.sistemasTecnologia || defaultCategory;
  const consultorias = data.consultorias || defaultCategory;
  const instalacoes = data.instalacoesOperacao || defaultCategory;
  
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Categoria</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-center">Qtd.</TableHead>
            <TableHead className="text-right">Custo Unit. (R$)</TableHead>
            <TableHead className="text-right">Custo Total Mensal (R$)</TableHead>
            <TableHead className="text-right">Custo Total Anual (R$)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Recursos Humanos */}
          <TableRow className="bg-blue-50 font-medium">
            <TableCell>1. Recursos Humanos</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(recursos.total)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(recursos.total * 12)}</TableCell>
          </TableRow>
          {recursos.items && recursos.items.map((item, index) => (
            <TableRow key={`rh-${index}`}>
              <TableCell></TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell className="text-center">{item.qtd}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor * 12)}</TableCell>
            </TableRow>
          ))}
          
          {/* Capacitação */}
          <TableRow className="bg-green-50 font-medium">
            <TableCell>2. Capacitação</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(capacitacao.total)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(capacitacao.total * 12)}</TableCell>
          </TableRow>
          {capacitacao.items && capacitacao.items.map((item, index) => (
            <TableRow key={`cap-${index}`}>
              <TableCell></TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell className="text-center">{item.qtd}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor * 12)}</TableCell>
            </TableRow>
          ))}
          
          {/* Sistemas e Tecnologia */}
          <TableRow className="bg-purple-50 font-medium">
            <TableCell>3. Sistemas e Tecnologia</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(sistemas.total)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(sistemas.total * 12)}</TableCell>
          </TableRow>
          {sistemas.items && sistemas.items.map((item, index) => (
            <TableRow key={`sys-${index}`}>
              <TableCell></TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell className="text-center">{item.qtd}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor * 12)}</TableCell>
            </TableRow>
          ))}
          
          {/* Consultorias */}
          <TableRow className="bg-amber-50 font-medium">
            <TableCell>4. Consultorias</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(consultorias.total)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(consultorias.total * 12)}</TableCell>
          </TableRow>
          {consultorias.items && consultorias.items.map((item, index) => (
            <TableRow key={`cons-${index}`}>
              <TableCell></TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell className="text-center">{item.qtd}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor * 12)}</TableCell>
            </TableRow>
          ))}
          
          {/* Instalações/Operação */}
          <TableRow className="bg-gray-50 font-medium">
            <TableCell>5. Instalações/Operação</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(instalacoes.total)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(instalacoes.total * 12)}</TableCell>
          </TableRow>
          {instalacoes.items && instalacoes.items.map((item, index) => (
            <TableRow key={`op-${index}`}>
              <TableCell></TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell className="text-center">{item.qtd}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor)}</TableCell>
              <TableCell className="text-right">{safeFormatNumber(item.qtd * item.valor * 12)}</TableCell>
            </TableRow>
          ))}
          
          {/* TOTAL GERAL */}
          <TableRow className="bg-gray-800 text-white font-bold">
            <TableCell>TOTAL GERAL</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{safeFormatNumber(totalMensal)}</TableCell>
            <TableCell className="text-right">{safeFormatNumber(totalAnual)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetTable;