import React, { Component } from 'react';
import {Row,Col} from "reactstrap"
import axios from "axios"



export default class Services extends Component {

  constructor(props){
    super(props);
    this.state={
      items:[]
    }

       
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

render() {
 
  const services = this.state.items.map((item) => {
    return (
    <Col xs={12} sm={6} md={6} lg={3} >
      <div class="text-center">
      <i  class="fa fa-bed fa-2x text-primary " aria-hidden="true"></i>
      </div>
     <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
      <p style={{ textAlign: 'center' }}>{item.text} </p>  
  </Col>)
  })

    return (
   <div>
       <h1 className="text-center mt-5">Services</h1>
       <Row>
 {services}

</Row>

   </div>
    );
  }
}