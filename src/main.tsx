import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, type MantineThemeOverride, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'
import { RouterProvider } from 'react-router';
import routes from './routes.ts';

const customTheme: MantineThemeOverride = createTheme({
  fontFamily: 'Roboto, sans-serif',
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={customTheme}>
      <RouterProvider router={routes} />
    </MantineProvider>
  </StrictMode>,
)
