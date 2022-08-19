import React, { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";
import "./config";
import axios from "axios";

export const UserContext = React.createContext();
const auth = getAuth();

export const UserProvider = (props) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    email: "",
  });
  const [fetching, setFetching] = useState(true);

  console.log("AUTH", session);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = user.getIdTokenResult();

        await user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });

        //get record from mongo database
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get(
              `http://localhost:3003/account/${user.email}`
            );

            setSession({
              userBalance: response[0].balance,
              user,
              loading: false,
            });
          } catch (error) {
            console.log(error);
          }
          setFetching(false);
        };
        fetchData();

        setSession({ loading: false, user });
      }
      return () => unsubscribe();
    });
  }, []);

  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     let isAdmin = false;

  //     if (user) {
  //       await user.getIdToken().then((token) => {
  //         localStorage.setItem("token", token);
  //       });
  //       // isAdmin = token.claims.admin;
  //       // const email = user.email;
  //     }

  //     setSession({ loading: false, user, isAdmin });
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.status && props.children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
