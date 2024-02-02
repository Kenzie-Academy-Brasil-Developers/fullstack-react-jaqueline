import { forwardRef } from "react";
import styles from "./styles.module.scss";

export const Input = forwardRef(
  ({ type, placeholder, error, ...rest }, ref) => {
    return (
      <div className={styles.inputBox}>
        <input ref={ref} type={type} placeholder={placeholder} {...rest} />
        {error ? (
          <span className="footerText error">{error.message}</span>
        ) : null}
      </div>
    );
  }
);