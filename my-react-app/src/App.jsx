import { useContext } from "react";
import { Loading } from "./components/Loading/loading";
import { MainRoutes } from "./routes/main.routes";
import { ToastContainer } from "react-toastify";
import { LoginContext } from "./providers/loginContext";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const { loading } = useContext(LoginContext);

  return (
    <>

        {loading ? <Loading /> : <MainRoutes />}
        <ToastContainer position="top-right" autoClose={1300} theme="dark" />

    </>
  );
}

export default App;
