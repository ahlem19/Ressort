import React, { Component}from 'react';
import { Form,Input,Label,Col,Row} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"


export default class Booking extends Component {
  constructor(props){
    super(props);
    this.state={
        ListRooms :[],
        rooms:["Single","Double","Triple","Quadruple","Family"],
        guests:["1","2","3","4","6"],
        nbrs:["1","2","3","4","5"],
        input:{"type":"Double","guest":"2"},
        dateArriv:new Date(),
        dateDep:new Date(),
        numSection:1,
                    
    }
 
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    
    
}
componentDidMount(){
   axios.get("http://localhost:5000/searchrooms/")
   .then(response=>{
     this.setState({  ListRooms:response.data})

     if(response.data.length >0){
      this.setState({
      room: "Double",
      guest: "1",
      nbr:"1"
     
},()=>{let elm = document.createElement('div');
      
elm.className = 'justify-content-md-center';  // add all your css styles in a class

elm.id = 'section' + this.state.numSection;
for (var i = 0; i < this.state.nbr; i++) {
let goldenSection = document.getElementById("goldenSection") 

let newSection = goldenSection.cloneNode(true)
newSection.style.display = "block"
newSection.setAttribute("id", this.state.numSection)
elm.appendChild(newSection)

 
document.getElementById("addSection").appendChild(elm);


this.setState({numSection:this.state.numSection+1,

})
}

let id="section"+(this.state.numSection-1)
if(this.state.numSection-1> 0){
document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}})

  }

   })
   .catch((error)=>{
     console.log(error)
   })

 }

 onChange(){
  let type = document.getElementsByName("type") 
  console.log (type)
 }
 onChangeDateArriv(date) {
  this.setState({
    dateArriv: date
  })

}
onChangeDateDep(date) {
  this.setState({
    dateDep: date
  })

}
  handleChange(event){

    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
      room: input["type"],
      guest: input["guest"],
      // nbr: input["nbr"]
    })
    
    

  }

  add(event) {
    this.setState({
     
       nbr: event.target.value
    },()=>{ let elm = document.createElement('div');
      
    elm.className = 'justify-content-md-center';  // add all your css styles in a class
    
   elm.id = 'section' + this.state.numSection;
   for (var i = 0; i < this.state.nbr; i++) {
   let goldenSection = document.getElementById("goldenSection") 
   
  let newSection = goldenSection.cloneNode(true)
  newSection.style.display = "block"
  newSection.setAttribute("id", this.state.numSection)
  elm.appendChild(newSection)
 
     
  document.getElementById("addSection").appendChild(elm);
 

  this.setState({numSection:this.state.numSection+1,
   
  })
  }
 
  let id="section"+(this.state.numSection-1)
 if(this.state.numSection-1> 0){
  document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }
  })
     
}


// delete(){
//   // let section=(this.state.numSection-1)
// let id="section"+(this.state.numSection-1)
// console.log(id)
//   document.getElementById(id).parentNode.removeChild(document.getElementById(id));
//  }
  render() {
 
    return (
    <div>
      <Form >
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <Label>Arrival Date </Label>
                <DatePicker
                  selected={this.state.dateArriv}
                  onChange={this.onChangeDateArriv.bind(this)}
                />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
                <Label>Date of departure </Label>
                <DatePicker
                  selected={this.state.dateDep}
                  onChange={this.onChangeDateDep.bind(this)}
                />
          </Col>
        </Row>
      <Row>
      <Col xs={12} sm={6} md={6} lg={3}>
              <div className="form-group"> 
                <Label>Number Rooms: </Label>
                <select ref="userInput" required className="form-control" value={this.state.nbr} onChange={this.add} name="nbr">
                      {
                        this.state.nbrs.map(function(nbr) {
                          return <option 
                            key={nbr}
                            value={nbr}>{nbr}
                            </option>;
                        })
                      }
                </select>
              </div>
            </Col>
      </Row>
      
      
    </Form>
    {/* <button onClick={this.add.bind(this)}>add</button> */}
    {/* <button onClick={this.delete.bind(this)}>remove</button> */}
      <div id="goldenSection" style={{display : "none"}}>
        
        <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
              <div className="form-group"> 
                <Label>Room Type: </Label>
                <select ref="userInput" required className="form-control" value={this.state.room} onChange={this.handleChange} name="type">
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
                <Label>Adult: </Label>
                <select ref="userInput" required className="form-control" value={this.state.guest} onChange={this.handleChange} name="guest">
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
            <Col xs={12} sm={6} md={6} lg={3}>
              <div className="form-group"> 
                <Label>children: </Label>
                <select ref="userInput" required className="form-control" value={this.state.guest} onChange={this.handleChange} name="guest">
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
            <Col xs={12} sm={6} md={6} lg={3}>
              <div className="form-group"> 
                <Label>Baby: </Label>
                <select ref="userInput" required className="form-control" value={this.state.guest} onChange={this.handleChange} name="guest">
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
          </Row>
         
        </div>
        <div id="addSection" onBlur={this.onChange.bind(this)} ></div>
        
    </div>

    );
  
}


}





