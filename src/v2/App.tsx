import React, { JSX, useEffect, useState } from 'react';
import { createTheme, MantineProvider, MantineThemeOverride, Text } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Shell from './core/shell/Shell';
import Login from './pages/login/Login';
import DashboardPage from './pages/dashboard/dashboard';
import FacultyPage from './pages/faculty/Faculty';
import FacultyOverviewPage from './pages/faculty/overview/overview';
import FacultyDetails from './pages/faculty/faculty-details/FacultyDetails';

function App(): JSX.Element {

  useEffect(() => {
  }, [])

  


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
                <Route path='faculty' element={<FacultyPage />}>
                  <Route path='overview' element={<FacultyOverviewPage />} />
                  <Route path=':id' element={<FacultyDetails />} />
                </Route>
                <Route path='account' element={<FacultyPage />} />
                <Route path='school-year' element={<FacultyPage />} />
              </Route>
            </Routes>
          </BrowserRouter>

      </MantineProvider>
  )

}

export default App