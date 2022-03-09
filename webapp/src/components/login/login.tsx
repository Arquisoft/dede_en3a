import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
//import {addUser} from "../../api/api";
//import firebase from "firebase/compat";
//import {Exception} from "sass";

export function Login(){

    const [user, setUser] = useState({
        email:'',
        password:''
    });

    const {login} = useAuth();
    const navigate = useNavigate();

    const [error,setError] = useState('');

    const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: e.currentTarget.value});

    }


    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: e.currentTarget.value});

    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError('')
        console.log(user);
        try{
            await login(user.email,user.password)
                .then((userCredential) => {

                });


            navigate("/");
        }catch(error : any ){
            if(error.code === "auth/user-not-found"){
                setError('User not found');
            }else if(error.code === 'auth/wrong-password'){
                setError('Wring password for provided user');
            }
            else{
                setError(error.message);
            }

        }

    }



    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type={"email"} name="email" placeholder={"youremail@goes.here"}
                       onChange={handleChangeEmail}/><br/>


                <label htmlFor={"password"}>Password</label>
                <input type={"password"} name="password" id={"password"}
                       onChange={handleChangePassword} placeholder={"******"}/><br/>

                <button>Login</button>
            </form>

        </div>
    );
}