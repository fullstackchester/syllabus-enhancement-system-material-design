// import React from "react";
// import './login.scss';
// import { TextField } from '@mui/material';
// import { useState } from "react";




// export const LoginPage = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//     function login() {

//     }

//     function checkLoginInputs() {
        
//     }

//     return (
//         <div className="login-page-container">
//             <div className="login-card">
//                 <div className="login-wrapper">
//                     <div className="login-card-header">
//                         {/* <img src={require('../../Assets/Img/bulsu-logo.png')}/> */}
//                         <h3>Sign in to your Account</h3>
//                     </div>
//                     <TextField type='text' label='Email' variant="filled" size='small' defaultValue={email} onBlur={(e) => setEmail(e.target.value)} error={email === ''} helperText='Invalid email address' />
//                     <TextField type='password' label='Password' variant="filled" size='small' defaultValue={email} onBlur={(e) => setPassword(e.target.value)} error={password === ''} helperText='Invalid password' />
//                     <button type='button' onClick={() => login()} className='login-button'>Login</button>
//                     <p>Don't have an account? <a href="#" className="basic-link">Create account</a></p>
//                 </div>
//             </div>
//         </div>
//     )
// }