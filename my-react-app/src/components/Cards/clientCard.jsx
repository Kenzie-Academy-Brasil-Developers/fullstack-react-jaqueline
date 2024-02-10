import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { DeleteModal } from "../Modals/deleteModal";
import { useContext, useState } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { EditModalClient } from "../Modals/editModalClient";

export const ClientCard = ({ client }) => {
  const { confirmRemoveContact, confirmDeleteModal, deleteClient } =
    useContext(ClientsContext);
  const [confirmEditModalClient, setConfirmEditModalClient] = useState(false);

  const confirmEditClient = (client_Id) => {
    setConfirmEditModalClient({ [client_Id]: true });
  };

  return (
    <>
      <li className={`${styles.itensCard} li`}>
        <div >

        <p>
          Nome do cliente: <strong>{client.name}</strong>
        </p>
        <div className={`${styles.itensP}`}>
        <p>
          Email: <strong>{client.email}</strong>
        </p>
        <p>
          Telefone: <strong>{client.telephone}</strong>
        </p>
          </div>
        </div>
        <div>
          <Link
            to={`/admin/${client.id}/client-contacts`}
            onClick={() => localStorage.setItem("@clientId", client.id)}
            className={`btn__white`}
          >
            Visualizar contatos do cliente
          </Link>
          <div>

          <button
            className={`btn__black`}
            onClick={() => confirmEditClient(client.id)}
          >
            EDITAR
          </button>
          <button
            className={`btn__red`}
            onClick={() => confirmRemoveContact(client.id)}
          >
            DELETAR
          </button>
          </div>
        </div>
        {confirmEditModalClient ? (
          <EditModalClient
            key={client.id}
            setConfirmEditModalClient={setConfirmEditModalClient}
            objectC={client}
          />
        ) : null}

        {confirmDeleteModal[client.id] ? (
          <DeleteModal
            deleteFunction={deleteClient}
            contactOrClient={"cliente"}
            object={client}
          />
        ) : null}
      </li>
    </>
  );
};
