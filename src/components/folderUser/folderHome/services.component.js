import React, { Component } from 'react';
import {Row,Col} from "reactstrap"
import axios from "axios"



export default class Services extends Component {

  constructor(props){
    super(props);
    this.state={
      items:[],
      num:0
    }
this.next=this.next.bind(this);
this.previous=this.previous.bind(this)
       
}

componentDidMount(){
  axios.get("http://localhost:5000/services/")
  .then(response=>{
    this.setState({ items:response.data})
  })
  .catch((error)=>{
    console.log(error)
  })
}
next(){
  if(this.state.num<this.state.items.length-4){
    this.setState({num:this.state.num+1})
  }
}
previous(){
  if(this.state.num>0){
    this.setState({num:this.state.num-1})
  }
}

render() {
 
  const services = this.state.items.map((item) => {
    return (
    <Col >
      <div class="text-center">
      <i  class={item.icon} aria-hidden="true"></i>
      </div>
     <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
      <p style={{ textAlign: 'center' }}>{item.text} </p>  
  </Col>)
  })
  
    return (
   <div>
       <h1 className="text-center mt-5">Services</h1>
       <Row>
       <Col xs={1} sm={1} md={1} lg={1} >
       <div class="col text-center">
       <button className="previous round" onClick={this.previous} style={{"text-decoration": "none","display": "inline-block","padding": "8px 16px"}}>&#8249;</button>      
      </div>
       </Col>
        {services[this.state.num]}
        {services[this.state.num+1]}
        {services[this.state.num+2]}
        {services[this.state.num+3]}
        <Col xs={1} sm={1} md={1} lg={1} >
        <div class="col text-center">
        <button className="next round" onClick={this.next } style={{"text-decoration": "none","display": "inline-block","padding": "8px 16px"}}>&#8250;</button>
        </div>
        </Col>
        </Row>
       
     


   </div>
    );
  }
}