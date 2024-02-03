import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="paragraphs bold">
          Todos os direitos reservados - Jaqueline Hirose de Oliveira
        </p>
      </div>
    </footer>
  );
};
