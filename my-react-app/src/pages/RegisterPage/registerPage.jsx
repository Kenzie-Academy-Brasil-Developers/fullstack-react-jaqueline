import styles from "./styles.module.scss";
import register2 from "../../assets/Register.png";
import { RegisterClientForm } from "../../components/Forms/RegisterClient/registerClientForm";
import { useContext } from "react";
import { LoginContext } from "../../providers/loginContext";

export const RegisterPage = () => {
  const { submitRegister } = useContext(LoginContext);

  return (
    <>
      <div className="container containerLoginRegister">
        <div className={styles.width}>
          <div>
            <h3 className="title one">Cadastre-se</h3>

            <h2 className="title three">e crie uma agenda de contatos</h2>
          </div>
          <RegisterClientForm
            registerButton="CADASTRAR"
            registerFunction={submitRegister}
          />
        </div>
        <div className={styles.width}>
          <img src={register2} alt="logo register" />
        </div>
      </div>
    </>
  );
};
