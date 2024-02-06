import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm, useFormState } from "react-hook-form";
import { Input } from "../Inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditModalContact = ({ objectC, setConfirmEditModalContact, clientId }) => {

  const { editContact } = useContext(ClientsContext);

  const { register, handleSubmit } = useForm();

  const submit = (formData) => {
    formData.clientId = Number(formData.clientId);
    editContact(objectC.id, clientId, formData);
  };

  // const clientId = localStorage.getItem("@clientId");

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

          />
          <Input
            type="text"
            placeholder="EMAIL"
  
            {...register("email")}
            defaultValue={objectC.email}
   
          />
          <Input
            type="text"
            placeholder="TELEPHONE"
            {...register("telephone")}
            defaultValue={objectC.telephone}
  
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
            setConfirmEditModalContact(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
