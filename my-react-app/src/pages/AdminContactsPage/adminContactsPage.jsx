import { useNavigate, useParams } from "react-router-dom";
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
import style from "../ClientPage/styles.module.scss";

export const AdminContactsPage = () => {
  const { idParam } = useParams();
  const [clientId, setClientId] = useState(null);
  const [client, setClient] = useState([]);
  const { allContacts, setAllContacts, filteredItems, setFilteredItems } =
    useContext(ClientsContext);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  const navigate = useNavigate();

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
        localStorage.setItem("@clientId", data.client.id);
        setClient(data.client);
      } catch (error) {
        navigate("/");

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
      <Header link="/admin" />
      <div className={`container ${style.containerUser}`}>
        <div className={`${style.containerForm}`}>
          <div className={`${styles.create}`}>
            <p>CRIE UM CONTATO</p>
            <RegisterContactForm />
          </div>
        </div>
        <div className={`${style.containerList}`}>
          <p>Contatos do cliente <strong>{client.name}</strong></p>
          <SearchForm
            setSearchItem={setSearchItem}
            searchItem={searchItem}
            contactOrClient={"contato"}
          />

          <div>
            {loadingContacts ? (
              <div>
                <p>Carregando informações...</p>
                <img src={Gear} alt="Carregando..." />
              </div>
            ) : (
              <>
                {contactsList?.length === 0 ? (
                  <p
                    style={{
                      position: "relative",
                      justifyContent: "center",
                      color: "black",
                      margin: "2rem",
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
