
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CostProvider } from './context/CostContext'

console.log("Iniciando a aplicação...");

// SOLUÇÃO DE EMERGÊNCIA: Limpar todo o localStorage
try {
  console.log("Limpando localStorage para resolver o problema da tela em branco");
  localStorage.clear();
  console.log("localStorage foi limpo com sucesso");
} catch (e) {
  console.error("Erro ao limpar localStorage:", e);
}

// Renderização com tratamento de erros
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Elemento root não encontrado no DOM");
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Erro: Elemento root não encontrado. Verifique o HTML.</div>';
  } else {
    console.log("Elemento root encontrado, tentando renderizar a aplicação");
    
    createRoot(rootElement).render(
      <CostProvider>
        <App />
      </CostProvider>
    );
    
    console.log("Renderização inicializada com sucesso");
  }
} catch (error) {
  console.error("Erro fatal ao renderizar a aplicação:", error);
  
  // Exibir mensagem de erro na página caso a renderização falhe
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: red;">Erro na aplicação</h2>
      <p>Ocorreu um erro ao carregar a aplicação. Detalhes:</p>
      <pre style="background: #f7f7f7; padding: 10px; border-radius: 5px; overflow: auto;">${error?.toString?.() || 'Erro desconhecido'}</pre>
      <button onclick="window.location.reload()" style="padding: 10px 15px; margin-top: 15px; cursor: pointer;">Recarregar a página</button>
    </div>
  `;
}
