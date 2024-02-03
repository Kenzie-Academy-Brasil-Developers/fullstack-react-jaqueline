import styles from "./styles.module.scss";
import { useContext } from "react";
import { LoginContext } from "../../providers/loginContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../HomePage/homePageFormSchema";
import { Input } from "../../components/Inputs/input";
import { Link } from "react-router-dom";
import login from "../../assets/Login.png";

export const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { submitLogin } = useContext(LoginContext);

  return (
    <div className="container containerLoginRegister">
      <img src={login} className="logo" alt="logo login" />
      <form onSubmit={handleSubmit(submitLogin)} className={styles.form}>
        <div className={styles.login}>
          <div className={styles.form}>
          <h3 className="title one">Olá!</h3>

          <h2 className="title three">acesse sua agenda de contatos</h2>
          <Input
            type="text"
            placeholder="E-MAIL"
            {...register("email")}
            error={errors.email}
          />
          <Input
            placeholder="SENHA"
            type="password"
            {...register("password")}
            error={errors.password}
          />

          <div className="buttons">
            <button className="btn__black login">ACESSAR</button>
            <Link to="/register" className="btn__white">
              CADASTRE-SE
            </Link>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};
