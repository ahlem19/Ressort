import React, { Component } from 'react';
import Carousel  from "./folderHome/carousel.component"
import Services  from "./folderHome/services.component"
import FeaturedRooms  from "./folderHome/featuredRomms.component"


export default class Home extends Component {

  constructor(props){
    super(props);
   
       
}

 
render() {
   

    return (
   <div>
       <Carousel />
       <Services/>
       <FeaturedRooms/>
   </div>
    );
  }
}