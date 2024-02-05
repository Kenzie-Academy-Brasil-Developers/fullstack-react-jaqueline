import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/axios";

export const ClientsContext = createContext({});

export const ClientContextProvider = ({ children }) => {
  const [allClients, setAllClients] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loadingClient, setLoadingClient] = useState(true);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
 

  const confirmRemoveContact = (contactId) => {
    setConfirmDeleteModal({
      ...confirmDeleteModal,
      [contactId]: true,
    });
  };

  const editContact = async (id, formData) => {
    const token = localStorage.getItem("@token");

    try {
      const { data } = await api.patch(`/contacts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedContacts = allContacts.map((contact) =>
        contact.id === id ? { ...contact, ...data } : contact
      );

      setAllContacts( updatedContacts);
      toast.success("Contato editado com sucesso");
      // setConfirmEditModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    }
  }

  const editClient = async (id, formData) => {
    const token = localStorage.getItem("@token");

    try {
      const { data } = await api.patch(`/clients/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedClients = allClients.map((client) =>
        client.id === id ? { ...client, ...data } : client
      );

      setAllClients(updatedClients);
      toast.success("Cliente editado com sucesso");
      // setConfirmEditModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    }
  }
  const deleteClient = async (id) => {
    const token = localStorage.getItem("@token");

    try {
      await api.delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newClientsList = allClients.filter((contact) => contact.id !== id);
      setAllClients(newClientsList);
      toast.success("Cliente e contatos do cliente excluídos com sucesso");
      setConfirmDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    }
  };

  const submitRegisterClient = async (formData) => {
    try {
      setLoadingClient(true);
      const { data } = await api.post("/clients", formData);
      toast.success("Cliente criado com sucesso");
      setAllClients([...allClients, data]);
    } catch (error) {
      toast.error("Ops! Algo deu errado");
      console.log(error);
    } finally {
      setLoadingClient(false);
    }
  };

  const deleteContact = async (id) => {
    const token = localStorage.getItem("@token");

    try {
      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContactsList = allContacts.filter(
        (contact) => contact.id !== id
      );
      setAllContacts(newContactsList);
      toast.success("Contato excluído com sucesso");
      setConfirmDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    }
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
// confirmEditClient,
        deleteClient,
        submitRegisterClient,
        loadingClient,
        setLoadingClient,
        editContact,
        deleteContact,
        editClient
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
