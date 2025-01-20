import React from 'react';
import './sidebar.scss';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <nav>
        <div className='college-group'>
          <img alt='college-logo' src={require('../../Assets/Img/bulsu-logo.png')} width={60} height={60}/>
          <h1>CICT <span>College of Information and Communications Technology</span></h1>
        </div>
        <hr />
        <ul>
          <li><span class="material-icons">dashboard</span>Dashboard</li>
          <li><span class="material-icons">folder</span>Faculty</li>
          <li><span class="material-icons">account_circle</span>Account</li>
        </ul>
      </nav>
    </div>
  )
}