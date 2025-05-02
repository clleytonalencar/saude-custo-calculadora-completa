import React from 'react';

interface CaracterizacaoMunicipio {
  areaKm2?: string;
  densidadeDemografica?: string;
  localizacao?: string;
  fundacao?: string;
  pib?: string;
  percentualPibServicos?: string;
  pibPerCapita?: string;
  anoReferencia?: string;
}

interface ParticipantesProps {
  municipio: string;
  representanteMunicipio?: {
    nome?: string;
    cargo?: string;
    cpf?: string;
    rg?: string;
  };
  representanteConsorcio?: {
    nome?: string;
    cargo?: string;
    cpf?: string;
    rg?: string;
  };
  caracterizacaoMunicipio?: CaracterizacaoMunicipio;
}

const Participantes: React.FC<ParticipantesProps> = ({
  municipio,
  representanteMunicipio = {
    nome: "NOME COMPLETO",
    cargo: "Prefeito Municipal",
    cpf: "000.000.000-00",
    rg: "0000000000"
  },
  representanteConsorcio = {
    nome: "NOME COMPLETO",
    cargo: "Presidente do Consórcio",
    cpf: "000.000.000-00",
    rg: "0000000000"
  },
  caracterizacaoMunicipio = {
    areaKm2: "1.740,087",
    densidadeDemografica: "15,12",
    localizacao: "Margem direita do rio São Francisco, cortada pela BR-242 (liga Salvador a Brasília)",
    fundacao: "14 de agosto de 1958",
    pib: "415,6 milhões",
    percentualPibServicos: "50,1%",
    pibPerCapita: "15.348,75",
    anoReferencia: "2021"
  }
}) => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-bold text-lg mb-4 text-blue-800">1. CARACTERIZAÇÃO DAS INSTITUIÇÕES PARTICIPANTES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="font-bold text-md mb-3">MUNICIPIO DE {municipio.toUpperCase()}</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Representante legal:</span> {representanteMunicipio?.nome}</p>
              <p><span className="font-medium">Cargo:</span> {representanteMunicipio?.cargo}</p>
              <p><span className="font-medium">CPF:</span> {representanteMunicipio?.cpf}</p>
              <p><span className="font-medium">RG:</span> {representanteMunicipio?.rg}</p>
            </div>
          </div>
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="font-bold text-md mb-3">CONSÓRCIO PÚBLICO INTERFEDERATIVO DE SAÚDE</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Representante legal:</span> {representanteConsorcio?.nome}</p>
              <p><span className="font-medium">Cargo:</span> {representanteConsorcio?.cargo}</p>
              <p><span className="font-medium">CPF:</span> {representanteConsorcio?.cpf}</p>
              <p><span className="font-medium">RG:</span> {representanteConsorcio?.rg}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3">CARACTERIZAÇÃO DO MUNICÍPIO</h3>
        <div className="rounded-lg border p-6 shadow-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li>Área territorial: {caracterizacaoMunicipio?.areaKm2} km²</li>
            <li>Densidade demográfica: {caracterizacaoMunicipio?.densidadeDemografica} hab/km²</li>
            <li>Localização: {caracterizacaoMunicipio?.localizacao}</li>
            <li>Fundação: {caracterizacaoMunicipio?.fundacao}</li>
            <li>PIB: R$ {caracterizacaoMunicipio?.pib} ({caracterizacaoMunicipio?.anoReferencia}), com {caracterizacaoMunicipio?.percentualPibServicos} do valor adicionado vindo do setor de serviços</li>
            <li>PIB per capita: R$ {caracterizacaoMunicipio?.pibPerCapita} ({caracterizacaoMunicipio?.anoReferencia})</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Participantes;