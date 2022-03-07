import React, {ChangeEvent, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import {addUser} from "../../api/api";

export function Register(){

    const [user, setUser] = useState({
        email:'',
        password:''
    });

   const {signup} = useAuth();
   const navigate = useNavigate();

    const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: e.currentTarget.value});
        console.log(e.currentTarget.name,e.currentTarget.value);
    }


    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: e.currentTarget.value});
        console.log(e.currentTarget.name,e.currentTarget.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(user);
        try{
            let obtained = await signup(user.email,user.password);


//HAY Q REGISTRAR EN BD AL AÑADIR USUARIO
            navigate("/");
        }catch(error){
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        }

    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email</label>
            <input type={"email"} name="email" placeholder={"youremail@goes.here"}
            onChange={handleChangeEmail}/>

            <label htmlFor={"password"}>Password</label>
            <input type={"password"} name="password" id={"password"} onChange={handleChangePassword}/>

            <button>Register</button>
        </form>
    );
}