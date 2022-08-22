import React, { useContext, useEffect, useState, createContext } from "react";
import { AuthContext, useSession } from "../firebaseapp/AuthProvider";
import axios from "axios";
import "dotenv/config";
import { ledgerAPI } from "../Ledger";

export const LedgerContext = createContext(null);

export const LedgerContextProvider = ({ children }) => {
  const { session, _ } = useSession();
  const [isLoading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  const authEmail = session.email;

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const { data, status } = await ledgerAPI.account(authEmail);
          if (status === 200) {
            setBalance(data[0].balance);
          }
        } catch (error) {
          // console.error("err", error);
          alert(error.message);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [authEmail]);

  return (
    <LedgerContext.Provider value={{ balance, setBalance }}>
      {children}
    </LedgerContext.Provider>
  );
};
