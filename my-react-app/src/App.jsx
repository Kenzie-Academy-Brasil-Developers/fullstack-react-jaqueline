import { useContext } from "react";
import { Loading } from "./components/Loading/loading";
import { MainRoutes } from "./routes/main.routes";
import { ToastContainer } from "react-toastify";
import { LoginContext } from "./providers/loginContext";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import { ClientsContext } from "./providers/clientsContext";

function App() {
  const { loading } = useContext(LoginContext);
  const { loadingClient } = useContext(ClientsContext);


  return (
    <>

        {loading || loadingClient ? <Loading /> : <MainRoutes />}
        <ToastContainer position="top-right" autoClose={1300} theme="dark" />

    </>
  );
}

export default App;
