
import React from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../utils/firebase'
import {createContext,useContext} from "react";




const signup =async (email:string,password:string) =>{
   return await createUserWithEmailAndPassword(auth,email,password);
}

export const authContext = createContext({signup});


export const useAuth=()=>{
    const context = useContext(authContext);
    if(!context) throw new Error('No auth provider');

    return context;
}

export function AuthProvider(children : Element){

    return(
        <authContext.Provider value={{signup}}> {{children}} </authContext.Provider>
    );
}


/*
class AuthContext{

    private static instance: AuthContext;
    private static userLogged : User;
    private static auth : typeof auth;

    public static getInstance(): AuthContext {
        if (!AuthContext.instance) {
            AuthContext.instance = new AuthContext();
        }

        return AuthContext.instance;
    }


    private constructor() { }

    public static setUserLogged(newUser : User) : void{
        this.userLogged = newUser;
    }

    public static logOut() : void{
        this.userLogged = {name:'',email:''};
    }


    public static signup(email:string,password:string):void{
        console.log(email,password);
    }

}*/


