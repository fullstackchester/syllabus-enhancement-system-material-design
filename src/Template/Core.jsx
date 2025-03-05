import React from 'react'
import 'dotenv'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import Sidebar from './sidebar/Sidebar'
import './core.scss'

function Core() {

  return (
    <main>
        <Header />
        <div className='outlet'>
          <Sidebar />
          <Outlet />
        </div>
        <Footer />
    </main>
  )
}

export default Core