import { Button, Divider, Input } from '@mantine/core';
import React, { JSX, useEffect, useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import s from './login.module.scss';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { emailValidator } from './auth.functions';
import { useNavigate } from 'react-router';



const supabase = createClient('https://szvehjazguexrrfbxdcj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dmVoamF6Z3VleHJyZmJ4ZGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTQ5NzIsImV4cCI6MjA2MjY5MDk3Mn0.qVzAhiIq-t-Lm35XpA3wCrQZvgRcX77rKaCZWSnTbbM')

// const authUiInstance = new authUi.AuthUI(auth);

interface loginForm {
  email: string; // email and password should be encrypted upon save
  password: string;
  loginDateTime: string;
}

const emailValidation: RegisterOptions = { required: true,  }
const passwordValidation: RegisterOptions = { required: true }
function Login(): JSX.Element {


  const [session, setSession] = useState<Session | null>(null);
  const { register, handleSubmit, formState } = useForm<loginForm>({ mode: 'onChange' });
  const { isSubmitting, isValid, errors, isSubmitSuccessful } = formState;
  const navigate = useNavigate();

  const submitForm: SubmitHandler<loginForm> = (data: loginForm) => {

    supabase.auth.signInWithPassword({email: 'mark.chester.danday@gmail.com', password: 'Chester_810'}).then((auth) => {
      console.log(auth.data.session);
    }).catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    const token: string | null = window.localStorage.getItem('session');
    if(token) {
      navigate('/faculty');
    }

  }, []);



  return (
    <div className={s.login_container}>
      <div className={s.card}>
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Login Form</h1>
          <div className={s.field_wrapper}>
            <Input.Wrapper label="Email" error={errors.email ? 'Required'  : ''} withAsterisk >
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
        {/* <center>or</center> */}
        {/* <Divider></Divider> */}
        {/* <div id='firebaseui-auth-container'></div> */}
      </div>
    </div>
  )
}



export default Login