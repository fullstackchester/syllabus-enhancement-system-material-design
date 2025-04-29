import React, { JSX, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import s from './login.module.scss';
import { Input, Button } from '@mantine/core';


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
    </div>
  )
}

export default Login