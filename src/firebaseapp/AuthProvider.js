import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  createContext,
} from "react";
import { getAuth } from "firebase/auth";
import "./config";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [session, setSession] = useState({
    username: "",
    loading: true,
    email: "",
    firebaseId: "",
    user: "",
  });

  const value = useMemo(() => ({ session, setSession }), [session, setSession]);

  const auth = getAuth();

  console.log("AUTH", session);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });

        // let username = user.displayName;
        await console.log("display", user.displayName);
        let email = user.email;
        console.log(("provider email", email));
        let firebaseId = user.uid;
        console.log("firebaseId?", firebaseId);

        await setSession({ loading: false, email, firebaseId, user });
      } else {
        setSession({ loading: true, user });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!value.loading && props.children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(AuthContext);
  return session;
};
