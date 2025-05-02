import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface WorkPlanConfigProps {
  workPlanConfig: {
    municipio: string;
    populacao: string;
    consorcio: string;
    cnpjConsorcio: string;
    cnpjPrefeitura: string;
    representanteConsorcio: string;
    representantePrefeitura: string;
    cargoRepresentanteConsorcio: string;
    cargoRepresentantePrefeitura: string;
    enderecoPrefeitura: string;
    enderecoConsorcio: string;
    numeroProcAdm: string;
    dataAssinatura: string;
  };
  updateConfig: (field: string, value: string) => void;
}

const WorkPlanConfig: React.FC<WorkPlanConfigProps> = ({ workPlanConfig, updateConfig }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Plano de Trabalho</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-4">Dados do Município</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="municipio">Nome do Município</Label>
                  <Input 
                    id="municipio" 
                    value={workPlanConfig.municipio}
                    onChange={(e) => updateConfig('municipio', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="populacao">População</Label>
                  <Input 
                    id="populacao" 
                    value={workPlanConfig.populacao}
                    onChange={(e) => updateConfig('populacao', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cnpjPrefeitura">CNPJ da Prefeitura</Label>
                  <Input 
                    id="cnpjPrefeitura" 
                    value={workPlanConfig.cnpjPrefeitura}
                    onChange={(e) => updateConfig('cnpjPrefeitura', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="enderecoPrefeitura">Endereço da Prefeitura</Label>
                  <Input 
                    id="enderecoPrefeitura" 
                    value={workPlanConfig.enderecoPrefeitura}
                    onChange={(e) => updateConfig('enderecoPrefeitura', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="representantePrefeitura">Representante da Prefeitura</Label>
                  <Input 
                    id="representantePrefeitura" 
                    value={workPlanConfig.representantePrefeitura}
                    onChange={(e) => updateConfig('representantePrefeitura', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cargoRepresentantePrefeitura">Cargo do Representante</Label>
                  <Input 
                    id="cargoRepresentantePrefeitura" 
                    value={workPlanConfig.cargoRepresentantePrefeitura}
                    onChange={(e) => updateConfig('cargoRepresentantePrefeitura', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-4">Dados do Consórcio</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="consorcio">Nome do Consórcio</Label>
                  <Input 
                    id="consorcio" 
                    value={workPlanConfig.consorcio}
                    onChange={(e) => updateConfig('consorcio', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cnpjConsorcio">CNPJ do Consórcio</Label>
                  <Input 
                    id="cnpjConsorcio" 
                    value={workPlanConfig.cnpjConsorcio}
                    onChange={(e) => updateConfig('cnpjConsorcio', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="enderecoConsorcio">Endereço do Consórcio</Label>
                  <Input 
                    id="enderecoConsorcio" 
                    value={workPlanConfig.enderecoConsorcio}
                    onChange={(e) => updateConfig('enderecoConsorcio', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="representanteConsorcio">Representante do Consórcio</Label>
                  <Input 
                    id="representanteConsorcio" 
                    value={workPlanConfig.representanteConsorcio}
                    onChange={(e) => updateConfig('representanteConsorcio', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cargoRepresentanteConsorcio">Cargo do Representante</Label>
                  <Input 
                    id="cargoRepresentanteConsorcio" 
                    value={workPlanConfig.cargoRepresentanteConsorcio}
                    onChange={(e) => updateConfig('cargoRepresentanteConsorcio', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Processo Administrativo</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="numeroProcAdm">Número do Processo Administrativo</Label>
                <Input 
                  id="numeroProcAdm" 
                  value={workPlanConfig.numeroProcAdm}
                  onChange={(e) => updateConfig('numeroProcAdm', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="dataAssinatura">Data de Assinatura</Label>
                <Input 
                  id="dataAssinatura" 
                  type="date"
                  value={workPlanConfig.dataAssinatura}
                  onChange={(e) => updateConfig('dataAssinatura', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkPlanConfig;