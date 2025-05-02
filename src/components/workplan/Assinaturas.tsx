import React from 'react';

interface ResponsavelInfo {
  nome?: string;
  cargo?: string;
  documento?: string;
}

interface AssinaturasProps {
  data?: string;
  municipio?: string;
  responsavelPrefeitura?: ResponsavelInfo;
  responsavelSecretariaSaude?: ResponsavelInfo;
  responsavelConsorcio?: ResponsavelInfo;
  responsavelTecnico?: ResponsavelInfo;
}

const Assinaturas: React.FC<AssinaturasProps> = ({
  data = "02 de maio de 2025",
  municipio = "Município",
  responsavelPrefeitura = {
    nome: "Nome do Prefeito",
    cargo: "Prefeito Municipal",
    documento: "CPF: 000.000.000-00"
  },
  responsavelSecretariaSaude = {
    nome: "Nome do Secretário",
    cargo: "Secretário Municipal de Saúde",
    documento: "CPF: 000.000.000-00"
  },
  responsavelConsorcio = {
    nome: "Nome do Representante",
    cargo: "Presidente do Consórcio",
    documento: "CPF: 000.000.000-00"
  },
  responsavelTecnico = {
    nome: "Nome do Responsável",
    cargo: "Responsável Técnico",
    documento: "CRM/BA: 00000 / CPF: 000.000.000-00"
  }
}) => {
  return (
    <section className="mt-10">
      <h2 className="font-bold text-lg mb-6 text-blue-800">16. ASSINATURAS</h2>
      
      <p className="mb-8 text-center">
        {municipio}, {data}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="text-center">
          <div className="border-b border-black w-64 mx-auto mb-1"></div>
          <p className="font-medium">{responsavelPrefeitura?.nome}</p>
          <p>{responsavelPrefeitura?.cargo}</p>
          <p className="text-sm text-gray-600">{responsavelPrefeitura?.documento}</p>
        </div>
        
        <div className="text-center">
          <div className="border-b border-black w-64 mx-auto mb-1"></div>
          <p className="font-medium">{responsavelSecretariaSaude?.nome}</p>
          <p>{responsavelSecretariaSaude?.cargo}</p>
          <p className="text-sm text-gray-600">{responsavelSecretariaSaude?.documento}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="text-center">
          <div className="border-b border-black w-64 mx-auto mb-1"></div>
          <p className="font-medium">{responsavelConsorcio?.nome}</p>
          <p>{responsavelConsorcio?.cargo}</p>
          <p className="text-sm text-gray-600">{responsavelConsorcio?.documento}</p>
        </div>
        
        <div className="text-center">
          <div className="border-b border-black w-64 mx-auto mb-1"></div>
          <p className="font-medium">{responsavelTecnico?.nome}</p>
          <p>{responsavelTecnico?.cargo}</p>
          <p className="text-sm text-gray-600">{responsavelTecnico?.documento}</p>
        </div>
      </div>
    </section>
  );
};

export default Assinaturas;