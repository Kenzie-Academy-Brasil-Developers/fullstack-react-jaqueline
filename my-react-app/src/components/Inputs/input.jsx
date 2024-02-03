import { forwardRef } from "react";
import styles from "./styles.module.scss";

export const Input = forwardRef(
  ({ type, placeholder, error, style, ...rest }, ref) => {
    return (
      <div className={styles.inputBox}>
        <input ref={ref} style={style} type={type} placeholder={placeholder} {...rest} />
        {error ? (
          <span className="footerText error">{error.message}</span>
        ) : null}
      </div>
    );
  }
);