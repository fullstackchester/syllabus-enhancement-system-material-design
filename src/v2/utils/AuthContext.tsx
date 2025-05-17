import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { AuthChangeEvent, createClient, Session } from '@supabase/supabase-js';

type AuthContextType = {
    session: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL ? process.env.REACT_APP_SUPABASE_URL : '';
const SUPABASE_KEY: string = process.env.REACT_APP_SUPABASE_KEY ? process.env.REACT_APP_SUPABASE_KEY : '';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)



interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {

    const [session, setSession] = useState<any>(undefined);

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {

            if (_event === 'SIGNED_IN') {
                window.localStorage.setItem('session', session ? JSON.stringify(session) : '');
            }

            if (_event === 'SIGNED_OUT') {
                window.localStorage.removeItem('session');
            }
        });


    }, [])

    return (
        <AuthContext.Provider value={{session}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}