import styles from "./AdminTopMenu.module.scss";
import logo from "../../../logo.svg";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function AdminTopMenu(): JSX.Element {
    const navigate = useNavigate();
    const [transparent, setTransparent] = useState("");
    const [expandableMenuClass, setExpandableMenuClass] = useState(
        styles.expandablemenu
    );

    const expandLeftMenu = () => {
        setExpandableMenuClass(
            expandableMenuClass === styles.expandablemenu
                ? styles.expandablemenu + " " + styles.showmenu
                : styles.expandablemenu
        );
    };

    function handleScroll(event: any) {
        if (window.scrollY !== 0) {
            setTransparent(styles.colored);
        } else {
            setTransparent("");
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []); //Will only be called once upon initialization

    return (
        <>
            {/* Normal menu */}
            <div className={styles.container + " " + transparent}>
                <div className={styles.menu}>
                    <img src={logo} className={styles.logo} alt="logo"/>
                    <div className={styles.links}>
                        <div
                            title={"dashboard"}
                            className={styles.menuitem}
                            onClick={() => navigate("/admin")}
                        >
                            Dashboard
                        </div>
                        <div>
                            {/* <a href={"https://arquisoft.github.io/dede_en3a/"}> */}
                            <div
                                title={"firebase"}
                                className={styles.menuitem}
                                onClick={() => {
                                    navigate("/firebase");
                                }}
                            >
                                Firebase
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <div className={styles.mobilemenucontainer}>
                <div className={styles.menu}>
                    <span
                        className={
                            "material-icons " + styles.loginicon + " " + styles.menuicon
                        }
                        onClick={() => expandLeftMenu()}
                    >
                    menu
                    </span>
                    <img src={logo} className={styles.logo} alt="logo"/>
                </div>
            </div>

            {/* Expandable mobile left menu */}
            <div className={expandableMenuClass}>
                <div className={styles.links}>
                    <div
                        className={styles.menuitem}
                        onClick={() => {
                            navigate("/admin");
                            expandLeftMenu();
                        }}
                    >
                        Dashboard
                    </div>
                    <div
                        className={styles.menuitem}
                        onClick={() => {
                            navigate("/firebase");
                            expandLeftMenu();
                        }}
                    >
                        Firebase
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminTopMenu;