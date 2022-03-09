

import {useAuth} from "../../context/AuthContext";

export function Dashboard(){

    const {getCurrentUser} = useAuth();

    return (<div>

        <h1>DASHBOARD</h1>
        <p>You are logged in as: </p>
        <p>{getCurrentUser()?.email}</p>

    </div>);
}