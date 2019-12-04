import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VendorGeo from "./VendorLocation"

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "../assets/tortaLogo_transparent.png";

import { useAuth0 } from "../../react-auth0-spa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);


  const CompanyLogo = () => {
    return <img src="../assets/tortaLogo_transparent.png"></img>
  }

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <div className="nav-container">
      <Navbar style={{ backgroundColor: '#fc0' }} light expand="md">
        <Container>
          <img height='50px' width='60px' style={{ marginRight: '10px' }} src={logo}></img>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
            </Nav>

            {/* Actually display on the screen */}
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="success"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/home"
                      className="dropdown-profile"
                    >
                      <FontAwesomeIcon icon="server" className="mr-3" /> List
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/twitter"
                      className="dropdown-profile"
                    >
                      <FontAwesomeIcon icon="comment" className="mr-3" /> Social Media
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-profile"
                    >
                      <VendorGeo><FontAwesomeIcon icon="marker" className="mr-3" /></VendorGeo>
                    </DropdownItem>

                    <DropdownItem
                      tag={RouterNavLink}
                      to="/menu"
                      className="dropdown-profile"
                    >
                      <FontAwesomeIcon icon="utensils" className="mr-3" /> Menu
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {/* This is the Link to Route */}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/home"
                  >
                    List
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="comment" className="mr-3" />
                  <RouterNavLink
                    to="/twitter"
                  >
                    Social Media
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <VendorGeo><FontAwesomeIcon icon="comment" className="mr-3" /></VendorGeo>
                </NavItem>
            
                <NavItem>
                  <FontAwesomeIcon icon="utensils" className="mr-3" />
                  <RouterNavLink
                    to="/menu"
                  >
                    Menu
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
