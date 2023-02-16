import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import TablaEmployed from "../TablaEmployed/TablaEmployed";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import { useDb } from "../../context/dbContext";

export const Home = () => {
  const { loading, user } = useAuth();
  const { getEmployes2 } = useDb();
  useEffect(() => {
    getEmployes2();
  }, []);

  if (loading)
    return (
      <img
        src="https://media.giphy.com/media/dumfpsshcqTsh233xF/giphy.gif"
        alt=""
      />
    );
  if (!user) return <Navigate to="/" />;
  return (
    <div>
      <NavBar />
      <TablaEmployed />
    </div>
  );
};
