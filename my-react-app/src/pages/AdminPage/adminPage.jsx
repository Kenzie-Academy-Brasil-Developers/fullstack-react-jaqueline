import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import styles from "./styles.module.scss";
import { RegisterClientForm } from "../../components/Forms/RegisterClient/registerClientForm";
import { useContext, useEffect, useState } from "react";
import { ClientCard } from "../../components/Cards/clientCard";
import { api } from "../../api/axios";
import { ClientsContext } from "../../providers/clientsContext";
import { toast } from "react-toastify";
import Gear from "../../assets/Gear.svg";
import { SearchForm } from "../../components/Forms/Search/searchForm";

export const AdminPage = () => {
  const {
    allClients,
    setAllClients,
    submitRegisterClient,
    loadingClient,
    setLoadingClient,
    setFilteredItems,
    filteredItems,
    // searchItem,
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
    const filteredClientsList = allClients.filter(
      (client) =>
       client.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredItems(filteredClientsList);
  }, [allClients, searchItem]);

  const clientsList = searchItem ? filteredItems : allClients;

  return (
    <>
      <Header link="/admin" />
      <div className={`container ${styles.containerAdmin}`}>
        <div className={` ${styles.infos}`}>
          <div className={`${styles.create}`}>
            <p>CRIE UM CLIENTE</p>
            <RegisterClientForm
              classNameLoginButton="none"
              registerButton="CRIAR CLIENTE"
              registerFunction={submitRegisterClient}
            />
          </div>
          <div>
            <p>clientes</p>
            <SearchForm setSearchItem={setSearchItem} searchItem={searchItem} contactOrClient={"cliente"} />
          </div>
          {loadingClient ? (
            <>
              <p>Carregando informações...</p>
              <img src={Gear} alt="Carregando..." />
            </>
          ) : (
            <>
            {clientsList?.length === 0 ? (
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
                {clientsList.map((client, index) => (
                  <ClientCard
                    key={index}
                    client={client}
                  />
                ))}
              </ul>
            </>
          )}
          </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
