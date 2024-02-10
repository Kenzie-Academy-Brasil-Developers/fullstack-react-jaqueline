import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const DeleteModal = ({
  object,
  deleteFunction,
  contactOrClient,
  clientId,
}) => {
  const { setConfirmDeleteModal } = useContext(ClientsContext);

  return (
    <div className="dialog">
    <div className="modalBox">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Apagar {contactOrClient} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Tem certeza de que deseja apagar o {contactOrClient} {object.name}?
        </p>

        <button
          className="btn__red"
          onClick={() => deleteFunction(object.id, clientId)}
          >
          CONFIRMAR
        </button>
        <button
          className="btn__white"
          onClick={() => {
            setConfirmDeleteModal(false);
          }}
        >
          CANCELAR
        </button>
          </Modal.Body>

    </Modal.Dialog>
    </div>
    </div>
  );
};
