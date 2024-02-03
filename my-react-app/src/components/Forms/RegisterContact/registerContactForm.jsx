import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerContactSchema } from "./registerContactFormSchema";
import { Input } from "../../Inputs/input";
import { ClientsContext } from "../../../providers/clientsContext";

// const { allContacts, setAllContacts } = useContext(ClientsContext);

export const RegisterContactForm = ({ submitRegisterContact }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerContactSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitRegisterContact)}>
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
            type="text"
            {...register("clientId")}
            error={errors.clientId}
          />

          <div className="buttons">
            <button type="submit" className="btn__black login">
              CADASTRAR CONTATO
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
