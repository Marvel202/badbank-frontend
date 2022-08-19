import React, { StrictMode } from "react";
import "../src/firebaseapp/config";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../src/firebaseapp/UserProvider";
import { AppRoute } from "./routes/AppRoute";
import { NavBar } from "./components/NavBar";
// import { LedgerContextProvider } from "./contexts/LedgerProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        {/* <LedgerContextProvider> */}
        <div className="app">
          <div className="grid container"></div>
          <AppRoute />
        </div>
        {/* </LedgerContextProvider> */}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
