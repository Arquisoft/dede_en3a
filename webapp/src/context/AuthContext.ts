
import React from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import {auth} from '../utils/firebase'
import {createContext,useContext} from "react";
import {UserCredential} from 'firebase/auth';
import {useEffect,useState} from 'react';
//import firebase from "firebase/compat";
import {User} from 'firebase/auth';
import {jsx} from "@emotion/react";


var currentUser : any = null

function setUser(user:User|null){
    currentUser = user;
}

export function getCurrentUser() : User|null{
    return currentUser;
}



const signup = async (email:string,password:string) =>{
    const userCredentials : UserCredential = await createUserWithEmailAndPassword(auth,email,password);


    setUser(userCredentials.user);
    console.log(getCurrentUser());
    return userCredentials;
}

const login =async (email:string,password:string) =>{
    const userCredentials : UserCredential = await signInWithEmailAndPassword(auth,email,password);


    setUser(userCredentials.user);
    console.log(getCurrentUser());
    return userCredentials;
}


export const authContext = createContext({signup,login, getCurrentUser});

export const useAuth=()=>{
    const context = useContext(authContext);
    if(!context) throw new Error('No auth provider');

    return context;
}

/*
export function AuthProvider(children : React.ReactChildren) {



//This function prints UserCredentials info once it is loaded
//The function triggers when a user logs in/out
    useEffect(() => {
        console.log('auth provider loader');
        onAuthStateChanged(auth,
            currentUser =>{
                console.log("Logeado: " + currentUser);

                setUser(currentUser);


            }
        );
    }, []);

    return(
        <authContext.Provider value={{signup,login,currentUser}}> {{children}} </authContext.Provider>
    );
}*/



