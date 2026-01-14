import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global Error Handler for Mobile Debugging
window.onerror = function (message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="color: red; padding: 20px; text-align: center;">
      <h1>Erro no App</h1>
      <p>${message}</p>
      <button onclick="window.location.reload()" style="background: white; color: black; padding: 10px; margin-top: 20px;">Recarregar</button>
    </div>`;
  }
};

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e) {
  document.getElementById('root').innerHTML = "Erro Fatal na Inicialização.";
}
