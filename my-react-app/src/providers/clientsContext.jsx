import { createContext, useState } from "react";

export const ClientsContext = createContext({});

export const ClientContextProvider = ({ children }) => {
  const [allClients, setAllClients] = useState([]);
  const [allContacts, setAllContacts] = useState([]);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [confirmEditModal, setConfirmEditModal] = useState(false);

  const confirmRemoveContact = (contactId) => {
    setConfirmDeleteModal({
      ...confirmDeleteModal,
      [contactId]: true,
    });
  };

  const confirmEditContact = (contactId) => {
    setConfirmEditModal({
      ...confirmEditModal,
      [contactId]: true,
    });
  };

  return (
    <ClientsContext.Provider
      value={{
        allClients,
        setAllClients,
        allContacts,
        setAllContacts,
        confirmRemoveContact,
        confirmDeleteModal,
        setConfirmDeleteModal,
        confirmEditModal,
        setConfirmEditModal,
        confirmEditContact,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
