import React, { StrictMode } from "react";

import "../src/firebaseapp/config";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../src/firebaseapp/UserProvider";
import { AppRoute } from "./routes/AppRoute";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <div className="app">
          <div className="grid container"></div>
          <AppRoute />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
