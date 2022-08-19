import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { UserProvider, useSession } from "./UserProvider";

const auth = getAuth();

export const createAccount = async ({ username, email, password }) => {
  const resp = await createUserWithEmailAndPassword(auth, email, password);
  // const { user } = resp.user;

  updateProfile(auth.currentUser, {
    displayName: `${username}`,
  });

  console.log("user uid", resp.user.uid);
  console.log("user create", localStorage.token);
  console.log("resp.user", resp.user);
  return resp;
};
export const logout = () => {
  signOut(auth);
  console.log("from logout", auth);
  localStorage.removeItem("token");
  // console.log("after logout", localStorage.token);
};
export const login = async ({ email, password }) => {
  const resp = await signInWithEmailAndPassword(auth, email, password);

  console.log("++++", resp);

  console.log("after login", localStorage.token);
  return resp;
};
