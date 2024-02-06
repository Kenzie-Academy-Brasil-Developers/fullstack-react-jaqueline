import { useContext, useState } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm } from "react-hook-form";
import { Input } from "../Inputs/input";

export const EditModalClient = ({ objectC, setConfirmEditModalClient }) => {
  const { editClient } = useContext(ClientsContext);
  
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({ defaultValues: { email: objectC.email } });


  const submit = (formData) => {
    const { email } = formData;

     if (dirtyFields.email && dirtyFields.email !== objectC.email) {
    console.log("O e-mail foi modificado");
    editClient(objectC.id, formData);
  } else if (!dirtyFields.email && email !== objectC.email) {
    console.log("O e-mail foi mantido, mas o campo está sujo");
    editClient(objectC.id, formData);
  } else {
    console.log("Nenhuma alteração no e-mail ou no campo");
    delete formData.email;
    editClient(objectC.id, formData);
  }
};

  return (
    <div className="confirmation-modal">
      <div className="confirmation-box">
        <form className="formEditar" onSubmit={handleSubmit(submit)}>
          <p>Editar cliente {objectC.name}?</p>
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

          <div className="confirmation-buttons">
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </div>
        </form>
        <button
          className="cancel-button"
          onClick={() => {
            setConfirmEditModalClient(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
