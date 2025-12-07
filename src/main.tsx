import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// Service Worker registration removed to prevent caching errors


createRoot(document.getElementById("root")!).render(<App />);
