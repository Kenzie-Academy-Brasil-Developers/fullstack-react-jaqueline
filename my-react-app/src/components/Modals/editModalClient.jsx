import { useContext } from "react";
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
    const initialEmail = { defaultValues: { email: objectC.email } };
    const sameEmail = formData.email === initialEmail;
    if (dirtyFields.email || sameEmail) {
      editClient(objectC.id, formData);
    } else if (!dirtyFields.email) {
      delete formData.email;
      editClient(objectC.id, formData);
    } else {
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
            // error={errors.name}
          />
          <Input
            type="text"
            placeholder="EMAIL"
            //   {...setValue('email', event.target.value)}

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
