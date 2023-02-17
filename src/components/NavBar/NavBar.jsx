import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBTextArea,
} from "mdb-react-ui-kit";

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <Link to="/home">
          <MDBNavbarBrand href="#">Operarios</MDBNavbarBrand>
        </Link>
        <Link to="/TablaManagers">
          <MDBNavbarBrand href="#">Gerentes</MDBNavbarBrand>
        </Link>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <Link to="/formRegisterManager">
                <MDBNavbarLink active aria-current="page" href="#">
                  Registrar gerente
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <Link to="/FormNewEmployed">
              <MDBNavbarItem>
                <MDBNavbarLink href="#">Agregar operario</MDBNavbarLink>
              </MDBNavbarItem>
            </Link>
          </MDBNavbarNav>
          <MDBNavbarItem>
            {/* <MDBNavbarLink disabled href="#" tabIndex={-1} aria-disabled="true">
              {user.email}
            </MDBNavbarLink> */}
          </MDBNavbarItem>
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="nav-link" role="button">
              <img
                src="https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-icono-de-perfil-de-instagram.png"
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
            </MDBDropdownToggle>

            <MDBDropdownMenu>
              <MDBDropdownItem link onClick={handleLogout}>
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
