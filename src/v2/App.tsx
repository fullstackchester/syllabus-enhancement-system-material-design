import React, { JSX, useState } from 'react';
import { createTheme, MantineProvider, MantineThemeOverride, Text } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Shell from './core/shell/Shell';
import Login from './pages/login/Login';
import DashboardPage from './pages/dashboard/dashboard';


function App(): JSX.Element {

  const customTheme: MantineThemeOverride = createTheme({
    fontFamily: 'Roboto, sans-serif',

  });


  return (
      <MantineProvider theme={customTheme}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path='/' element={<Shell />} >
                <Route path='dashboard' element={<DashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </MantineProvider>
  )

}

export default App