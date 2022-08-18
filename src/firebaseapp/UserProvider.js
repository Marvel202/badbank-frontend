import React, { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";
import "./config";
import { ledgerAPI } from "../transactions/transactionAPI";
import axios from "axios";

export const UserContext = React.createContext();
const auth = getAuth();
const account = ledgerAPI.account;
console.log("account", account);
export const UserProvider = (props) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    userBalance: 0,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let userBalance = 100;

      if (user) {
        const token = user.getIdTokenResult();
        console.log("www", user.email);
      }

      setSession({ loading: false, user });
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
