import './main.css'; // must remain first to preserve layers order

import "@/config/zod-config";
import { EchadRouter } from '@/router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EchadRouter />
  </StrictMode>,
)
