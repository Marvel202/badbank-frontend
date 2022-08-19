import { EmailAuthCredential } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
  UserProvider,
  useSession,
  UserContext,
} from "../firebaseapp/UserProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HOME } from "../constants/routes";

export const LedgerContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const ctx = useSession();
  console.log("outside useEffect", ctx);
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const URL = "http://localhost:3003/account/john@email.com";

  useEffect(() => {
    // const URL = "http://localhost:3003/account/john@email.com";
    // const URL = `http://localhost:3003/account/`;
    console.log("testing", ctx);
    const fetchData = async () => {
      try {
        console.log("effect", ctx);
        const { data: response } = await axios.get(
          URL
          // "http://localhost:3003/account/john@email.com"
        );
        setUserBalance(response[0].balance);
      } catch (error) {
        console.error("err", error);
      }
    };
    fetchData();
    setLoading(false);
  }, []);
  // if (ctx.user === null) {
  //   console.log("****", ctx);
  //   return <Link to="/"></Link>;
  // }

  return children;
};
