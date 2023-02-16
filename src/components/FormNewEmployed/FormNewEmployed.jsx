import React, { useState } from "react";
// import React, { useState } from "react";
import { Formik } from "formik";
import validate from "./validate";
import { Link, Navigate, useNavigate } from "react-router-dom";

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

export const FormNewEmployed = () => {
  const [formularioEnviado, setformularioEnviado] = useState(false);
  //   const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [loading1, setLoading] = useState(false);

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
                Registro de empleado
              </h3>
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  documento: "",
                  cargo: "",
                  profileImage: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  //   dispatch(formRegister(values));
                  // console.log("en onsubmit", values);
                  resetForm();
                  setformularioEnviado(true);
                  swal({
                    title: "Excellent!",
                    text: "Remember to verify it! Check your email",
                    icon: "success",
                  });
                  //   navigate("/login");
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
                    <Form.Group className="mb-3 p-2">
                      <Form.Label
                        className=""
                        htmlFor="firstName"
                        style={{ color: "white" }}
                      >
                        Nombre completo
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.fullName && errors.fullName && (
                        <div className="text-danger">{errors.fullName}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 p-2">
                      <Form.Label className="" htmlFor="firstName">
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="phone number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div className="text-danger">{errors.phoneNumber}</div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 p-2">
                      <Form.Label className="" htmlFor="firstName">
                        Address
                      </Form.Label>
                      <Form.Control
                        className=""
                        type="text"
                        id="address"
                        name="address"
                        placeholder="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.address && errors.address && (
                        <div className="text-danger">{errors.address}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 p-2">
                      <Form.Label className="" htmlFor="email">
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
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 p-2">
                      <p hidden>{(values.profileImage = image)}</p>
                      <p className="text-muted">Image</p>
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
                        <img src={image} width="230px" className="mt-3" />
                      )}
                    </Form.Group>
                    <div className="mb-3 p-2">
                      <MDBBtn color="primary" outline type="submit">
                        Register Account
                      </MDBBtn>
                    </div>
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
