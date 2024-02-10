import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm } from "react-hook-form";
import { Input } from "../Inputs/input";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";

export const EditModalClient = ({ objectC, setConfirmEditModalClient }) => {
  const { editClient } = useContext(ClientsContext);

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({ defaultValues: { email: objectC.email } });

  const submit = (formData) => {
    const { email } = formData;
    formData.email = formData.email.toLowerCase();

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

    setConfirmEditModalClient(false)
  };

  return (
    <div className="dialog">
    <div className="modalBox">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Editar cliente </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <button  className="btn__black"   type="submit">
            CONFIRMAR
          </button>

        <button
           className="btn__white"
          onClick={() => {
            setConfirmEditModalClient(false);
          }}
          >
          CANCELAR
        </button>
            </form>
            </Modal.Body>


    </Modal.Dialog>
    </div>
    </div>
  );
};
