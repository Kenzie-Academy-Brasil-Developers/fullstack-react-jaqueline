import error from "../../assets/Error.jpg";
import styles from "./styles.module.scss";

export const ErrorPage = () => {
    return (
      <main  className={styles.logo} style={{margin: "50px"}}>
        <div>
        <h1 className="title one">Ops...</h1>
        <h1 className="title two">Erro 404</h1>
        <p className="title six">Não foi possível encontrar a página!</p>

        </div>
      <img src={error} alt="logo login" />

      </main>
    );
  };
  