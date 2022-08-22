import React, { useContext, useEffect, useState, createContext } from "react";
import { AuthContext, useSession } from "../firebaseapp/AuthProvider";
import axios from "axios";

export const LedgerContext = createContext(null);

export const LedgerContextProvider = ({ children }) => {
  const { session, _ } = useSession();
  const [isLoading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);

  const authEmail = session.email;

  const url = "http://localhost:3003/account/" + authEmail;
  console.log("after set", url);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const resp = await axios.get(url);
          setBalance(resp.data[0].balance);
        } catch (error) {
          console.error("err", error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [url]);

  return (
    <LedgerContext.Provider value={{ balance, setBalance }}>
      {children}
    </LedgerContext.Provider>
  );
};
