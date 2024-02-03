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
  const { allClients, setAllClients, setConfirmDeleteModal } = useContext(ClientsContext);
  const [loadingClient, setLoadingClient] = useState(true);

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

  const deleteClient = async (id) => {
    const token = localStorage.getItem("@token");

    try {
      await api.delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newClientsList = allClients.filter(
        (contact) => contact.id !== id
      );
      setAllClients(newClientsList);
      toast.success("Cliente e contatos do cliente excluídos com sucesso");
      setConfirmDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ops alguma coisa deu errado!");
    } 
  };

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
                  <ClientCard key={index} deleteClient={deleteClient} client={client} />
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
