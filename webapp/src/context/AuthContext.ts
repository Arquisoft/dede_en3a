
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../utils/firebase'
import {createContext,useContext} from "react";
import {UserCredential,User} from 'firebase/auth';
import {logInUser, signUpUser} from "../api/api";





export function getCurrentUser() : User|null{
    return auth.currentUser;
}



const signup = async (email:string,password:string) =>{
    const userCredentials : UserCredential = await signUpUser(auth, email, password);



    console.log(getCurrentUser());
    return userCredentials;
}

const login =async (email:string,password:string) =>{
    const userCredentials : UserCredential = await logInUser(auth,email,password);


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



