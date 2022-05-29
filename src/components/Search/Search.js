import React from "react";
import { MDBCol, MDBFormInline, MDBIcon, MDBListGroupItem, MDBListGroup } from "mdbreact";
import "./Search.css";


class Search extends React.Component {

  
  render() {
  
       
        const {cities, getWeather, value } = this.props;
    

    return (
      
      <MDBCol className="w-responsive text-center mx-auto mt-2" md="4">
      <MDBFormInline  className="md-form">
        <MDBIcon icon="search" />
        <input onChange={this.props.weatherMethod} value={value}  className="form-control form-control-sm ml-3 w-75" name="city" type="text" placeholder="Choose your city" autoComplete="off" />
        <MDBListGroup style={{ width: "24rem" }}>
             {cities.length ? cities.map((city) =>
                <MDBListGroupItem className="groupCities"  onClick={() => getWeather(city.Key, city.LocalizedName)} key={city.Key} value={city.LocalizedName}>{city.LocalizedName}</MDBListGroupItem> ) :null }
             </MDBListGroup>
      </MDBFormInline>
    </MDBCol>
   
    );
  }
}

export default Search;