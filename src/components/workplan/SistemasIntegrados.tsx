import React from 'react';

interface SistemaInfo {
  nome: string;
  integracoes?: string[];
  funcionalidades?: string[];
  beneficios?: string[];
}

interface SistemasIntegradosProps {
  sistemas?: SistemaInfo[];
  observacoes?: string[];
}

const SistemasIntegrados: React.FC<SistemasIntegradosProps> = ({
  sistemas = [
    {
      nome: "Sistema de Prontuário Eletrônico",
      integracoes: [
        "e-SUS APS",
        "SISAB",
        "SIGTAP",
        "SCNES",
        "BPA"
      ],
      funcionalidades: [
        "Registro completo do atendimento clínico",
        "Histórico do paciente unificado",
        "Prescrição eletrônica",
        "Controle de dispensação de medicamentos",
        "Gestão de agendamentos e filas"
      ],
      beneficios: [
        "Eliminação de prontuários em papel",
        "Acesso rápido às informações clínicas",
        "Redução de erros de medicação",
        "Maior segurança dos dados clínicos",
        "Facilidade no acompanhamento longitudinal dos pacientes"
      ]
    },
    {
      nome: "Sistema de Gestão de Indicadores",
      integracoes: [
        "e-SUS APS",
        "SISAB",
        "DigiSUS",
        "Sistemas de BI próprios"
      ],
      funcionalidades: [
        "Dashboard personalizável para indicadores de saúde",
        "Alertas para metas não alcançadas",
        "Gestão de programas de saúde (hipertensos, diabéticos, gestantes)",
        "Rastreamento de pacientes de risco elevado",
        "Controle de busca ativa"
      ],
      beneficios: [
        "Monitoramento em tempo real de indicadores de saúde",
        "Tomada de decisão baseada em evidências",
        "Identificação precoce de tendências e surtos",
        "Melhoria na qualidade do cuidado e resultados em saúde",
        "Otimização de recursos com base na análise de dados"
      ]
    },
    {
      nome: "Sistema de Regulação e Referência",
      integracoes: [
        "SISREG",
        "Sistema Estadual de Regulação",
        "Central de Marcação Municipal"
      ],
      funcionalidades: [
        "Solicitação eletrônica de exames e consultas especializadas",
        "Verificação em tempo real da disponibilidade de vagas",
        "Acompanhamento do status dos encaminhamentos",
        "Notificações para pacientes (via SMS/WhatsApp)",
        "Registro do retorno e contra-referência"
      ],
      beneficios: [
        "Redução do tempo de espera para atendimentos especializados",
        "Diminuição do absenteísmo em consultas e exames",
        "Maior transparência no processo de regulação",
        "Continuidade do cuidado entre níveis de atenção",
        "Otimização do uso de recursos especializados"
      ]
    }
  ],
  observacoes = [
    "Todos os sistemas devem ser integrados entre si e com os sistemas federais e estaduais",
    "Os sistemas devem atender aos requisitos da LGPD (Lei Geral de Proteção de Dados)",
    "Deve haver suporte técnico disponível em horário estendido",
    "A propriedade dos dados é do município, mesmo após eventual rescisão contratual",
    "Todas as soluções devem funcionar em área com conectividade limitada"
  ]
}) => {
  return (
    <section className="space-y-8">
      <h2 className="font-bold text-lg mb-4 text-blue-800">12. SISTEMAS INTEGRADOS PARA ATENÇÃO PRIMÁRIA</h2>
      
      <p className="text-justify">
        Para alcançar os objetivos propostos neste plano de trabalho, é fundamental a implementação e integração
        de sistemas informatizados que permitam a gestão eficiente das informações de saúde, o monitoramento dos 
        indicadores e a coordenação do cuidado. A seguir, apresentamos os sistemas necessários e suas respectivas 
        funcionalidades, integrações e benefícios esperados:
      </p>
      
      {sistemas.map((sistema, index) => (
        <div key={`sistema-${index}`} className="border rounded-lg p-5 bg-gray-50 shadow-sm">
          <h3 className="font-bold text-md mb-3 text-blue-700 border-b pb-2">{sistema.nome}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Integrações:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {sistema.integracoes?.map((integracao, idx) => (
                  <li key={`integ-${index}-${idx}`}>{integracao}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Funcionalidades:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {sistema.funcionalidades?.map((funcionalidade, idx) => (
                  <li key={`func-${index}-${idx}`}>{funcionalidade}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Benefícios:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {sistema.beneficios?.map((beneficio, idx) => (
                  <li key={`benef-${index}-${idx}`}>{beneficio}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold mb-3">Observações Importantes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {observacoes.map((observacao, index) => (
            <li key={`obs-${index}`}>{observacao}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SistemasIntegrados;