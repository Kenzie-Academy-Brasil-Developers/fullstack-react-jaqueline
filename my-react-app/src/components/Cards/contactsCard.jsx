import { useContext } from "react";
import { DeleteModal } from "../Modals/deleteModal";
import styles from "./styles.module.scss";
import { ClientsContext } from "../../providers/clientsContext";
import { EditModal } from "../Modals/editModal";

export const ContactCard = ({ contact, deleteContact, editContact, clientId }) => {
  const { confirmRemoveContact, confirmDeleteModal, confirmEditContact, confirmEditModal } =
    useContext(ClientsContext);

  return (
    <>
      <li className={`${styles.itensCard}`}>
        <p>
          Nome do contato: <strong>{contact.name}</strong>
        </p>
        <p>
          Email: <strong>{contact.email}</strong>
        </p>
        <p>
          Telefone: <strong>{contact.telephone}</strong>
        </p>
        <button onClick={() => confirmEditContact(contact.id)}>Editar</button>
        {confirmEditModal[contact.id] ? (
          <EditModal
            editFunction={editContact}
            objectC={contact}
            contactOrClient={"contato"}
            clientId={clientId}
          />
 
        ) : null}

        <button onClick={() => confirmRemoveContact(contact.id)}>
          Deletar
        </button>

        {confirmDeleteModal[contact.id] ? (
          <DeleteModal
            deleteFunction={deleteContact}
            object={contact}
            contactOrClient={"contato"}
          />
        ) : null}
      </li>
    </>
  );
};
