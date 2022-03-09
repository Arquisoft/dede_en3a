import TopMenu from "../../menu/TopMenu";
import "./RegisterPage.scss";

type RegisterPage = {};

function RegisterPage(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>
      <div className="register-page-container"></div>
    </>
  );
}

export default RegisterPage;
