import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
export const createAccount = async ({ username, email, password }) => {
  const resp = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(auth.currentUser, {
    displayName: `${username}`,
  });
  return resp;
};
export const logout = () => {
  signOut(auth);
  localStorage.removeItem("token");
};
export const login = async ({ email, password }) => {
  const resp = await signInWithEmailAndPassword(auth, email, password);
  return resp;
};
