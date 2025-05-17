import { createTheme, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { JSX, useEffect } from 'react';
import { RouterProvider } from 'react-router';

import appRouter from './utils/router';

function App(): JSX.Element {

  useEffect(() => {
  }, [])

  


  const customTheme: MantineThemeOverride = createTheme({
    fontFamily: 'Brush Script MT, sans-serif',

  });


  return (
      <MantineProvider theme={customTheme}>
          <RouterProvider router={appRouter} />
      </MantineProvider>
  )

}

export default App