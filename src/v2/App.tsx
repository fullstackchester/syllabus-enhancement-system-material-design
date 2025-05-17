import { createTheme, MantineProvider, MantineThemeOverride } from '@mantine/core';
import React from 'react';
import { RouterProvider } from 'react-router';

import appRouter from './utils/router';
import { AuthContextProvider } from './utils/AuthContext';

function App() {
  const customTheme: MantineThemeOverride = createTheme({
    fontFamily: 'Roboto, sans-serif',
  });

  return (
    <MantineProvider theme={customTheme}>
      <AuthContextProvider>
        <RouterProvider router={appRouter} />
      </AuthContextProvider>
    </MantineProvider>
  );
}

export default App;