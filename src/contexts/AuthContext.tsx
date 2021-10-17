import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { recoverUserInformation, signInRequest } from "../services/auth";
import { setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextType)

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>
}

type  SignInData ={
    email: string;
    password: string;
}
type ProviderType = {
    children: ReactNode
} 

type User= {
    name: string;
    email: string;
    avatar_url: string;
}

export function AuthProvider({children}: ProviderType){

    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user;

    useEffect(() =>{
        const { 'nextauth.token': token } = parseCookies()

        if(token){
            recoverUserInformation().then(response =>{
              setUser(response.user)
         })
        }
    }, [])


    //A função signIn é o lugar correto para fazer a chamada para API com fetch ou Axios
    //Enviar os dados de Email e Senha do nosso user
    //Trazer o Token JWT e guardar esse token em algum lugar Ex:(cookies, localStorage)
    async function signIn({ email , password }: SignInData){

        const { token, user } = await signInRequest({
            email,
            password
        })
        //setCookie recebe 4 parâmetros (Contexto da requisição | Nome do cookie | valor do token | )
        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1  //1 Hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(user)

        Router.push('/dashboard')
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated , signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

//Por que criar a função Sign dentro do contexto e não só na pagina de Login? 20:57

//Por que usar cookie ao invés de localStorage para salvar o token? 29:30