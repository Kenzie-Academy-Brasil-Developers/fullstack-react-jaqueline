import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { DeleteModal } from "../Modals/deleteModal";
import { useContext } from "react";
import { ClientsContext } from "../../providers/clientsContext";

export const ClientCard = ({ client, deleteClient }) => {
  const { confirmRemoveContact, confirmDeleteModal } = useContext(ClientsContext);

  return (
    <>
      <li className={`${styles.itensCard}`}>
        <p>
          Nome do cliente: <strong>{client.name}</strong>
        </p>
        <p>
          Email: <strong>{client.email}</strong>
        </p>
        <p>
          Telefone: <strong>{client.telephone}</strong>
        </p>
        <Link to={`/admin/${client.id}/client-contacts`}  className={`btn__white`}>
              Visualizar contatos do cliente
            </Link>
        <button>Editar</button>
        <button onClick={() => confirmRemoveContact(client.id)}>Deletar</button>

        {confirmDeleteModal[client.id] ? (
          <DeleteModal deleteFunction={deleteClient} contactOrClient={"cliente"} object={client} />
        ) : null}

      </li>
    </>
  );
};
