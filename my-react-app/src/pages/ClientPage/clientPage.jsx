import { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import { ClientsContext } from "../../providers/clientsContext";
import styles from "./styles.module.scss";
import { RegisterContactForm } from "../../components/Forms/RegisterContact/registerContactForm";
import { ContactCard } from "../../components/Cards/contactsCard";
import Gear from "../../assets/Gear.svg";
import { api } from "../../api/axios";
import { LoginContext } from "../../providers/loginContext";
import { SearchForm } from "../../components/Forms/Search/searchForm";

export const ClientPage = () => {
  const {
    allContacts,
    setAllContacts,
    searchContact,

    filteredItems,
    setFilteredItems,

  } = useContext(ClientsContext);
  const { name, email, telephone } = useContext(LoginContext);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState([]);
  const [nome, setNome] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const id = JSON.parse(localStorage.getItem("@id"));
  useEffect(() => {
    const getAllContactsFromClient = async () => {
      try {
        setLoadingContacts(true);

        const token = localStorage.getItem("@token");
        const { data } = await api.get(`/clients/${id}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllContacts(data.contacts);
        setClientId(data.client.id);
        setNome(data.client.name);
        localStorage.setItem("@clientId", data.client.id);
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
    const filteredContactsList = allContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredItems(filteredContactsList);
  }, [allContacts, searchItem]);

  const contactsList = searchItem ? filteredItems : allContacts;

  return (
    <>
      <Header link="/client" />
      <div className={`container ${styles.containerAdmin}`}>
        <div>
          <div className={`${styles.create}`}>
            <p>CRIE UM CONTATO</p>
            <RegisterContactForm />
          </div>
          <div>
            <p>Olá, {nome}</p>
            <SearchForm setSearchItem={setSearchItem} searchItem={searchItem} contactOrClient={"cliente"} />

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
                        <ContactCard key={index} contact={contact} />
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
