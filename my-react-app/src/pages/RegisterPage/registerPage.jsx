import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { LoginContext } from "../../providers/loginContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "./registerPageFormSchema";
import styles from "./styles.module.scss";
import { Input } from "../../components/Inputs/input";
import { Link } from "react-router-dom";
import register2 from "../../assets/Register.png";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { submitRegister } = useContext(LoginContext);

  return (
    <div className="container containerLoginRegister">
       
      <form onSubmit={handleSubmit(submitRegister)}>
      <div className={styles.login}>
      <div className={styles.form}>
      <h3 className="title one">Cadastre-se</h3>

<h2 className="title three">e crie uma agenda de contatos</h2>
        <Input
          type="text"
          placeholder="NOME"
          {...register("name")}
          error={errors.name}
        />
        <Input
          type="email"
          placeholder="E-MAIL"
          {...register("email")}
          error={errors.email}
        />
        <Input
          type="text"
          placeholder="TELEFONE"
          {...register("telephone")}
          error={errors.telephone}
        />
        <Input
          placeholder="SENHA"
          type="password"
          {...register("password")}
          error={errors.password}
        />
        <Input
          placeholder="CONFIRMAR SENHA"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <div className="buttons">
          <button type="submit" className="btn__black login">
            CADASTRAR
          </button>
          <Link to="/" className="btn__white">
            LOGIN
          </Link>
        </div>
        </div>
        </div>
      </form>
      <img src={register2}  alt="logo register" />
    </div>

  );
};
