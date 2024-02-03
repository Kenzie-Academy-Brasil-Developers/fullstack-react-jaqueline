import { React, forwardRef, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../providers/loginContext";
import styles from "./styles.module.scss";

export const Header = forwardRef(({ link }, ref) => {
  const { submitLogout } = useContext(LoginContext);
  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <nav className={styles.space}>
            <Link className="title six" ref={ref} to={link}>
              agenda de contatos
            </Link>

            <button className="btn__black login" onClick={submitLogout}>
              Sair
            </button>
          </nav>
        </div>
      </div>
    </>
  );
});
