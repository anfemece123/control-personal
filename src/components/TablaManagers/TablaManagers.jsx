import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useDb } from "../../context/dbContext";

import { useAuth } from "../../context/authContext";
import Navbar from "../NavBar/NavBar";
import { Navigate } from "react-router-dom";

export default function TablaManagers() {
  const { managers, getManager2 } = useDb();

  const { loading, user } = useAuth();

  useEffect(() => {
    getManager2();
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
      <Navbar />
      <MDBTable align="middle">
        <MDBTableHead style={{ color: "white" }}>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">email</th>
            <th scope="col">Password</th>
          </tr>
        </MDBTableHead>
        {managers.length ? (
          managers.map((manager) => {
            return (
              <MDBTableBody style={{ color: "white" }}>
                <tr>
                  <td>{manager.nombre}</td>
                  <td>{manager.email}</td>
                  <td type="password">{manager.password}</td>
                </tr>
              </MDBTableBody>
            );
          })
        ) : (
          <div style={{ marginLeft: "600px" }}>
            <h1 style={{ color: "white" }}>No se encontraron datos</h1>
            <img
              src="https://media.giphy.com/media/JQMlfqZfEIaQDopMBQ/giphy.gif"
              width="400px"
            />
          </div>
        )}
      </MDBTable>
    </div>
  );
}
