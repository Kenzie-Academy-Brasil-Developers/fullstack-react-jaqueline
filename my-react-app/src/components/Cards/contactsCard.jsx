import { useContext, useState } from "react";
import { DeleteModal } from "../Modals/deleteModal";
import styles from "./styles.module.scss";
import { ClientsContext } from "../../providers/clientsContext";
import { EditModalContact } from "../Modals/editModalContact";

export const ContactCard = ({ contact }) => {
  const { confirmRemoveContact, confirmDeleteModal, deleteContact } =
    useContext(ClientsContext);

  const [confirmEditModalContact, setConfirmEditModalContact] = useState(false);

  const confirmEditContact = (contactId) => {
    setConfirmEditModalContact({ [contactId]: true });
  };

  const clientId = localStorage.getItem("@clientId");

  return (
    <>
      <li className={`${styles.itensCard} li`}>
        <div >
          <p>
            Nome do contato: <strong>{contact.name}</strong>
          </p>
          <div className={`${styles.itensP}`}>
            <p>
              Email: <strong>{contact.email}</strong>
            </p>
            <p>
              Telefone: <strong>{contact.telephone}</strong>
            </p>
          </div>
        </div>
        <div>
          <button
            className={"btn__black"}
            onClick={() => confirmEditContact(contact.id)}
          >
            EDITAR
          </button>
          <button
            className={"btn__red"}
            onClick={() => confirmRemoveContact(contact.id)}
          >
            DELETAR
          </button>
        </div>

        {confirmEditModalContact ? (
          <EditModalContact
            key={contact.id}
            setConfirmEditModalContact={setConfirmEditModalContact}
            objectC={contact}
            clientId={clientId}
          />
        ) : null}

        {confirmDeleteModal[contact.id] ? (
          <DeleteModal
            deleteFunction={deleteContact}
            object={contact}
            contactOrClient={"contato"}
            clientId={clientId}
          />
        ) : null}
      </li>
    </>
  );
};
