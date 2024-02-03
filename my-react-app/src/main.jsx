import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./providers/loginContext.jsx";
import { ClientContextProvider } from "./providers/clientsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <ClientContextProvider>
          <App />
        </ClientContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
