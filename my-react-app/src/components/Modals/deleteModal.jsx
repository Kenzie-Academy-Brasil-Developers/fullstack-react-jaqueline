import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";

export const DeleteModal = ({ object, deleteFunction, contactOrClient, clientId }) => {
  const { setConfirmDeleteModal } = useContext(ClientsContext);

 

  return (
    <div className="confirmation-modal">
      <div className="confirmation-box">
        <p>Tem certeza de que deseja apagar o {contactOrClient} {object.name}?</p>
        <div className="confirmation-buttons">
          <button
            className="confirm-button"
            onClick={() => (deleteFunction(object.id, clientId))}
          >
            Confirmar
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setConfirmDeleteModal(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
