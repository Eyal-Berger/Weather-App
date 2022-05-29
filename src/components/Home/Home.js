import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import DayliForecast from "../Dayli-Forecast/Dayli-Forecast";
import "./Home.css";
import  Israel  from  "../../images/Israel.png";
import { RiCelsiusLine } from "react-icons/ri";
import {convertToCelsius} from "../../utils/weather";
import { FcLike } from "react-icons/fc";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.showCelsium = this.showCelsium.bind(this);
    }

state = {
    tempInCelsius: false,
}

showCelsium() {
    this.setState({
        tempInCelsius: !this.state.tempInCelsius
    })
}

    render() {

        const {weather, currentLocation, addToFavorites} = this.props;

        return (

            <Jumbotron fluid className="mainContainer">
                <Container>
                    <Navbar>
                        <Navbar.Brand href="">
                            <img 
                                src={Israel}
                                width="120"
                                height="90"
                                className="d-inline-block align-top"
                                alt="Tel-Aviv" />
                        </Navbar.Brand>
                         <span className="location">{currentLocation.name}</span>
                         <span className="location">{this.props.weather.map(weather => <div className="dafaultTempTLV">{convertToCelsius(weather.Temperature.Maximum.Value) + "°C"}</div>)[0]}</span>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">                    
                                <Button  variant="outline" size="sm"  onClick={addToFavorites}>
                                  <FcLike size={20} />
                                </Button>{' '}
                        </Navbar.Collapse>
                    </Navbar>
                    <h1 className="text-center">Scattered clouds<br></br><span className="selectedCity">{currentLocation.name}</span></h1>
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={this.state.tempInCelsius} onClick={this.showCelsium}/>  
                      <label className="custom-control-label" htmlFor="customSwitch1"><RiCelsiusLine /></label>
                    </div>            
                    <Row className="justify-content-md-center"> 
                    {weather.length ? weather.map((dayliForecast, index) => {
                        return (
                            <Col key={index}  md={{ span: 2, offset: 0 }}><DayliForecast data={dayliForecast}
                                                                            tempInCelsius={ this.state.tempInCelsius  }
                             /></Col>         
                        )
                    }) : null}   
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Home;