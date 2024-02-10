import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { useForm } from "react-hook-form";
import { Input } from "../Inputs/input";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";

export const EditModalContact = ({
  objectC,
  setConfirmEditModalContact,
  clientId,
}) => {
  const { editContact } = useContext(ClientsContext);

  const { register, handleSubmit } = useForm();

  const submit = (formData) => {
    formData.clientId = Number(formData.clientId);
    editContact(objectC.id, clientId, formData);
    setConfirmEditModalContact(false);
  };

  return (
    <div className="dialog">
      <div className="modalBox">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Editar contato </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

              <button className="btn__black" type="submit">
                CONFIRMAR
              </button>

              <button
                className="btn__white"
                onClick={() => {
                  setConfirmEditModalContact(false);
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
