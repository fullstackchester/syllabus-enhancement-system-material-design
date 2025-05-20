import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, type MantineThemeOverride, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'
import { RouterProvider } from 'react-router';
import routes from './routes.tsx';

const customTheme: MantineThemeOverride = createTheme({
  fontFamily: 'Roboto, sans-serif',
  primaryShade: {
    light: 9,
    dark: 5
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={customTheme} defaultColorScheme="dark">
      <RouterProvider router={routes} />
    </MantineProvider>
  </StrictMode>,
)
