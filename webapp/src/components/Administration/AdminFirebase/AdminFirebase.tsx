import AdminTopMenu from "../AdminTopMenu/AdminTopMenu";
import styles from "./AdminFirebase.module.scss";

function AdminFirebase(): JSX.Element {
    return (
        <>
            <AdminTopMenu></AdminTopMenu>
            <iframe
                className={styles.iframecontainer}
                src="https://www.google.com"
            ></iframe>
        </>
    );
}

export default AdminFirebase;
