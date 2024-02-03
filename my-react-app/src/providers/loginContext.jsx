import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogout = () => {
    navigate("/");
    localStorage.removeItem("@token");
    localStorage.removeItem("@admin");
  };

  const submitLogin = async (formData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", formData);
      localStorage.setItem("@token", data.token);
      localStorage.setItem("@admin", data.admin);
      setName(data.name);
      setEmail(data.email);
      setTelephone(data.telephone);
      setAdmin(data.admin);

      const adminLS = JSON.parse(localStorage.getItem("@admin"));

      if (adminLS) {
        navigate("/admin");
      } else if (!adminLS) {
        navigate("/client");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Não foi possível realizar o login");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (formData) => {
    try {
      setLoading(true);
      await api.post("/clients", formData);
      toast.success("Conta criada com sucesso");
      navigate("/");
    } catch (error){
      toast.error("Ops! Algo deu errado");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };



  return (
    <LoginContext.Provider
      value={{
        submitRegister,
        submitLogin,
        submitLogout,
        loading,
        name,
        email,
        telephone,
        admin,
        setLoading
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
