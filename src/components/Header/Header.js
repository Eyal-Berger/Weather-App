import React from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import "./Header.css";
import WeatherLogo from "../../images/WeatherLogo.png";
import { NavLink } from "react-router-dom";



class Header extends React.Component {
    render() {
        return (

            <Navbar className="mainHeader" collapseOnSelect expand="lg">
                <Navbar.Brand href="">
                    <img
                        src={WeatherLogo}
                        width="160"
                        height="100"
                        className="d-inline-block align-top"
                        alt="WeatherLogo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav variant="pills">
                        <Nav.Item>
                            <NavLink className="HeaderButton nav-link" to="/">Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="HeaderButton nav-link" to="/favorites">Favorites</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;