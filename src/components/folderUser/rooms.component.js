import React, { Component } from 'react';
import CarouselRooms  from "./folderRooms/carouselRooms.component"
import SearchRooms  from "./folderRooms/searchRooms.component"


export default class Rooms extends Component {

  constructor(props){
    super(props);
   
       
}

 
render() {
   

    return (
   <div>
       <CarouselRooms />
       <SearchRooms />
     
   </div>
    );
  }
}