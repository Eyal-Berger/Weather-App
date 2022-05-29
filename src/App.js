import React from "react";
import "./App.css";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
//import DayliForecast from "./components/Dayli-Forecast/Dayli-Forecast";



const API_KEY = "pBuH9iqDPZVYZkRoPkN0aNPtevt5QG0M";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.addToFavorites = this.addToFavorites.bind(this);
        this.deleteFavoritesCities = this.deleteFavoritesCities.bind(this);
        this.favoritesAlldata = this.favoritesAllData.bind(this);
    }

    state = {
        locations: [],
        dailyForecasts: [],
        searchQuery: '',
        localizedName: null,
        key: null,
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        currentLocation: {},
        firstDayData: []
    }



    getCity = async (event) => {
        const value = event.target.value;
        this.setState({
            searchQuery: value
        });
        try {
            if (value.trim() === /^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*([1-9a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(value)) {
                this.setState({
                    locations: []
                });
                return;
            }
            const response = await
                fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`);
            const weatherData = await response.json();
            const lastQuery = new URL(response.url);
            const cityValue = lastQuery.searchParams.get("q");
            if (value === cityValue) {
                this.setState({
                    locations: weatherData

                });
            }
        } catch (e) {
            console.log(e)
        }
    }


    getWeatherData = async (key, value) => {

        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`);
        const weatherData5Days = await response.json();
        console.log(weatherData5Days);
        console.log(value);
        this.setState({

            dailyForecasts: weatherData5Days.DailyForecasts,
            locations: [],
            searchQuery: '',
            currentLocation: {
                key,
                name: value
            }
        });
    }

    getFavoryWeather = async (key) => {

        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`);
        const firstDayWeatherData = await response.json();
        console.log(firstDayWeatherData);
        this.setState({

            firstDayData: firstDayWeatherData.DailyForecasts[0]

        });
    }


    componentDidMount() {

        this.getWeatherData(215854, "Tel Aviv");
        this.state.favorites.forEach(favorite => this.getFavoryWeather(favorite.key));

    }

    addToFavorites() {
        const {
            currentLocation,
            favorites
        } = this.state;

        const updatedFavorites = [...favorites, currentLocation];
        this.setState({
            favorites: updatedFavorites
        });
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }


    deleteFavoritesCities(name) {

        this.setState(({
            favorites
        }) => {
            const location = favorites.filter((elem) => elem.name !== name);
            return {
                favorites: location
            }
        }, () => {
            localStorage.removeItem('favorites', JSON.stringify(this.state.favorites))
        });
    }



    favoritesAllData(favWeatherData) {
        const { favorites } = this.state;

        this.setState({
            favorites: favorites.map((item, index) => ({...item, ...favWeatherData[index]}))
        });
    }


    render() {
        const { searchQuery } = this.state;
        console.log(this.state.favorites);
        return (

            <Router>
                <div>
                    <Header />
                    <Route exact={true}
                        path='/'
                        render={
                            (props) => (<Search {...props}
                                weatherMethod={this.getCity}
                                value={searchQuery}
                                cities={this.state.locations}
                                getWeather={this.getWeatherData}
                            />
                            )
                        }
                    />
                    <Route exact={true}
                        path='/'
                        render={
                            (props) => (<Home {...props}
                                weather={this.state.dailyForecasts}
                                currentLocation={this.state.currentLocation}
                                addToFavorites={this.addToFavorites}
                            />
                            )
                        }
                    />
                    <Route path='/favorites'
                        render={
                            (props) => (<Favorites {...props}
                                favorites={this.state.favorites}
                                removeFromFavorites={this.deleteFavoritesCities}
                                getFavoryFirstDayData={this.favoritesAllData}
                            />
                            )
                        }
                    />
                    <Footer />
                </div>
            </Router>
        );
    }
}


export default App;