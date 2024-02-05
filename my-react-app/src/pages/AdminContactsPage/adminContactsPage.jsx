import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import { useContext, useEffect, useRef, useState } from "react";
import { RegisterContactForm } from "../../components/Forms/RegisterContact/registerContactForm";
import { ClientsContext } from "../../providers/clientsContext";
import { api } from "../../api/axios";
import { ContactCard } from "../../components/Cards/contactsCard";
import Gear from "../../assets/Gear.svg";
import styles from "./styles.module.scss";


export const AdminContactsPage = () => {
  const { idParam } = useParams();
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState([]);
  const {
    allContacts,
    setAllContacts,
    setConfirmDeleteModal,
    setConfirmEditModal,
    deleteContact, editContact, confirmEditModal
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
       localStorage.setItem("@clientId", data.client.id)
        setClient(data.client);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingContacts(false);
      }
    };
    getAllContactsFromClient();
  }, []);



  

  return (
    <>
      <Header link="/admin" />
      <div className={`container ${styles.containerAdmin}` }>
        <div >
          <div className={`${styles.create}`}>
            <p>CRIE UM CONTATO</p>
            <RegisterContactForm
             clientId={clientId}
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
                 
                      contact={contact}
                
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
