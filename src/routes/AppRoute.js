import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import { CreateAccount } from "../pages/createAccount";
import { Login } from "../pages/login";
import { Deposit } from "../pages/deposit";
import { Withdraw } from "../pages/withdraw";
import { Balance } from "../pages/balance";
import * as Enroute from "../constants/routes";
import { useSession } from "../firebaseapp/AuthProvider";
import { NotAvail } from "../pages/NotAvail";
import { getAuth } from "firebase/auth";

export const AppRoute = () => {
  const auth = getAuth();
  const session = useSession();
  return (
    <div className="layout">
      <main style={{ width: "100%" }}>
        <Routes>
          <Route path={Enroute.LANDING} element={<Home />} />
          <Route path={Enroute.HOME} element={<Home />} />
          <Route path={Enroute.CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={Enroute.LOG_IN} element={<Login />} />
          <Route path={Enroute.DEPOSIT} element={<Deposit user={session} />} />
          <Route
            path={Enroute.WITHDRAW}
            element={<Withdraw user={session} />}
          />
          <Route path={Enroute.NOTAVAIL} element={<NotAvail />} />
          <Route path={Enroute.BALANCE} element={<Balance user={session} />} />
        </Routes>
      </main>
    </div>
  );
};
