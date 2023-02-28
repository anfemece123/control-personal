import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import swal from "sweetalert";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    try {
      await login(user.email, user.password);
      swal({
        title: "Excelente!",
        text: "Bienvenido a newrona c:",
        icon: "success",
      });
      navigate("/home");
    } catch (error) {
      const errors = error.message;
      console.log(errors);
      if (errors === "Firebase: Error (auth/user-not-found).") {
        swal({
          title: "Ups!",
          text: "Usuario incorrecto",
          icon: "warning",
        });
      } else if (errors === "Firebase: Error (auth/wrong-password).") {
        swal({
          title: "Ups!",
          text: "contraseña incorrecta",
          icon: "warning",
        });
      } else if (
        errors ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        swal({
          title: "Peligro!",
          text: "Usuario baneado temporalmente por muchos intentos de inicio de secion",
          icon: "warning",
        });
      } else if (errors === "Firebase: Error (auth/invalid-email).") {
        swal({
          title: "Peligro!",
          text: "Introduzca correo",
          icon: "warning",
        });
      } else if (errors === "Firebase: Error (auth/internal-error).") {
        swal({
          title: "Peligro!",
          text: "Introduzca contraseña",
          icon: "warning",
        });
      }
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const { login } = useAuth();
  // const navigate = useNavigate();

  return (
    <MDBContainer className="fluid min-vw-100" style={{ marginTop: "8%" }}>
      <MDBRow className="">
        <MDBCol
          style={{
            padding: 0,
          }}
        >
          <MDBRow>
            <MDBCol className=""></MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol
              sm="0"
              md="0"
              lg="6"
              style={{
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/512/3052/3052182.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "380px",

                animationName: "mover",
                animationDuration: "1s",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
              }}
            ></MDBCol>
            <MDBCol lg="6" style={{ paddingInline: "10%" }} className="">
              <h3 className="text-center mt-3" style={{ color: "white" }}>
                INGRESAR
              </h3>

              <form className="" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 p-2">
                  <Form.Label
                    className=""
                    htmlFor="email"
                    style={{ color: "white" }}
                  >
                    Correo
                  </Form.Label>
                  <Form.Control
                    className=""
                    type="email"
                    id="email"
                    name="email"
                    placeholder="correo"
                    // value={values.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3 p-2">
                  <Form.Label
                    className=""
                    htmlFor="firstName"
                    style={{ color: "white" }}
                  >
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    className="b"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="mb-3 p-2">
                  <MDBBtn
                    rounded
                    className="text-dark"
                    color="light"
                    style={{ color: "white" }}
                  >
                    Ingresa
                  </MDBBtn>
                </div>
                <hr className="" />
              </form>
            </MDBCol>
          </MDBRow>
          <MDBRow className="">
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
