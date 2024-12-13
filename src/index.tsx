import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import './services/localization/i18n';
import { LocalizationProvider } from 'src/contexts/LocalizationContext';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { AuthContextProvider } from 'src/contexts/AuthContext';
import { OperationsContextProvider } from 'src/contexts/OperationsContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocalizationProvider>
        <AuthContextProvider>
          <OperationsContextProvider>
            <App />
          </OperationsContextProvider>
        </AuthContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
