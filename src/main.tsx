import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CostProvider } from './context/CostContext'

createRoot(document.getElementById("root")!).render(
  <CostProvider>
    <App />
  </CostProvider>
);
