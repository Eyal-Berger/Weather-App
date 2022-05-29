import React from "react";
import {  MDBContainer, MDBFooter } from "mdbreact";
import { MdCode } from "react-icons/md";
import "./Footer.css";



class Footer extends React.Component {
    render() {
        return (

            <MDBFooter  className="footer" color="gray">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    <span>&copy; {new Date().getFullYear()} Copyright:</span> <a href="/#"> <span>Eyal Berger Web Developer</span> <MdCode /> </a>
                    </MDBContainer>
                </div>
            </MDBFooter>

        );
    }
}

export default Footer;