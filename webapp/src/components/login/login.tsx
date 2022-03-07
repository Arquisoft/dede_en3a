import {Routes,Route} from 'react-router-dom';

export function Login(){
    return (
        <div>

            <form>

                <input type="email" name="emailLogin" id="emailLogin"/>
                <input type="password" name="passwdLogin" id="passwdLogin"/>
            </form>

        </div>
    );

}