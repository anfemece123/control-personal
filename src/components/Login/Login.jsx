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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    try {
      await login(user.email, user.password);
      swal({
        title: "Excellent!",
        text: "Remember to verify it! Check your email",
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
                  "url('https://res.cloudinary.com/dyfjoi0td/image/upload/v1676498513/ecommerce/isologo-newrona_daekhd.png')",
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
                LOGIN
              </h3>

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
                    Password
                  </Form.Label>
                  <Form.Control
                    className="b"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
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
                    Register Account
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
