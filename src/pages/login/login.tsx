import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { createClient } from '@supabase/supabase-js';
import { type JSX } from 'react';
import classes from './login.module.css';
import { useNavigate } from 'react-router';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supbaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supbaseKey) {
    throw new Error('Missing REACT_APP_SUPABASE_URL environment variable');
}
const supabase = createClient(supabaseUrl, supbaseKey);


function LoginPage(): JSX.Element {

    const [loading, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const loginForm = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
            persistLogin: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (pw) => pw.length <= 0 ? 'Password is required' : null
        },
    });

    async function signInWithEmail(email: string, password: string) {
        open()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (data && data.user && data.session) {
            localStorage.setItem('auth', JSON.stringify(data));
            close();
            navigate('/faculty');
        }

        if (error) {
            console.error(error)
            close();
        }
    }


    return (
        <form className={classes.wrapper} onSubmit={(e) => { e.preventDefault(); signInWithEmail(loginForm.values.email, loginForm.values.password) }}>
            <Paper className={classes.form}>
                <Title order={1} className={classes.title}>
                    CICT PORTAL
                    <Text c="dimmed">Syllabus Management System for Faculties</Text>
                </Title>

                <TextInput
                    label="Email address"
                    placeholder="hello@gmail.com"
                    size="sm"
                    radius="md"
                    key={loginForm.key('email')}
                    {...loginForm.getInputProps('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="sm"
                    radius="md"
                    key={loginForm.key('password')}
                    {...loginForm.getInputProps('password')}
                />

                <Checkbox label="Keep me logged in" mt="xl" size="xs" key={loginForm.key('persistLogin')} {...loginForm.getInputProps('persistLogin')} />
                <Button fullWidth mt="xl" size="md" radius="xl" type='submit' loading={loading}>
                    Login
                </Button>

                <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </form>
    )
}

export default LoginPage