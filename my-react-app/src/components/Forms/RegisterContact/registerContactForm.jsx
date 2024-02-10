import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Inputs/input";
import { toast } from "react-toastify";
import { api } from "../../../api/axios";
import { registerContactSchema } from "./registerContactFormSchema";
import { useContext } from "react";
import { ClientsContext } from "../../../providers/clientsContext";

export const RegisterContactForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerContactSchema),
  });

  const { setAllContacts, allContacts } = useContext(ClientsContext);


  const clientID = Number(JSON.parse(localStorage.getItem("@clientId")));

  const submitRegisterContact = async (formData) => {
    try {
      const { data } = await api.post("/contacts", formData);
      toast.success("Contato criado com sucesso");
      setAllContacts([...allContacts, data]);
    } catch (error) {
      toast.error("Ops! Algo deu errado");
      console.log(error);
    }
    reset();
  };

  const submit = (formData) => {
    formData.clientId = Number(formData.clientId);
    submitRegisterContact(formData);
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

          <input
            type="hidden"
            {...register("clientId")}
            defaultValue={parseInt(clientID)}
            error={errors.clientId}
          />

          <button type="submit" className="btn__black login">
            CADASTRAR CONTATO
          </button>
        </div>
      </form>
    </>
  );
};
