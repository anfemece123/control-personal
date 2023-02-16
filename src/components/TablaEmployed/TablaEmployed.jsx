import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDb } from "../../context/dbContext";

export default function TablaEmployed() {
  const { employes, deleteEmploye } = useDb();

  return (
    <div>
      {/* <MDBBtn className="m-3 text-dark" color="light">
        add product <MDBIcon fas icon="plus" />
      </MDBBtn> */}
      <MDBTable align="middle">
        <MDBTableHead style={{ color: "white" }}>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Documento</th>
            {/* <th scope="col">Status</th> */}
            <th scope="col">Position</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {employes.length ? (
          employes.map((employe) => {
            return (
              <MDBTableBody style={{ color: "white" }}>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          employe.profileImage
                            ? employe.profileImage
                            : "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png"
                        }
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{employe.fullName}</p>
                        <p className=" mb-0 " style={{ color: "white" }}>
                          {employe.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{employe.documento}</p>
                  </td>

                  <td>{employe.cargo}</td>
                  <td>
                    <MDBBtn
                      onClick={() => deleteEmploye(employe.id)}
                      color="danger"
                      rounded
                      size="sm"
                    >
                      <MDBIcon fas icon="trash-alt" />
                    </MDBBtn>
                  </td>
                </tr>
              </MDBTableBody>
            );
          })
        ) : (
          <div style={{ alignItems: "center" }}>
            <h1 style={{ color: "white" }}>No se encontraron datos</h1>
            <img src="https://media.giphy.com/media/JQMlfqZfEIaQDopMBQ/giphy.gif" />
          </div>
        )}
      </MDBTable>
    </div>
  );
}
