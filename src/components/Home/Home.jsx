import React from "react";
import NavBar from "../NavBar/NavBar";
import TablaEmployed from "../TablaEmployed/TablaEmployed";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { loading, user } = useAuth();
  if (loading) return <h1>loading</h1>;
  if (!user) return <Navigate to="/" />;
  return (
    <div>
      <NavBar />
      <TablaEmployed />
    </div>
  );
};
