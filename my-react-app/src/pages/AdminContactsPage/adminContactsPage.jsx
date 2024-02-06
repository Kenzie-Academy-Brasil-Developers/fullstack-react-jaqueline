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
import { SearchForm } from "../../components/Forms/Search/searchForm";


export const AdminContactsPage = () => {
  const { idParam } = useParams();
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState([]);
  const {
    allContacts,
    setAllContacts,
    searchContact,
    setSearchItem,
    filteredItems,
    setFilteredItems, searchItem
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


  useEffect(() => {
    const filteredContactsList = allContacts.filter(
      (contact) =>
       contact.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredItems(filteredContactsList);
  }, [allContacts]);

  const contactsList = searchItem ? filteredItems : allContacts;
  

  return (
    <>
      <Header link="/admin" />
      <div className={`container ${styles.containerAdmin}` }>
        <div >
          <div className={`${styles.create}`}>
            <p>CRIE UM CONTATO</p>
            <RegisterContactForm
            />
          </div>
          <div>
            <p>contatos do cliente {client.name}</p>
            <SearchForm contactOrClient={"contato"} />
          </div>

          <div>
            {loadingContacts ? (
              <>
                <p>Carregando informações...</p>
                <img src={Gear} alt="Carregando..." />
              </>
            ) : (
              <>
              {contactsList?.length === 0 ? (
                <p
                  style={{
                    position: "relative",
                    justifyContent: "center",
                    color: "white",
                    margin: "30px",
                    padding: "34px",
                  }}
                >
                  Nenhum resultado encontrado.
                </p>
              ) : (
              <>
                <ul className={`ul`}>
                  {contactsList.map((contact, index) => (
                    <ContactCard
                      key={index}
                 
                      contact={contact}
                
                    />
                  ))}
                </ul>
              </>
            )}
            </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
