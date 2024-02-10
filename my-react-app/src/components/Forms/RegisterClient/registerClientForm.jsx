import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerFormSchema";
import { Input } from "../../Inputs/input";
import { Link } from "react-router-dom";

export const RegisterClientForm = forwardRef(
  ({ classNameLoginButton, registerButton, registerFunction }, ref) => {
    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(registerSchema),
    });

    const submit = (formData) => {

      formData.email = formData.email.toLowerCase();
      registerFunction(formData);
    };

    return (
      <>
        <form onSubmit={handleSubmit(submit)}>
          <div>
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
                {registerButton}
              </button>
              <Link
                to="/"
                ref={ref}
                className={`${classNameLoginButton} btn__white`}
              >
                LOGIN
              </Link>
            </div>
          </div>
        </form>
      </>
    );
  }
);
