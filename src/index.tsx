import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import './services/localization/i18n';
import { LocalizationProvider } from 'src/contexts/LocalizationContext';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { OperationsContextProvider } from 'src/contexts/OperationsContext';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider>
          <OperationsContextProvider>
            <App />
          </OperationsContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
