import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AudioProvider } from './contexts/AudioProvider'; // นำเข้า AudioProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>  {/* ครอบ App ด้วย AudioProvider */}
      <App />
    </AudioProvider>
  </StrictMode>
);
