import React, { useState } from "react";
import { Formik } from "formik";
import validate from "./validate";
import { Navigate, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Navbar from "../NavBar/NavBar";
import { useAuth } from "../../context/authContext";
import { useDb } from "../../context/dbContext";

export const FormNewEmployed = () => {
  const [formularioEnviado, setformularioEnviado] = useState(false);

  const [image, setImage] = useState("");
  const [loading1, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ecommerce");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyfjoi0td/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    console.log(file.secure_url);
    setLoading(false);
  };
  const { loading, user } = useAuth();
  const { addOrEdit } = useDb();
  if (loading) return <h1>loading</h1>;
  if (!user) return <Navigate to="/" />;
  return (
    <MDBContainer className="fluid min-vw-100">
      <MDBRow className="">
        <MDBCol
          style={{
            padding: 0,
          }}
        >
          <MDBRow>
            <MDBCol className="">
              <Navbar />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol
              sm="0"
              md="0"
              lg="6"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dyfjoi0td/image/upload/v1676520273/ecommerce/newrona_img1_home_szqrke.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></MDBCol>
            <MDBCol lg="6" style={{ paddingInline: "10%" }} className="">
              <h3 className="text-center mt-3" style={{ color: "white" }}>
                Informacion Operario
              </h3>
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  documento: "",
                  celular: "",
                  cargo: "",
                  profileImage: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  await addOrEdit(values);
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
                  <Form className="" onSubmit={handleSubmit}>
                    {console.log(values)}
                    <Form.Group className="mb-3 p-2">
                      <Form.Label
                        className=""
                        htmlFor="firstName"
                        style={{ color: "white" }}
                      >
                        Nombre
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Nombre"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.fullName && errors.fullName && (
                        <div className="text-danger">{errors.fullName}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 p-2">
                      <Form.Label
                        className=""
                        htmlFor="firstName"
                        style={{ color: "white" }}
                      >
                        Documento
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="documento"
                        name="documento"
                        placeholder="documento "
                        value={values.documento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.documento && errors.documento && (
                        <div className="text-danger">{errors.documento}</div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 p-2">
                      <Form.Label
                        className=""
                        htmlFor="firstName"
                        style={{ color: "white" }}
                      >
                        Celular
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="celular"
                        name="celular"
                        placeholder="celular "
                        value={values.celular}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.celular && errors.celular && (
                        <div className="text-danger">{errors.celular}</div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 p-2">
                      <Form.Label
                        className=""
                        htmlFor="firstName"
                        style={{ color: "white" }}
                      >
                        cargo
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="cargo"
                        name="cargo"
                        placeholder="cargo"
                        value={values.cargo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.cargo && errors.cargo && (
                        <div className="text-danger">{errors.cargo}</div>
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
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 p-2">
                      <p hidden>{(values.profileImage = image)}</p>
                      <p className="" style={{ color: "white" }}>
                        Foto
                      </p>
                      <MDBInputGroup
                        className="mb-3"
                        textBefore="Upload"
                        textTag="label"
                        textProps={{ htmlFor: "inputGroupFile01" }}
                      >
                        <input
                          className="form-control"
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          onChange={uploadImage}
                          onBlur={handleBlur}
                        />
                      </MDBInputGroup>
                      {loading1 ? (
                        <img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif" />
                      ) : (
                        <img src={image} width="100px" className="mt-3" />
                      )}
                    </Form.Group>
                    {/* <div className="mb-3 p-2"> */}
                    <MDBBtn
                      rounded
                      className="text-dark"
                      color="light"
                      style={{ color: "white" }}
                    >
                      Agregar
                    </MDBBtn>
                    {/* </div> */}
                    <hr className="" />
                  </Form>
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
  );
};
