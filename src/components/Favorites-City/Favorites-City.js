import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./Favorites-City.css";


class FavoritesCity extends React.Component {


  render() {
  
    const {data, onDelete} = this.props;
 
      return (

      <div className="favoritesDataBox">
        <h4>{data}</h4>
         {/* <p><img typeof="float:Image" className="img-responsive" src={`https://developer.accuweather.com/sites/default/files/${additionalDataFavory.Day.Icon >9 ?  additionalDataFavory.Day.Icon : "0" + additionalDataFavory.Day.Icon}-s.png`} width="75" height="45" alt="" title=""></img></p> */}
         <>{new Date().toLocaleDateString()}</> 
        <hr />
        <p><FaTrashAlt onClick={() => onDelete(data)} size={15} /></p>
      </div>

      );
  }
}

export default FavoritesCity;