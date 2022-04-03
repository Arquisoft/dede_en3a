import TopMenu from "../../menu/TopMenu";
import "./ContactPage.scss";

function ContactPage():JSX.Element{
    return(
        <>
            <TopMenu></TopMenu>
            <div className="header-container">
                <div className="header">
                    <div title={"contact"} className="title">Contact</div>
                    <div className="subtitle">
                        <img title={"contactImage"} src={"https://logodix.com/logo/1288191.png"} width={"50"} height={"50"}/>
                        <p>Email: dedeen3a@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactPage;