import AdminTopMenu from "../AdminTopMenu/AdminTopMenu";
import styles from "./AdminDashboard.module.scss";
import ParallaxItem from "../../ParallaxItem/ParallaxItem";
import {Button} from "@mui/material";


function AdminDashboard(): JSX.Element {
    return (

        <>
            <AdminTopMenu></AdminTopMenu>
            <div className={styles.header}>
                <div className={styles.bigText}> Administration Panel </div>
                <div className={styles.leftPanel}>
                    <Button className={styles.options}> Users </Button>
                    <Button className={styles.options}> Products </Button>
                    <Button className={styles.options}> Orders </Button>
                    <Button className={styles.options}> Statistics </Button>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard