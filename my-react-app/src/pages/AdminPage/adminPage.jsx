import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import styles from "./styles.module.scss";
import { RegisterClientForm } from "../../components/Forms/RegisterClient/registerClientForm";
import { useContext, useEffect, useState } from "react";
import { ClientCard } from "../../components/Cards/clientCard";
import { api } from "../../api/axios";
import { ClientsContext } from "../../providers/clientsContext";
import Gear from "../../assets/Gear.svg";
import { SearchForm } from "../../components/Forms/Search/searchForm";
import style from "../ClientPage/styles.module.scss";

export const AdminPage = () => {
  const {
    allClients,
    setAllClients,
    submitRegisterClient,
    loadingClient,
    setLoadingClient,
    setFilteredItems,
    filteredItems,
  } = useContext(ClientsContext);

  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getAllClients = async () => {
      try {
        setLoadingClient(true);

        const { data } = await api.get("/clients");
        setAllClients(data.clients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingClient(false);
      }
    };
    getAllClients();
  }, []);

  useEffect(() => {
    const filteredClientsList = allClients.filter((client) =>
      client.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredItems(filteredClientsList);
  }, [allClients, searchItem]);

  const clientsList = searchItem ? filteredItems : allClients;

  return (
    <>
      <Header link="/admin" />
      <div className={`container ${style.containerUser}`}>
      <div className={`${style.containerForm}`}>
          <h2>DASHBOARD</h2>
        <div className={`${styles.create}`}>
          <p>CRIE UM CLIENTE</p>
          <RegisterClientForm
            classNameLoginButton="none"
            registerButton="CRIAR CLIENTE"
            registerFunction={submitRegisterClient}
          />
        </div>
        </div>
        <div className={`${style.containerList}`}>
          <h3>LISTA DE CLIENTES</h3>
          <SearchForm
            setSearchItem={setSearchItem}
            searchItem={searchItem}
            contactOrClient={"cliente"}
          />

          <div>
            {loadingClient ? (
              <div>
                <p>Carregando informações...</p>
                <img src={Gear} alt="Carregando..." />
              </div>
            ) : (
              <>
                {clientsList?.length === 0 ? (
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
                      {clientsList.map((client, index) => (
                        <ClientCard key={index} client={client} />
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
