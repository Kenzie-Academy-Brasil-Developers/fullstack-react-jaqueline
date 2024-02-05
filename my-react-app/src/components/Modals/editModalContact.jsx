import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm, useFormState } from "react-hook-form";
import { Input } from "../Inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditModalContact = ({ objectC, setConfirmEditModalContact }) => {
  // const { setConfirmEditModal } = useContext(ClientsContext);
  const { editContact } = useContext(ClientsContext);

  const { register, handleSubmit } = useForm();

  const submit = (formData) => {
    formData.clientId = Number(formData.clientId);
    console.log(formData);
    editContact(objectC.id, formData);
  };

  const clientId = localStorage.getItem("@clientId");

  return (
    <div className="confirmation-modal">
      <div className="confirmation-box">
        <form className="formEditar" onSubmit={handleSubmit(submit)}>
          <p>Editar Contato {objectC.name}?</p>
          <Input
            type="text"
            placeholder="NOME"
            {...register("name")}
            defaultValue={objectC.name}
            // error={errors.name}
          />
          <Input
            type="text"
            placeholder="EMAIL"
            // {...setValue("email", event.target.value)}
            {...register("email")}
            defaultValue={objectC.email}
            // error={errors.email}
          />
          <Input
            type="text"
            placeholder="TELEPHONE"
            {...register("telephone")}
            defaultValue={objectC.telephone}
            // error={errors.telephone}
          />

          <Input type="hidden" value={clientId} {...register("clientId")} />

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
