import { Button, Divider, Input } from '@mantine/core';
import { JSX, useEffect } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import s from './login.module.scss';

import '../../../../node_modules/firebaseui/dist/firebaseui.css';
import { emailValidator } from './auth.functions';





// const authUiInstance = new authUi.AuthUI(auth);

interface loginForm {
  email: string; // email and password should be encrypted upon save
  password: string;
  loginDateTime: string;
}

const emailValidation: RegisterOptions = { required: true,  }
const passwordValidation: RegisterOptions = { required: true }
function Login(): JSX.Element {


  const { register, handleSubmit, formState } = useForm<loginForm>({ mode: 'onChange' });

  const { isSubmitting, isValid, errors, isSubmitSuccessful } = formState;  

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

    console.log()

  }, [isSubmitSuccessful])

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