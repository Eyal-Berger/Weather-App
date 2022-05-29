import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import "./Favorites.css";
import FavoritesCity from "../Favorites-City/Favorites-City";


const API_KEY = "pBuH9iqDPZVYZkRoPkN0aNPtevt5QG0M";


class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.getFavoryFirstDayData = this.getFavoryFirstDayData.bind(this);
    }


    componentDidMount() { 
       this.getFavoryFirstDayData();
    }
  
    
    getFavoryFirstDayData = async (key) => {
        const response = await Promise.all(
            this.props.favorites.map( 
            fav => fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${fav.key}?apikey=${API_KEY}`)))
        const favWeatherData = await Promise.all(response.map(
            res => res.json()));  
            console.log(favWeatherData);      
    } 
    

    render() {

        const {favorites, removeFromFavorites} = this.props;

        return (


            <Jumbotron fluid className="mainContainer">
                <Container>
                <Row className="justify-content-md-center"> 
                    {favorites.length ? favorites.map((favoritesCity, index) => {
                        return (
                            <Col key={index}  md={{ span: 2, offset: 0 }}><FavoritesCity data={favoritesCity.name} 
                                                                                         onDelete={removeFromFavorites} 
                                                                                                                                               
                /></Col>         
                        )
                    }) : null}   
                    </Row>
                </Container>
            </Jumbotron>


        );
    }
}

export default Favorites;