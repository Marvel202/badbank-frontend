import React, { StrictMode } from "react";
import "../src/firebaseapp/config";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./firebaseapp/AuthProvider";
import { AppRoute } from "./routes/AppRoute";
import { NavBar } from "./components/NavBar";
import { LedgerContextProvider } from "./contexts/LedgerProvider";

function App() {
  return (
    <AuthContextProvider>
      <LedgerContextProvider>
        <HashRouter>
          <NavBar />
          <div className="app">
            <div className="grid container"></div>
            <AppRoute />
          </div>
        </HashRouter>
      </LedgerContextProvider>
    </AuthContextProvider>
  );
}

export default App;
