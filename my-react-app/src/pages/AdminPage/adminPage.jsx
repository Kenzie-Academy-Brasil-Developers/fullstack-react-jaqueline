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

export const AdminPage = () => {
  const {
    allClients,
    setAllClients,
    submitRegisterClient,
    loadingClient,
    setLoadingClient,
    //  setConfirmEditModalClient, confirmEditModalClient
  } = useContext(ClientsContext);
  // const [confirmEditModalClient, setConfirmEditModalClient] = useState(false);

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

  // const confirmEditClient = (client_Id) => {
  //   setConfirmEditModalClient({
  //     ...confirmEditModalClient,
  //     [client_Id]: true,
  //   });
  // };

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
            <p>buscar cliente</p>
          </div>
          {loadingClient ? (
            <>
              <p>Carregando informações...</p>
              <img src={Gear} alt="Carregando..." />
            </>
          ) : (
            <>
              <ul className={`ul`}>
                {allClients.map((client, index) => (
                  <ClientCard
                    key={index}
                    client={client}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
