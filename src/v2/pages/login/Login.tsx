import React, { JSX, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import s from './login.module.scss';
import { Input, Button } from '@mantine/core';


// firebaseui for authentication
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import '../../../../node_modules/firebaseui/dist/firebaseui.css'

import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA8ZcelwylRU_w3l52k5NFq9uI4BuJF7gM",
  authDomain: "bulsu-acn-internship-project.firebaseapp.com",
  databaseURL: "https://bulsu-acn-internship-project-default-rtdb.firebaseio.com",
  projectId: "bulsu-acn-internship-project",
  storageBucket: "bulsu-acn-internship-project.firebasestorage.app",
  messagingSenderId: "378999113972",
  appId: "1:378999113972:web:db0a19144b0a3e8a91f6a1",
  measurementId: "G-8DXTPF2D23"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const authUiInstance = new firebaseui.auth.AuthUI(getAuth());

interface loginForm {
  email: string; // email and password should be encrypted upon save
  password: string;
  loginDateTime: string;
}


function Login(): JSX.Element {


  const { register, handleSubmit, formState, setValue } = useForm<loginForm>({ mode: 'onChange' });

  const { isLoading, isSubmitting, isValid, errors, isSubmitted, isSubmitSuccessful } = formState;  

  const submitForm: SubmitHandler<loginForm> = (data: loginForm) => {

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({});
      }, 4000)
    })
  }

  useEffect(() => {
    if(isSubmitSuccessful) {
      window.open('http://localhost:3000/dashboard', '_parent')
    }
    showFirebaseUi()
  }, [isSubmitSuccessful])

  return (
    <div className={s.login_container}>
      <div className={s.card}>
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Login Form</h1>
          <div className={s.field_wrapper}>
            <Input.Wrapper label="Email" error={errors.email ? 'Required' : ''} withAsterisk >
              <Input type='text' 
                  placeholder="Email" 
                  error={errors.email ? true : false } 
                  {...register("email", { required: true })}  />
            </Input.Wrapper>
          </div>
          <div className={s.field_wrapper}>
            <Input.Wrapper label="Password" error={errors.password ? 'Required' : ''} withAsterisk>
              <Input type='password' 
                  placeholder="Password"
                  error={errors.password ? true : false }
                  {...register("password", { required: true })}  />
            </Input.Wrapper>
          </div>
          <Button type='submit' variant="filled" loading={isSubmitting} disabled={!isValid}>Submit</Button>
        </form>
      </div>
		  <div id='firebaseui-auth-container'></div>

    </div>
  )
}

function showFirebaseUi(){
    
  if (getAuth()) {
    const uiConfig = {
    signInSuccessUrl: '/', // Redirect URL after successful login
    signInOptions: [
      // List of authentication providers
      'google.com',
      // 'facebook.com',
      // 'twitter.com',
      // 'github.com',
      // 'password', // Email/Password
      // 'phone' // Phone Authentication
    ],
    tosUrl: '#terms-of-service', // Terms of Service URL
    privacyPolicyUrl: '#privacy-policy' // Privacy Policy URL
    };
  
    const fbui = document.getElementById('firebaseui-auth-container');
    if(fbui) {
    console.log('fbui', fbui)
    authUiInstance.start('#firebaseui-auth-container', uiConfig);
    } else {
      var ui = document.createElement('div');
      ui.id = 'firebaseui-auth-container';
      authUiInstance.start('#firebaseui-auth-container', uiConfig);
      console.log('ui', ui)
    }
  } else {
  console.log("NO AUTH DETECTED")
  }


  console.log('chester')
}

export default Login