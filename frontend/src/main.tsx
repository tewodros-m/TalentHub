import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './contexts/DarkModeProvider.tsx';
import RealtimeProvider from './contexts/RealtimeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            background: 'rgb(var(--color-secondary-500))',
            color: 'rgb(var(--color-white))',
          },
          // Success
          success: {
            style: {
              background: 'rgb(var(--color-secondary-500))',
              color: 'rgb(var(--color-white))',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'rgb(var(--color-white))',
            },
          },
        }}
      />
      <DarkModeProvider>
        <RealtimeProvider>
          <App />
        </RealtimeProvider>
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);
