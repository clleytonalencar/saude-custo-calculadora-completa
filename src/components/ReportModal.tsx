import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PrinterIcon, DownloadIcon, FileSpreadsheet } from "lucide-react";
import * as XLSX from 'xlsx';

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

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionals: Professional[];
  trainings: Training[];
  systemsConsulting: SystemConsulting[];
  facilityCosts: FacilityCosts;
}

const ReportModal = ({ isOpen, onClose, professionals, trainings, systemsConsulting, facilityCosts }: ReportModalProps) => {
  const calculateProfessionalsCost = () => {
    return professionals.reduce((total, prof) => total + (prof.quantity * prof.salary), 0);
  };

  const calculateTrainingsCost = () => {
    return trainings.reduce((total, training) => total + (training.cost * training.hours), 0);
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

  const calculateInfrastructureCost = () => {
    return Object.values(facilityCosts.infrastructure).reduce((a, b) => a + b, 0);
  };

  const calculateEquipmentCost = () => {
    return Object.values(facilityCosts.equipment).reduce((a, b) => a + b, 0);
  };

  const calculateOperationalCost = () => {
    return Object.values(facilityCosts.operational).reduce((a, b) => a + b, 0);
  };

  const calculateFacilityCost = () => {
    return calculateInfrastructureCost() + calculateEquipmentCost() + calculateOperationalCost();
  };

  const calculateTotalCost = () => {
    return calculateProfessionalsCost() + calculateTrainingsCost() + calculateSystemsConsultingCost() + calculateFacilityCost();
  };

  useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.id = 'print-style';
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          
          #print-report-content, #print-report-content * {
            visibility: visible;
          }
          
          #print-report-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            overflow: visible !important;
          }
          
          /* Oculta controles de diálogo e barra de rolagem */
          [data-radix-scroll-area-scrollbar],
          [data-radix-popper-content-wrapper],
          button,
          .dialog-footer {
            display: none !important;
          }
          
          /* Garante que o conteúdo não seja truncado */
          [role="dialog"],
          [data-radix-scroll-area-viewport] {
            transform: none !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
            page-break-inside: avoid;
          }
          
          /* Estilos para tabelas e bordas */
          th, td {
            border: 1px solid #000;
            padding: 8px;
          }
          
          th {
            background-color: #f0f0f0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* Cores específicas para categorias */
          .bg-blue-50, .bg-green-50, .bg-purple-50, .bg-amber-50 {
            background-color: #f8f8f8 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border: 1px solid #ddd !important;
          }
          
          /* Quebras de página estratégicas */
          .section-break {
            page-break-before: always;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        const printStyle = document.getElementById('print-style');
        if (printStyle) document.head.removeChild(printStyle);
      };
    }
  }, [isOpen]);

  const handlePrint = () => {
    // Criar uma janela de impressão separada para maior controle
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Por favor, permita a abertura de pop-ups para imprimir o relatório.');
      return;
    }
    
    // Estilos específicos para a janela de impressão
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório de Custos - Unidade de Saúde</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
          }
          
          h1, h2, h3, h4 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }
          
          h1 { 
            text-align: center;
            font-size: 1.8rem;
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          
          h2 {
            font-size: 1.5rem;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          
          h3 {
            font-size: 1.2rem;
          }
          
          .date {
            text-align: center;
            margin-bottom: 20px;
            font-style: italic;
            color: #666;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          th {
            background-color: #f0f0f0;
          }
          
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
          }
          
          .summary-item {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          
          .summary-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .summary-value {
            font-size: 1.5rem;
            font-weight: bold;
          }
          
          .total-box {
            background-color: #333;
            color: white;
            padding: 15px;
            margin: 25px 0;
            border-radius: 5px;
          }
          
          .subtotal-row {
            background-color: #f8f8f8;
            font-weight: bold;
          }
          
          .section-break {
            page-break-before: always;
          }
          
          .text-right {
            text-align: right;
          }
          
          .text-center {
            text-align: center;
          }
          
          .subtitle {
            color: #666;
            font-size: 0.9rem;
          }
          
          .training-card {
            border-left: 4px solid #4CAF50;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #f9f9f9;
          }
          
          .training-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          
          .training-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            font-size: 0.9rem;
            color: #555;
          }
          
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            
            .section-break {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body id="print-report-content">
        <h1>Relatório de Custos - Unidade de Saúde</h1>
        <p class="date">Gerado em: ${formatDate()}</p>
        
        <h2>Resumo</h2>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-title" style="color: #3B82F6;">Profissionais</div>
            <div class="summary-value">R$ ${calculateProfessionalsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="summary-item">
            <div class="summary-title" style="color: #10B981;">Capacitação</div>
            <div class="summary-value">R$ ${calculateTrainingsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="summary-item">
            <div class="summary-title" style="color: #8B5CF6;">Sistemas e Consultorias</div>
            <div class="summary-value">R$ ${calculateSystemsConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="summary-item">
            <div class="summary-title" style="color: #F59E0B;">Instalações e Operação</div>
            <div class="summary-value">R$ ${calculateFacilityCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
        
        <div class="total-box">
          <div>Custo Total</div>
          <div style="font-size: 1.8rem; font-weight: bold;">R$ ${calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
        
        <div class="section-break"></div>
        
        <h2 style="color: #3B82F6;">1. Profissionais</h2>
        ${professionals.length > 0 ? `
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th class="text-center">Quantidade</th>
                <th class="text-center">Horas Semanais</th>
                <th class="text-right">Salário Unitário</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${professionals.map(prof => `
                <tr>
                  <td>${prof.type || "Não especificado"}</td>
                  <td class="text-center">${prof.quantity}</td>
                  <td class="text-center">${prof.workHours}h</td>
                  <td class="text-right">R$ ${prof.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td class="text-right">R$ ${(prof.quantity * prof.salary).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
              <tr class="subtotal-row">
                <td colspan="4" class="text-right">Total Profissionais:</td>
                <td class="text-right">R$ ${calculateProfessionalsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        ` : '<p class="subtitle">Nenhum profissional registrado</p>'}
        
        <div class="section-break"></div>
        
        <h2 style="color: #10B981;">2. Capacitação</h2>
        ${trainings.length > 0 ? `
          <div>
            ${trainings.map(training => `
              <div class="training-card">
                <div class="training-header">
                  <div>
                    <h3>${training.name || "Treinamento não especificado"}</h3>
                    <p class="subtitle">${training.description || "Sem descrição"}</p>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Custo total</div>
                    <div class="font-bold">R$ ${(training.cost * training.hours).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
                <div class="training-details">
                  <div>
                    <span>Custo por participante:</span>
                    <span style="font-weight: bold; margin-left: 5px;">R$ ${training.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div>
                    <span>Participantes:</span>
                    <span style="font-weight: bold; margin-left: 5px;">${training.participants}</span>
                  </div>
                  <div>
                    <span>Carga horária:</span>
                    <span style="font-weight: bold; margin-left: 5px;">${training.hours}h</span>
                  </div>
                </div>
              </div>
            `).join('')}
            <div style="background-color: #f0fff4; padding: 15px; text-align: right; border-radius: 5px;">
              <span style="font-weight: bold;">Total Capacitação: </span>
              <span style="font-weight: bold;">R$ ${calculateTrainingsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        ` : '<p class="subtitle">Nenhuma capacitação registrada</p>'}
        
        <div class="section-break"></div>
        
        <h2 style="color: #8B5CF6;">3. Sistemas e Consultorias</h2>
        
        <h3>3.1 Sistemas</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            ${systemsConsulting
              .filter(item => item.category === 'system')
              .map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="subtitle">${item.description}</td>
                  <td class="text-right">R$ ${item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            <tr class="subtotal-row">
              <td colspan="2" class="text-right">Subtotal Sistemas:</td>
              <td class="text-right">R$ ${calculateSystemsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
        
        <h3>3.2 Consultorias</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            ${systemsConsulting
              .filter(item => item.category === 'consulting')
              .map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="subtitle">${item.description}</td>
                  <td class="text-right">R$ ${item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            <tr class="subtotal-row">
              <td colspan="2" class="text-right">Subtotal Consultorias:</td>
              <td class="text-right">R$ ${calculateConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="background-color: #f3f0ff; padding: 15px; text-align: right; border-radius: 5px; margin-top: 15px;">
          <span style="font-weight: bold;">Total Sistemas e Consultorias: </span>
          <span style="font-weight: bold;">R$ ${calculateSystemsConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div class="section-break"></div>
        
        <h2 style="color: #F59E0B;">4. Instalações e Operação</h2>
        
        <h3>4.1 Infraestrutura</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aluguel/Imóvel</td>
              <td class="text-right">R$ ${facilityCosts.infrastructure.rent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Utilidades (água, luz, etc.)</td>
              <td class="text-right">R$ ${facilityCosts.infrastructure.utilities.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Manutenção</td>
              <td class="text-right">R$ ${facilityCosts.infrastructure.maintenance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr class="subtotal-row">
              <td>Subtotal Infraestrutura</td>
              <td class="text-right">R$ ${calculateInfrastructureCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
        
        <h3>4.2 Equipamentos</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equipamentos Médicos</td>
              <td class="text-right">R$ ${facilityCosts.equipment.medical.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Material de Escritório</td>
              <td class="text-right">R$ ${facilityCosts.equipment.office.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Tecnologia</td>
              <td class="text-right">R$ ${facilityCosts.equipment.technology.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr class="subtotal-row">
              <td>Subtotal Equipamentos</td>
              <td class="text-right">R$ ${calculateEquipmentCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
        
        <h3>4.3 Operacionais</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Suprimentos</td>
              <td class="text-right">R$ ${facilityCosts.operational.supplies.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Seguros</td>
              <td class="text-right">R$ ${facilityCosts.operational.insurance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Outros Custos</td>
              <td class="text-right">R$ ${facilityCosts.operational.other.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr class="subtotal-row">
              <td>Subtotal Operacionais</td>
              <td class="text-right">R$ ${calculateOperationalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="background-color: #fff8e6; padding: 15px; text-align: right; border-radius: 5px; margin-top: 15px;">
          <span style="font-weight: bold;">Total Instalações e Operação: </span>
          <span style="font-weight: bold;">R$ ${calculateFacilityCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div class="section-break"></div>
        
        <div class="total-box">
          <h2 style="color: white; margin-top: 0;">Custo Total da Unidade de Saúde</h2>
          <p style="font-size: 2rem; font-weight: bold; margin: 0;">
            R$ ${calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Espera o carregamento dos estilos e conteúdo antes de imprimir
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
      
      // Para não fechar a janela após imprimir, comente a linha abaixo
      // printWindow.onafterprint = () => printWindow.close();
    };
  };

  const handleExportToExcel = () => {
    const professionalData = professionals.map(p => ({
      "Tipo": p.type,
      "Quantidade": p.quantity,
      "Horas Semanais": p.workHours,
      "Salário Unitário": p.salary,
      "Subtotal": p.quantity * p.salary
    }));
    
    const trainingData = trainings.map(t => ({
      "Nome": t.name,
      "Descrição": t.description,
      "Custo por Participante": t.cost,
      "Participantes": t.participants,
      "Horas": t.hours,
      "Custo Total": t.cost * t.hours
    }));
    
    const systemsData = systemsConsulting
      .filter(item => item.category === 'system')
      .map(s => ({
        "Nome": s.name,
        "Descrição": s.description,
        "Valor": s.cost
      }));
    
    const consultingData = systemsConsulting
      .filter(item => item.category === 'consulting')
      .map(c => ({
        "Nome": c.name,
        "Descrição": c.description,
        "Valor": c.cost
      }));
    
    const infrastructureData = [
      { "Item": "Aluguel/Imóvel", "Valor": facilityCosts.infrastructure.rent },
      { "Item": "Utilidades (água, luz, etc.)", "Valor": facilityCosts.infrastructure.utilities },
      { "Item": "Manutenção", "Valor": facilityCosts.infrastructure.maintenance },
      { "Item": "Subtotal Infraestrutura", "Valor": calculateInfrastructureCost() }
    ];
    
    const equipmentData = [
      { "Item": "Equipamentos Médicos", "Valor": facilityCosts.equipment.medical },
      { "Item": "Material de Escritório", "Valor": facilityCosts.equipment.office },
      { "Item": "Tecnologia", "Valor": facilityCosts.equipment.technology },
      { "Item": "Subtotal Equipamentos", "Valor": calculateEquipmentCost() }
    ];
    
    const operationalData = [
      { "Item": "Suprimentos", "Valor": facilityCosts.operational.supplies },
      { "Item": "Seguros", "Valor": facilityCosts.operational.insurance },
      { "Item": "Outros Custos", "Valor": facilityCosts.operational.other },
      { "Item": "Subtotal Operacionais", "Valor": calculateOperationalCost() }
    ];
    
    const summaryData = [
      { "Categoria": "Profissionais", "Valor": calculateProfessionalsCost() },
      { "Categoria": "Capacitação", "Valor": calculateTrainingsCost() },
      { "Categoria": "Sistemas", "Valor": calculateSystemsCost() },
      { "Categoria": "Consultorias", "Valor": calculateConsultingCost() },
      { "Categoria": "Instalações e Operação", "Valor": calculateFacilityCost() },
      { "Categoria": "TOTAL", "Valor": calculateTotalCost() }
    ];
    
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), "Resumo");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(professionalData), "Profissionais");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(trainingData), "Capacitação");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(systemsData), "Sistemas");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(consultingData), "Consultorias");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(infrastructureData), "Infraestrutura");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(equipmentData), "Equipamentos");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(operationalData), "Operacionais");
    
    const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    XLSX.writeFile(workbook, `Relatório-Custos-Unidade-Saúde-${date}.xlsx`);
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">Relatório de Custos - Unidade de Saúde</DialogTitle>
          <div className="text-sm text-gray-500">Gerado em: {formatDate()}</div>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="p-4 space-y-6" id="report-content">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-bold text-gray-800">Resumo</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-blue-600 font-medium">Profissionais</div>
                  <div className="text-2xl font-bold">
                    R$ {calculateProfessionalsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-green-600 font-medium">Capacitação</div>
                  <div className="text-2xl font-bold">
                    R$ {calculateTrainingsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-purple-600 font-medium">Sistemas e Consultorias</div>
                  <div className="text-2xl font-bold">
                    R$ {calculateSystemsConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-amber-600 font-medium">Instalações e Operação</div>
                  <div className="text-2xl font-bold">
                    R$ {calculateFacilityCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-800 text-white rounded-md shadow-sm">
                <div className="font-medium">Custo Total</div>
                <div className="text-3xl font-bold">
                  R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <Separator className="separator-print" />
            
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-4">1. Profissionais</h2>
              {professionals.length > 0 ? (
                <div className="space-y-4">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Tipo</th>
                        <th className="border p-2 text-center">Quantidade</th>
                        <th className="border p-2 text-center">Horas Semanais</th>
                        <th className="border p-2 text-right">Salário Unitário</th>
                        <th className="border p-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professionals.map((prof) => (
                        <tr key={prof.id}>
                          <td className="border p-2">{prof.type || "Não especificado"}</td>
                          <td className="border p-2 text-center">{prof.quantity}</td>
                          <td className="border p-2 text-center">{prof.workHours}h</td>
                          <td className="border p-2 text-right">R$ {prof.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="border p-2 text-right font-medium">R$ {(prof.quantity * prof.salary).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50">
                        <td colSpan={4} className="border p-2 text-right font-bold">Total Profissionais:</td>
                        <td className="border p-2 text-right font-bold">R$ {calculateProfessionalsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum profissional registrado</p>
              )}
            </div>

            <Separator className="separator-print" />
            
            <div>
              <h2 className="text-xl font-bold text-green-600 mb-4">2. Capacitação</h2>
              {trainings.length > 0 ? (
                <div className="space-y-4">
                  {trainings.map((training) => (
                    <div key={training.id} className="bg-white rounded-md shadow-sm p-4 border-l-4 border-green-400">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{training.name || "Treinamento não especificado"}</h3>
                          <p className="text-gray-600 text-sm mt-1">{training.description || "Sem descrição"}</p>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Custo total</div>
                          <div className="font-bold">R$ {(training.cost * training.hours).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Custo por participante:</span>
                          <span className="ml-1 font-medium">R$ {training.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Participantes:</span>
                          <span className="ml-1 font-medium">{training.participants}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Carga horária:</span>
                          <span className="ml-1 font-medium">{training.hours}h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-green-50 p-3 rounded-md text-right">
                    <span className="font-bold">Total Capacitação: </span>
                    <span className="font-bold">R$ {calculateTrainingsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhuma capacitação registrada</p>
              )}
            </div>

            <Separator className="separator-print" />
            
            <div>
              <h2 className="text-xl font-bold text-purple-600 mb-4">3. Sistemas e Consultorias</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">3.1 Sistemas</h3>
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Nome</th>
                        <th className="border p-2 text-left">Descrição</th>
                        <th className="border p-2 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemsConsulting
                        .filter(item => item.category === 'system')
                        .map((item) => (
                          <tr key={item.id}>
                            <td className="border p-2">{item.name}</td>
                            <td className="border p-2 text-sm text-gray-500">{item.description}</td>
                            <td className="border p-2 text-right">R$ {item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          </tr>
                      ))}
                      <tr className="bg-purple-50">
                        <td colSpan={2} className="border p-2 font-bold text-right">
                          Subtotal Sistemas:
                        </td>
                        <td className="border p-2 text-right font-bold">
                          R$ {calculateSystemsCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">3.2 Consultorias</h3>
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Nome</th>
                        <th className="border p-2 text-left">Descrição</th>
                        <th className="border p-2 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemsConsulting
                        .filter(item => item.category === 'consulting')
                        .map((item) => (
                          <tr key={item.id}>
                            <td className="border p-2">{item.name}</td>
                            <td className="border p-2 text-sm text-gray-500">{item.description}</td>
                            <td className="border p-2 text-right">R$ {item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          </tr>
                      ))}
                      <tr className="bg-purple-50">
                        <td colSpan={2} className="border p-2 font-bold text-right">
                          Subtotal Consultorias:
                        </td>
                        <td className="border p-2 text-right font-bold">
                          R$ {calculateConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-md text-right">
                  <span className="font-bold">Total Sistemas e Consultorias: </span>
                  <span className="font-bold">R$ {calculateSystemsConsultingCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <Separator className="separator-print" />
            
            <div>
              <h2 className="text-xl font-bold text-amber-600 mb-4">4. Instalações e Operação</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">4.1 Infraestrutura</h3>
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Item</th>
                        <th className="border p-2 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Aluguel/Imóvel</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.infrastructure.rent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Utilidades (água, luz, etc.)</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.infrastructure.utilities.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Manutenção</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.infrastructure.maintenance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="border p-2 font-bold">Subtotal Infraestrutura</td>
                        <td className="border p-2 text-right font-bold">R$ {calculateInfrastructureCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">4.2 Equipamentos</h3>
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Item</th>
                        <th className="border p-2 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Equipamentos Médicos</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.equipment.medical.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Material de Escritório</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.equipment.office.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Tecnologia</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.equipment.technology.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="border p-2 font-bold">Subtotal Equipamentos</td>
                        <td className="border p-2 text-right font-bold">R$ {calculateEquipmentCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">4.3 Operacionais</h3>
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Item</th>
                        <th className="border p-2 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Suprimentos</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.operational.supplies.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Seguros</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.operational.insurance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Outros Custos</td>
                        <td className="border p-2 text-right">R$ {facilityCosts.operational.other.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="border p-2 font-bold">Subtotal Operacionais</td>
                        <td className="border p-2 text-right font-bold">R$ {calculateOperationalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-md text-right">
                  <span className="font-bold">Total Instalações e Operação: </span>
                  <span className="font-bold">R$ {calculateFacilityCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
            
            <Separator className="separator-print" />
            
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2">Custo Total da Unidade de Saúde</h2>
              <p className="text-3xl font-bold">
                R$ {calculateTotalCost().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="gap-2 dialog-footer">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="outline" onClick={handleExportToExcel} className="bg-green-600 text-white hover:bg-green-700">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
          <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
