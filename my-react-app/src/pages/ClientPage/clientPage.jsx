import { Footer } from "../../components/Footer/footer";
import { Header } from "../../components/Header/header";
import styles from "./styles.module.scss";

export const ClientPage = () => {
  return (
    <>
      <Header link="/client" />
      <main className="container">
        <div className={styles.containerUser}>
          <div>
            <p>criar contato</p>
            <p>Nome do contato</p>
            <p>Email do contato</p>
            <p>Telefone do contato</p>
            <button>criar contato</button>
          </div>
          <div>
            <div>
              <p>Nome do cliente</p>
              <p>Email do cliente</p>
              <p>Telefone do cliente</p>
              <button>Editar cliente (modal)</button>
            </div>
            <div>
              <p>contatos</p>
              <p>buscar contatos</p>
            </div>

            <ul>
              <li>
                <p>Nome do contato</p>
                <p>Email do contato</p>
                <p>Telefone do contato</p>
                <button>Editar contato (modal)</button>
                <button>Deletar contato (modal)</button>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
