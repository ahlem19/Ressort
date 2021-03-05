import React, { Component } from 'react';
import { Card, CardBody,CardImg,CardText, Row, Col } from "reactstrap";
import axios from "axios"

export default class SearchRooms extends Component {

  constructor(props){
    super(props);
    this.state={
        ListRooms :[],
        rooms:[],
        room:"",
        guests:[1,2,3,4,5,6]
    }
    this.filterByRoomtype = this.filterByRoomtype.bind(this);
}
componentDidMount(){
   axios.get("http://localhost:5000/searchrooms/")
   .then(response=>{
     this.setState({  ListRooms:response.data})

     if(response.data.length >0){
      this.setState({
  rooms:response.data.map(room=>room.roomtype),
  room: response.data[0].roomtype
})
  }

   })
   .catch((error)=>{
     console.log(error)
   })

 }
 filterByRoomtype(e){
   //refresh
  this.setState({
    room: e.target.value
  })
  this.setState({
    ListRooms:this.state.ListRooms.filter(el=>el.roomtype ===  e.target.value)
   })

}

render() {
   

    return (
   <div>
       <h1 className="text-center mt-5">Search Rooms</h1>
       
  
    
     <form >
     <Row>
     <Col xs={12} sm={6} md={6} lg={3}>
          <div className="form-group"> 
            <label>Room Type: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.room}
                onChange={this.filterByRoomtype}
                >
                {
                  this.state.rooms.map(function(room) {
                    return <option 
                      key={room}
                      value={room}>{room}
                      </option>;
                  })
                }
            </select>
          </div>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
     
     <div className="form-group"> 
            <label>Guests: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.guests[0]}
                // onChange={this.onChangeUsername}
                >
                {
                  this.state.guests.map(function(guest) {
                    return <option 
                      key={guest}
                      value={guest}>{guest}
                      </option>;
                  })
                }
            </select>
          </div>
     
  </Col>
  <Col xs={12} sm={6} md={6} lg={2}>
   
     <div className="form-group">
          <label htmlFor="price">Room Price $</label>
          <input
            type="range"
            name="price"
            min={0}
            max={100}
            id="price"
            value={12}
            // onChange={handleChange}
            className="form-control"
          />
        </div>
     
  </Col>
  <Col xs={12} sm={6} md={6} lg={2}>
     
     <div className="form-group">
          <label htmlFor="price">Room Size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={0}
              // onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={3000}
              // onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
     
  </Col>
  <Col xs={12} sm={6} md={6} lg={2}>
   
     <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              // checked={breakfast}
              // onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              // checked={pets}
              // onChange={handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>
     
  </Col>
  {/* <Col xs={6} sm={6} md={8} lg={10} />
  <Col xs={6} sm={3} md={2} lg={1} /> */}
  </Row>
          </form>
   
 


       <Row>
       {this.state.ListRooms.map((room, index) => (
                <Col className="mb-4 justify-content-center" lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" >
                    <CardImg style={{ height: '8rem' }}className="img-fluid img-thumbnail bg-secondary " key={room.id} variant="top" src={room.image}/>
                    <CardBody>
                      <Row>
                         
                          <CardText> {room.roomtype} </CardText>
                      </Row>
                    </CardBody>
                  </Card> 
                 
                </Col>
                   ))}
  

              </Row>
   </div>
    );
  }}
