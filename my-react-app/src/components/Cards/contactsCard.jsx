import { useContext, useState } from "react";
import { DeleteModal } from "../Modals/deleteModal";
import styles from "./styles.module.scss";
import { ClientsContext } from "../../providers/clientsContext";
import { EditModalContact } from "../Modals/editModalContact";

export const ContactCard = ({
  contact,
}) => {
  const { confirmRemoveContact, confirmDeleteModal, deleteContact } =
    useContext(ClientsContext);

    const [confirmEditModalContact, setConfirmEditModalContact] = useState(false);


  // const editContact = async (id, formData) => {
  //   const token = localStorage.getItem("@token");

  //   try {
  //     const { data } = await api.patch(`/contacts/${id}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const updatedContacts = allContacts.map((contact) =>
  //       contact.id === id ? { ...contact, ...data } : contact
  //     );

  //     setAllContacts(updatedContacts);
  //     toast.success("Contato editado com sucesso");
  //     setConfirmEditModal(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Ops alguma coisa deu errado!");
  //   }
  // };

  // const confirmEditContact = (contactId) => {
  //   setConfirmEditModal({
  //     ...confirmEditModal,
  //     [contactId]: true,
  //   });
  // };

  const confirmEditContact = (contactId) => {
    setConfirmEditModalContact({ [contactId]: true });
  };


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
        {confirmEditModalContact ? (
          <EditModalContact
          key={contact.id}
          setConfirmEditModalContact={setConfirmEditModalContact}
          
            objectC={contact}
       
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
