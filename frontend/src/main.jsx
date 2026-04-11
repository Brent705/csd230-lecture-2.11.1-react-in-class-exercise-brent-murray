import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'
import AuthProvider from './provider/AuthProvider' // FIXED
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
);