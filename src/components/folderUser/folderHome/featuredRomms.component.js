import React, { Component } from 'react';
import { Card, CardBody,CardImg,CardText, Row, Col ,ModalBody,ModalHeader,Modal,ModalFooter,Button} from "reactstrap";
import axios from "axios"



export default class FeaturedRooms extends Component {

  constructor(props){
    super(props);
    this.state={
        ListRooms :[],
        showModal:false,
        details :"",
        price:"",
        maxcapacity:"",
        pets:"",
        freebreakfast:"",
        showModalEdit: false
                   
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
getDescription(event){
  event.preventDefault();
 
  let details = this.state.ListRooms[event.target.getAttribute('index')].details
  let price=this.state.ListRooms[event.target.getAttribute('index')].price
  let maxcapacity=this.state.ListRooms[event.target.getAttribute('index')].maxcapacity
  let pets=this.state.ListRooms[event.target.getAttribute('index')].pets
  let freebreakfast=this.state.ListRooms[event.target.getAttribute('index')].freebreakfast
              
  this.setState({ details: details,price: price,maxcapacity: maxcapacity,pets: pets,freebreakfast: freebreakfast, index:event.target.getAttribute('index'), showModal: true})

}
render() {
   

    return (
   <div>
       <h1 className="text-center mt-5">Featured Rooms</h1>
       <Row>
       {this.state.ListRooms.map((room, index) => (
                <Col className="mb-4 justify-content-center" lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" >
                  <div className="container mydivouter">
                    <CardImg style={{ height: '8rem' }}className="img-fluid img-thumbnail bg-secondary " key={room.id} variant="top" src={room.image}/>
                    
                      <button  index={index} onClick={this.getDescription.bind(this)} className="mybuttonoverlap btn btn-info">FEATURES</button>
                    
                    </div>
                    <CardBody>
                      <Row className="justify-content-center">
                          <CardText> {room.type} </CardText>
                      </Row>
                    </CardBody>
                  </Card> 
                 

                </Col>
                   ))}
  

  <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
        <ModalHeader toggle={() => this.setState({  showModal: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X"><h3 >Details</h3></ModalHeader>
        <ModalBody>
                    
              <Row>
                <Col>
                <h1>Details</h1>
                <p>{this.state.details}</p>
                </Col>
                {/* <Col>
                <h1>Info</h1>
              <h6>Price:{this.state.price}</h6>
              <h6>Max Capacity:{this.state.maxcapacity}</h6>
              <h6>Pets:{this.state.pets}</h6>
              <h6>Free Breakfast:{this.state.freebreakfast}</h6>

                </Col>
              </Row>
              <Row>
                <h1>Extras</h1>
                <Col><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></Col>
                <Col><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></Col>
                <Col><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></Col> */}
              </Row>

                        </ModalBody>
                        <ModalFooter>
                        <button> RESERVE ROOM</button>
                        </ModalFooter>
                            
          </Modal>
              </Row>
      
   </div>

    );
  }}
