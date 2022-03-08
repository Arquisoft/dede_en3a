import React, {ChangeEvent, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import {addUser} from "../../api/api";
import firebase from "firebase/compat";
import {Exception} from "sass";

export function Register(){

    const [user, setUser] = useState({
        email:'',
        password:'',
        name:''
    });

   const {signup} = useAuth();
   const navigate = useNavigate();

   const [error,setError] = useState();

    const handleChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: e.currentTarget.value});
        console.log(e.currentTarget.name,e.currentTarget.value);
    }


    const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: e.currentTarget.value});
        console.log(e.currentTarget.name,e.currentTarget.value);
    }

    const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, name: e.currentTarget.value});
        console.log(e.currentTarget.name,e.currentTarget.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(user);
        try{
            await signup(user.email,user.password)
                .then((userCredential) => {
                    console.log("User: " + userCredential.user, "ProviderId: " + userCredential.providerId);
                });

            await addUser({
                name: user.name,
                email: user.email
            });



            navigate("/");
        }catch(error : any ){
            setError(error.message);
        }

    }

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type={"email"} name="email" placeholder={"youremail@goes.here"}
                       onChange={handleChangeEmail}/><br/>

                <label htmlFor="name">Name & Surname</label>
                <input type={"text"} name="name" placeholder={"your name and surname"}
                       onChange={handleChangeName}/><br/>
                <label htmlFor={"password"}>Password</label>
                <input type={"password"} name="password" id={"password"} onChange={handleChangePassword}/><br/>

                <button>Register</button>
            </form>

        </div>
    );
}