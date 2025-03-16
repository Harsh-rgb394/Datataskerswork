import { StrictMode } from 'react'
import 'bulma/css/bulma.min.css'; // Import Bulma
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
