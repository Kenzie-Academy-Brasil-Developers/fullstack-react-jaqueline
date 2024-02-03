import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import { useContext, useEffect, useState } from "react";
import { RegisterContactForm } from "../../components/Forms/RegisterContact/registerContactForm";
import { ClientsContext } from "../../providers/clientsContext";
import { api } from "../../api/axios";
import { ContactCard } from "../../components/Cards/contactsCard";
import Gear from "../../assets/Gear.svg";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export const AdminContactsPage = () => {
  const { idParam } = useParams();
  const [clientId, setClientId] = useState([]);
  const [client, setClient] = useState([]);
  const {
    allContacts,
    setAllContacts,
    setConfirmDeleteModal,
    setConfirmEditModal,
  } = useContext(ClientsContext);
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    const getAllContactsFromClient = async () => {
      try {
        setLoadingContacts(true);
        const token = localStorage.getItem("@token");
        const { data } = await api.get(`/clients/${idParam}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllContacts(data.contacts);
        setClientId(data.client.id);
        setClient(data.client);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingContacts(false);
      }
    };
    getAllContactsFromClient();
  }, []);

  const submitRegisterContact = async (formData) => {
    try {
      const { data } = await api.post("/contacts", formData);
      toast.success("Contato criado com sucesso");
      setAllContacts([...allContacts, data]);
    } catch (error) {
      toast.error("Ops! Algo deu errado");
      console.log(error);
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

      setAllContacts(updatedContacts);
      toast.success("Contato editado com sucesso");
      setConfirmEditModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    }
  };

  return (
    <>
      <Header link="/admin" />
      <div className={`container ${styles.containerAdmin}`}>
        <div>
          <div className={`${styles.create}`}>
            <p>CRIE UM CONTATO</p>
            <RegisterContactForm
              submitRegisterContact={submitRegisterContact}
            />
          </div>
          <div>
            <p>contatos do cliente {client.name}</p>
            <p>buscar contatos</p>
          </div>

          <div>
            {loadingContacts ? (
              <>
                <p>Carregando informações...</p>
                <img src={Gear} alt="Carregando..." />
              </>
            ) : (
              <>
                <ul className={`ul`}>
                  {allContacts.map((contact, index) => (
                    <ContactCard
                      key={index}
                      deleteContact={deleteContact}
                      editContact={editContact}
                      contact={contact}
                      clientId={clientId}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
