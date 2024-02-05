import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { DeleteModal } from "../Modals/deleteModal";
import { useContext, useState } from "react";
import { ClientsContext } from "../../providers/clientsContext";
import { EditModalClient } from "../Modals/editModalClient";

export const ClientCard = ({
  client,
  // confirmEditClient,
  // confirmEditModalClient,
}) => {
  const { confirmRemoveContact, confirmDeleteModal, editClient, deleteClient } =
    useContext(ClientsContext);
  const [confirmEditModalClient, setConfirmEditModalClient] = useState(false);

  const confirmEditClient = (client_Id) => {
    setConfirmEditModalClient({ [client_Id]: true });
  };


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
        <Link
          to={`/admin/${client.id}/client-contacts`}
          onClick={() => localStorage.setItem("@clientId", client.id)}
          className={`btn__white`}
        >
          Visualizar contatos do cliente
        </Link>
        <button onClick={() => confirmEditClient(client.id)}>Editar</button>
        <button onClick={() => confirmRemoveContact(client.id)}>Deletar</button>

   
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
