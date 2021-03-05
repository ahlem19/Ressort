import React, { Component } from 'react';
import { Card, CardBody,CardImg,CardText, Row, Col } from "reactstrap";
import axios from "axios"


export default class FeaturedRooms extends Component {

  constructor(props){
    super(props);
    this.state={
        ListRooms :[],
                   
    }
     
}
componentDidMount(){
  axios.get("http://localhost:5000/featuredrooms/")
  .then(response=>{
    this.setState({  ListRooms:response.data})
  })
  .catch((error)=>{
    console.log(error)
  })
}
render() {
   

    return (
   <div>
       <h1 className="text-center mt-5">Featured Rooms</h1>
       <Row>
       {this.state.ListRooms.map((room, index) => (
                <Col className="mb-4 justify-content-center" lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" >
                    <CardImg style={{ height: '8rem' }}className="img-fluid img-thumbnail bg-secondary " key={room.id} variant="top" src={room.image}/>
                    <CardBody>
                      <Row>
                         
                          <CardText> {room.text} </CardText>
                      </Row>
                    </CardBody>
                  </Card> 
                 
                </Col>
                   ))}
  

              </Row>
   </div>
    );
  }}
