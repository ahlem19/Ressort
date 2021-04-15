import React, { Component } from 'react';
import { Card, CardBody,CardImg,CardText, Row, Col,ModalBody,ModalHeader,Modal,ModalFooter,Form,Label ,Input,Button} from "reactstrap";
import axios from "axios"
import { Redirect  } from 'react-router-dom';

export default class SearchRooms extends Component {

  constructor(props){
    super(props);
    this.state={
        ListRooms :[],
        changeRouteBooking:false,
        showModal:false,
        rooms:["All","Single","Double","Triple","Quadruple","Family"],
        guests:["All","1","2","3","4","5"],
        input:{"type":"All","guest":"All"},
        maxPrice:"",
        values:null,
        details :"",
        price:"",
        maxcapacity:"",
        pets:"",
        freebreakfast:"",           
    }
    this.handleChange = this.handleChange.bind(this);
    
    
}
componentDidMount(){
   axios.get("http://localhost:5000/searchrooms/")
   .then(response=>{
     this.setState({  ListRooms:response.data})

     if(response.data.length >0){
      this.setState({
      // rooms:[this.state.rooms,...response.data.map(room=>room.type)],
      // guests:[this.state.guests,...response.data.map(room=>room.maxcapacity)],
      // prices:response.data.map(room=>room.price),
      maxPrice:Math.max(...response.data.map(room=>room.price)),
      values:Math.max(...response.data.map(room=>room.price)),
     
    })}})
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

handleChange(event){

  let input = this.state.input;
  input[event.target.name] = event.target.value;
  this.setState({
    input,
    values:document.getElementById("price").value 
  });

   axios.get("http://localhost:5000/searchrooms/")
   .then(response=>{
     if(this.state.input["type"]=="All" && this.state.input["guest"]=="All"&& this.state.values==this.state.maxPrice){
      this.setState({  ListRooms:response.data})
     }else if(this.state.input["type"]!="All" && this.state.input["guest"]=="All"&& this.state.values==this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.type.split(" ", 1) ==  this.state.input["type"])})
     }
     else if(this.state.input["type"]=="All" && this.state.input["guest"]!="All"&& this.state.values==this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.maxcapacity===  this.state.input["guest"])})
     }
     else if(this.state.input["type"]=="All" && this.state.input["guest"]=="All"&& this.state.values!=this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.price <=  this.state.values)})
     }
     else if(this.state.input["type"]!="All" && this.state.input["guest"]!="All"&& this.state.values==this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.type.split(" ", 1) ==  this.state.input["type"] && el.maxcapacity===  this.state.input["guest"])})
     }
     else if(this.state.input["type"]!="All" && this.state.input["guest"]=="All"&& this.state.values!=this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.type.split(" ", 1) ==  this.state.input["type"] && el.price <=  this.state.values)})
     }
     else if(this.state.input["type"]=="All" && this.state.input["guest"]!="All"&& this.state.values!=this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.maxcapacity===  this.state.input["guest"] && el.price <=  this.state.values)})
     }
    
     else if(this.state.input["type"]!="All" && this.state.input["guest"]!="All"&& this.state.values!=this.state.maxPrice){
      this.setState({  ListRooms:response.data.filter(el=>el.maxcapacity===  this.state.input["guest"] && el.type.split(" ", 1) == this.state.input["type"] && el.price <=  this.state.values)})
     }
    
     
   })
}

render() {
  if(this.state.changeRouteBooking)
  return ( <Redirect to="/user/booking"/> )
    else
  return (
   <div>
      <h1 className="text-center mt-5">Search Rooms</h1>
       
     <Form >
     <Row>
      <Col xs={12} sm={6} md={6} lg={3}>
        <div className="form-group"> 
          <Label>Room Type: </Label>
          <select ref="userInput" required className="form-control" value={this.state.input["type"]} onChange={this.handleChange} name="type">
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
          <Label>Guests: </Label>
          <select ref="userInput" required className="form-control" value={this.state.input["guest"]} onChange={this.handleChange} name="guest">
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
          <Label >Room Price {this.state.values} DT</Label>
          <Input type="range" min={0} max={this.state.maxPrice} id="price" value={this.state.values} onChange={this.handleChange}className="form-control"/>
        </div>
      </Col>
 
      <Col xs={12} sm={6} md={6} lg={2}>
        <div className="form-group">
          <Label >Room Size</Label>
          <div className="size-inputs">
            <Row>
              <Col><Input type="number" name="minSize" value={0}
              // onChange={handleChange}
              className="size-input"
            /></Col>
              <Col><Input type="number" name="maxSize"  value={100}
              // onChange={handleChange}
              className="size-input"
            /></Col>
            </Row>
            
            
          </div>
        </div>
      </Col>
      
      <Col xs={12} sm={6} md={6} lg={2}>
        <div className="form-group">
          <div className="single-extra">
            <Input type="checkbox" name="breakfast" id="breakfast"
                  // checked={breakfast}
                  // onChange={handleChange}
                />
            <Label htmlFor="breakfast">breakfast</Label>
          </div>
          <div className="single-extra">
            <Input type="checkbox" name="pets"
                  // checked={pets}
                  // onChange={handleChange}
                />
            <Label htmlFor="breakfast">pets</Label>
          </div>
        </div>
      </Col>

    </Row>
  </Form>
  
  <Row>
    {this.state.ListRooms.map((room, index) => (
      <Col className="mb-4 justify-content-center" lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0" >
          <div className=" container mydivouter">
            <CardImg style={{ height: '8rem' }}className="img-fluid img-thumbnail bg-secondary " key={room.id} variant="top" src={room.image}/>
            <Button index={index} onClick={this.getDescription.bind(this)} className="mybuttonoverlap btn btn-info">FEATURES</Button>
          </div>
            <CardBody>
              <Row className="justify-content-center">
                <CardText> {room.type} </CardText>
              </Row>
            </CardBody>
        </Card> 
        
        
      </Col>))}

      <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
          <ModalHeader toggle={() => this.setState({  showModal: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X"><h3 >Details</h3></ModalHeader>
          <ModalBody>
      
            <Row>
              <Col>
                <h1>Details</h1>
                <p >{this.state.details}</p>
              </Col>
              <Col>
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
              <Col><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>  this.setState({changeRouteBooking:true}) }> RESERVE ROOM</Button>
          </ModalFooter>
        </Modal>
    </Row>
   </div>
    );
  }}
