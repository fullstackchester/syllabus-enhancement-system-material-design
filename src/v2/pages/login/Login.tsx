import React, { JSX } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import s from './login.module.scss';
import { Input } from '@mantine/core';
import { Button } from '@mantine/core';

type loginForm = {
  email: string;
  password: string;
};


function Login(): JSX.Element {

  const { register, handleSubmit, formState, setValue } = useForm<loginForm>({ mode: 'onBlur' });

  const { isLoading, isSubmitting, isValid, errors, isSubmitted, isSubmitSuccessful } = formState;

  const submitForm: SubmitHandler<loginForm> = (data: loginForm) => {

  }

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
          <Button type='submit' variant="filled">Submit</Button>
        </form>
      </div>

    </div>
  )
}

export default Login