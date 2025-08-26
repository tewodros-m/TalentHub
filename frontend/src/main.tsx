import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position='top-right'
        toastOptions={{
          success: {
            style: { background: '#10B981', color: 'white' },
          },
          error: {
            style: { background: '#EF4444', color: 'white' },
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
