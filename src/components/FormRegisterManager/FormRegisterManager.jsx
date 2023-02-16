import React, { useState } from "react";
import { Formik } from "formik";
import validate from "./validate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import swal from "sweetalert";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Navbar from "../NavBar/NavBar";

export const FormRegisterManager = () => {
  const [formularioEnviado, setformularioEnviado] = useState(false);

  const { singup, loading, user } = useAuth();
  const navigate = useNavigate();
  if (loading) return <h1>loading</h1>;
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
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    singup(values.email, values.password);
                    resetForm();
                    setformularioEnviado(true);
                    swal({
                      title: "Excellent!",
                      text: "Remember to verify it! Check your email",
                      icon: "success",
                    });
                    navigate("/home");
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
                          Email
                        </Form.Label>
                        <Form.Control
                          className=""
                          type="email"
                          id="email"
                          name="email"
                          placeholder="email"
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
                          Password
                        </Form.Label>
                        <Form.Control
                          className="b"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
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
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          className=""
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="confirm password"
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
