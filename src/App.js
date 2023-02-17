import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { AuthProvider } from "./context/authContext";
import { FormRegisterManager } from "./components/FormRegisterManager/FormRegisterManager";
import { Home } from "./components/Home/Home";
import { FormNewEmployed } from "./components/FormNewEmployed/FormNewEmployed";
import { DbProvider } from "./context/dbContext";
import TablaManagers from "./components/TablaManagers/TablaManagers";
// import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <DbProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/tablaManagers" element={<TablaManagers />} />
          <Route
            path="/formRegisterManager"
            element={<FormRegisterManager />}
          />
          <Route path="/FormNewEmployed" element={<FormNewEmployed />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </DbProvider>
  );
}
