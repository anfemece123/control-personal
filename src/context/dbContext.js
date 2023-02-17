import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export const dbContext = createContext();
export const useDb = () => {
  const context = useContext(dbContext);
  if (!context) throw new Error("No hay un provider de db");
  return context;
};

export const DbProvider = ({ children }) => {
  const [employes, setEmployes] = useState([]);
  const [managers, setManagers] = useState([]);
  const addOrEdit = (data) => {
    //  db.collection("employes").doc().set(data);
    addDoc(collection(db, "employes"), data);
    console.log("nuevo empleado agregado");
  };

  const getEmploye1 = (callback) => {
    const unsub = getDocs(collection(db, "employes"), callback);
    return unsub;
  };
  const getEmployes2 = async () => {
    const querySnapshot = await getEmploye1();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setEmployes(docs);
    // });
  };
  const deleteEmploye = (id) => deleteDoc(doc(db, "employes", id));
  const addManager = (data) => {
    addDoc(collection(db, "Managers"), data);
    console.log("nuevo gerente agregado");
  };
  const getManager1 = (callback) => {
    const unsub = getDocs(collection(db, "Managers"), callback);
    return unsub;
  };
  const getManager2 = async () => {
    const querySnapshot = await getManager1();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setManagers(docs);
    // });
  };

  useEffect(() => {
    getEmployes2();
    getManager2();
  }, []);

  return (
    <dbContext.Provider
      value={{
        addOrEdit,
        employes,
        getEmployes2,
        deleteEmploye,
        addManager,
        managers,
        getManager2,
      }}
    >
      {children}
    </dbContext.Provider>
  );
};
