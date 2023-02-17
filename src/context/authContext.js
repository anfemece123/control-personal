import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No hay un provider de autenticacion");
  return context;
};

export function AuthProvider({ children }) {
  // const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const logout = () => signOut(auth);
  const singup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);
  };
  // const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    // setUsers(auth.currentUser);
    // console.log(onAuthStateChanged());
    // onAuthStateChanged(auth, () => setUsers());
  }, []);

  return (
    <authContext.Provider value={{ singup, login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}
