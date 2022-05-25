import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import './Layout.css'
import Sidebar from './Sidebar'

export default function Layout() {

    return (
        <div className='template-body'>
            <Sidebar />
            <div className='outlet'>
                <Header />
                <div className='viewport'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
