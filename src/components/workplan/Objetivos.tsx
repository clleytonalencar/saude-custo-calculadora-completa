import React from 'react';

interface ObjetivosProps {
  municipio: string;
  populacao?: string;
  perfilEpidemiologico?: {
    taxaMortalidadeInfantil?: string;
    prevalencias?: string[];
    incidencias?: string[];
    demandas?: string[];
    necessidades?: string[];
  };
  estruturaSaude?: {
    unidadesBasicas?: string;
    coberturaEstimada?: string;
    centrosAtencao?: string[];
    limitacoes?: string[];
    fragilidades?: string[];
  };
}

const Objetivos: React.FC<ObjetivosProps> = ({ 
  municipio, 
  populacao,
  perfilEpidemiologico,
  estruturaSaude
}) => {
  const defaultPerfilEpidemiologico = {
    taxaMortalidadeInfantil: "26,88",
    prevalencias: ["doenças crônicas não transmissíveis (hipertensão, diabetes)"],
    incidencias: ["arboviroses (dengue, zika, chikungunya)"],
    demandas: ["atendimentos em saúde mental"],
    necessidades: ["fortalecimento das ações de saúde materno-infantil"]
  };
  
  const defaultEstruturaSaude = {
    unidadesBasicas: "Unidades Básicas de Saúde",
    coberturaEstimada: "69,50%",
    centrosAtencao: ["Centro de Atenção Psicossocial (CAPS I)"],
    limitacoes: [
      "Serviços de apoio diagnóstico com limitações de oferta",
      "Escassez de profissionais especializados",
      "Alta rotatividade de médicos na Atenção Primária"
    ],
    fragilidades: [
      "Necessidade de capacitação contínua das equipes",
      "Fragilidades nos processos de planejamento e monitoramento",
      "Informatização parcial dos serviços de saúde"
    ]
  };
  
  // Usar valores padrão se não forem fornecidos
  const perfil = perfilEpidemiologico || defaultPerfilEpidemiologico;
  const estrutura = estruturaSaude || defaultEstruturaSaude;
  
  return (
    <>
      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">2. DESCRIÇÃO DO OBJETO DA PARCERIA</h2>
        <p className="text-justify">
          Gestão compartilhada, operacionalização e execução das ações e serviços da Atenção Primária à Saúde (APS) e serviços de apoio relacionados (administrativos, tecnológicos, logísticos) no âmbito do Sistema Único de Saúde (SUS) no município de {municipio}, pelo período de 12 (doze) meses, visando a qualificação da gestão, a otimização dos recursos e a melhoria do acesso e da qualidade dos serviços prestados à população, em conformidade com as diretrizes do SUS e o Plano Municipal de Saúde.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">3. CONTEXTUALIZAÇÃO E JUSTIFICATIVA</h2>
        <p className="text-justify mb-3">
          O município de {municipio}, com população de {populacao || "aproximadamente 25.000"} habitantes, localizado na região do Médio São Francisco, enfrenta desafios comuns a municípios de pequeno/médio porte na gestão e oferta de serviços de saúde, especialmente na Atenção Primária.
        </p>

        <h3 className="font-medium mb-2">Perfil Epidemiológico:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>Taxa de mortalidade infantil de {perfil.taxaMortalidadeInfantil} por mil nascidos vivos, acima da média nacional</li>
          {perfil.prevalencias?.map((item, index) => (
            <li key={`prev-${index}`}>Prevalência de {item}</li>
          ))}
          {perfil.incidencias?.map((item, index) => (
            <li key={`inc-${index}`}>Incidência significativa de {item}</li>
          ))}
          {perfil.demandas?.map((item, index) => (
            <li key={`dem-${index}`}>Demanda por {item}</li>
          ))}
          {perfil.necessidades?.map((item, index) => (
            <li key={`nec-${index}`}>Necessidade de {item}</li>
          ))}
        </ul>

        <h3 className="font-medium mb-2">Estrutura Atual de Saúde:</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>{estrutura.unidadesBasicas} com cobertura estimada de {estrutura.coberturaEstimada} do território</li>
          {estrutura.centrosAtencao?.map((item, index) => (
            <li key={`centro-${index}`}>{item}</li>
          ))}
          {estrutura.limitacoes?.map((item, index) => (
            <li key={`lim-${index}`}>{item}</li>
          ))}
          {estrutura.fragilidades?.map((item, index) => (
            <li key={`frag-${index}`}>{item}</li>
          ))}
        </ul>

        <p className="text-justify mb-3">
          A presente parceria com o Consórcio justifica-se pela busca de maior eficiência na gestão, ganho de escala na aquisição de insumos e tecnologias, otimização da alocação de recursos humanos especializados, implementação de processos de trabalho padronizados e fortalecimento da capacidade resolutiva da rede de saúde local. 
        </p>
        
        <p className="text-justify">
          O modelo de gestão via consórcio permite compartilhar custos e expertise, potencializando os resultados e o impacto na saúde da população, alinhado aos princípios de regionalização e integração do SUS. A parceria visa superar gargalos operacionais e assistenciais, promovendo uma gestão mais profissionalizada e focada em resultados.
        </p>
      </section>
      
      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">4. OBJETIVOS</h2>
        <p className="font-medium mb-2">Objetivo Geral:</p>
        <p className="text-justify mb-4">
          Qualificar e ampliar o acesso aos serviços de saúde da Atenção Primária em {municipio}, garantindo gestão eficiente, integrada e resolutiva, por meio da operacionalização consorciada dos serviços.
        </p>
        
        <p className="font-medium mb-2">Objetivos Específicos:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>OE1: Garantir o quadro de profissionais adequado e completo para a operacionalização dos serviços de APS conforme planejamento.</li>
          <li>OE2: Implementar e manter programas de capacitação e educação permanente para as equipes de saúde.</li>
          <li>OE3: Implantar, manter e otimizar o uso de sistemas de informação e tecnologia em saúde para apoio à gestão e à assistência.</li>
          <li>OE4: Assegurar apoio técnico especializado por meio de consultorias para aprimoramento contínuo da gestão e dos processos.</li>
          <li>OE5: Garantir a manutenção da infraestrutura operacional básica e o suprimento de insumos necessários à execução dos serviços.</li>
          <li>OE6: Monitorar e avaliar continuamente os indicadores de processo e resultado da gestão consorciada.</li>
        </ul>
      </section>
      
      <section>
        <h2 className="font-bold text-lg mb-4 text-blue-800">5. METAS</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Meta 1 (OE1): Manter 100% do quadro de profissionais previsto no Plano de Aplicação contratado e atuante durante os 12 meses de vigência da parceria.</li>
          <li>Meta 2 (OE2): Executar 100% do cronograma de capacitações e treinamentos previstos no Plano de Aplicação durante os 12 meses.</li>
          <li>Meta 3 (OE3): Manter 100% dos sistemas e tecnologias listados no Plano de Aplicação operativos e disponíveis para as equipes durante os 12 meses.</li>
          <li>Meta 4 (OE4): Manter 100% dos serviços de consultoria contratados e ativos, com entrega de relatórios/produtos conforme pactuado, durante os 12 meses.</li>
          <li>Meta 5 (OE5): Executar 100% do orçamento previsto para despesas de custeio operacional (Instalações e Operação) durante os 12 meses.</li>
          <li>Meta 6 (OE6): Apresentar relatórios mensais de monitoramento de indicadores e execução físico-financeira à Gestão Municipal durante os 12 meses.</li>
        </ul>
      </section>
    </>
  );
};

export default Objetivos;