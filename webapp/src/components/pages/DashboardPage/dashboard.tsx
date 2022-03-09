import './dashboard.scss'
import {useAuth} from "../../../context/AuthContext";
import TopMenu from "../../menu/TopMenu";

export function Dashboard() {

    const {getCurrentUser} = useAuth();

    return (
        <>
            <TopMenu></TopMenu>

            <div className={"login-page-container"}>


                <h1>DASHBOARD</h1><br/>
                <p>You are logged in as: </p><br/>
                <p>{getCurrentUser()?.email}</p><br/>

            </div>

        </>
    );
}