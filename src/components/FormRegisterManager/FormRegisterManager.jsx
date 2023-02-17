import React, { useState } from "react";
import { Formik } from "formik";
import validate from "./validate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import swal from "sweetalert";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Navbar from "../NavBar/NavBar";
import { useDb } from "../../context/dbContext";

export const FormRegisterManager = () => {
  const [formularioEnviado, setformularioEnviado] = useState(false);

  const { singup, loading, user } = useAuth();
  const { addManager } = useDb();
  const navigate = useNavigate();
  if (loading)
    return (
      <img
        src="https://media.giphy.com/media/uHKpmhC7ADBA1EFSl6/giphy.gif"
        alt=""
      />
    );
  if (!user) return <Navigate to="/" />;
  return (
    <div>
      <Navbar />
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
                    "url('https://res.cloudinary.com/dyfjoi0td/image/private/s--HXMPw5tr--/v1676485278/ecommerce/avwpshysl6y7xv2abnwn.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></MDBCol>
              <MDBCol lg="6" style={{ paddingInline: "10%" }} className="">
                <h3 className="text-center mt-3" style={{ color: "white" }}>
                  Registrar gerente
                </h3>
                <Formik
                  initialValues={{
                    nombre: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      await singup(values.email, values.password);
                      await addManager(values);
                      resetForm();
                      setformularioEnviado(true);
                      swal({
                        title: "Excelente!",
                        text: "Gerente registrado",
                        icon: "success",
                      });
                      navigate("/tablaManagers");
                    } catch (error) {
                      if (
                        error.message ===
                        "Firebase: Error (auth/email-already-in-use)."
                      ) {
                        swal({
                          title: "Ups!",
                          text: "El usuario ya exste",
                          icon: "warning",
                        });
                      }
                    }
                  }}
                  validate={(values) => validate(values)}
                >
                  {({
                    handleSubmit,
                    errors,
                    values,
                    handleChange,
                    handleBlur,
                    touched,
                  }) => (
                    <form className="" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3 p-2">
                        <Form.Label
                          className=""
                          htmlFor="email"
                          style={{ color: "white" }}
                        >
                          Nombre
                        </Form.Label>
                        <Form.Control
                          className=""
                          type="nombre"
                          id="nombre"
                          name="nombre"
                          placeholder="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.nombre && errors.nombre && (
                          <div
                            className="text-danger "
                            style={{ background: "#FCE4EC" }}
                          >
                            {errors.nombre}
                          </div>
                        )}
                      </Form.Group>
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
                          placeholder="Correo"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                          <div
                            className="text-danger "
                            style={{ background: "#FCE4EC" }}
                          >
                            {errors.email}
                          </div>
                        )}
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
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.password && errors.password && (
                          <div
                            className="text-danger "
                            style={{ background: "#FCE4EC" }}
                          >
                            {errors.password}
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3 p-2">
                        <Form.Label
                          className=""
                          htmlFor="firstName"
                          style={{ color: "white" }}
                        >
                          Confirmar contraseña
                        </Form.Label>
                        <Form.Control
                          className=""
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirmar contraseña"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <div
                            className="text-danger "
                            style={{ background: "#FCE4EC" }}
                          >
                            {errors.confirmPassword}
                          </div>
                        )}
                      </Form.Group>

                      <div className="mb-3 p-2">
                        <MDBBtn
                          type="submit"
                          rounded
                          className="text-dark"
                          color="light"
                          style={{ color: "white" }}
                        >
                          Registrar
                        </MDBBtn>
                      </div>
                    </form>
                  )}
                </Formik>
              </MDBCol>
            </MDBRow>
            <MDBRow className="">
              <MDBCol></MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
