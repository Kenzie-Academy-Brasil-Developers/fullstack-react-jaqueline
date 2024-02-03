import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm, useFormState } from "react-hook-form";
import { Input } from "../Inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from "./editFormSchema";

export const EditModal = ({
  objectC,
  editFunction,
  contactOrClient,
  clientId,
}) => {
  const { setConfirmEditModal } = useContext(ClientsContext);

  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields, errors },

  } = useForm({
    resolver: zodResolver(editSchema), defaultValues: { 'email': objectC.email }
  });
  const { setValue } = useForm()

  const submit = (formData) => {
    if (formData.email !== objectC.email) {
      // Se for diferente, envia a requisição PATCH com o novo valor do email
      editFunction(objectC.id, formData);
    } else {
      // Se for o mesmo, não faz nada ou mostra uma mensagem informando que o email não foi alterado
      console.log('O email não foi alterado.');
    }
  };

  return (
    <div className="confirmation-modal">
      <div className="confirmation-box">
        <form className="formEditar" onSubmit={handleSubmit(submit)}>
          <p>
            Editar {contactOrClient} {objectC.name}?
          </p>
          <Input
            type="text"
            placeholder="NOME"
            {...register("name")}
            defaultValue={objectC.name}
            error={errors.name}
          />
          <Input
            type="text"
            placeholder="EMAIL"
            onChange={event => {
              setValue('email', event.target.value);
          }}
            {...isDirty ? { ...register("email") } : {}}
            defaultValue={objectC.email}
            error={errors.email}
          />
          <Input
            type="text"
            placeholder="TELEPHONE"
            {...register("telephone")}
            defaultValue={objectC.telephone}
            error={errors.telephone}
          />
          <Input
            type="number"
            disabled
            style={{ visibility: "hidden" }}
            value={clientId}
            {...register("clientId")}
          />

          <div className="confirmation-buttons">
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </div>
        </form>
        <button
          className="cancel-button"
          onClick={() => {
            setConfirmEditModal(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
