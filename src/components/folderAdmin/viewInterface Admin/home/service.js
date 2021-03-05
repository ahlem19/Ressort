import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';


const Service= props =>(
    <tr>
      <td>{props.service.title}</td>
      <td>{props.service.text}</td>
      <td>
        <a href="#" onClick={()=> {props.deleteService(props.service._id)}}><span className="fa fa-trash text-danger" ></span></a>
      </td>
     <td>
     <a href="#" onClick={()=> {props.editService(props.service._id)}}><span className="fa fa-edit" ></span></a>
     </td> 
    </tr>
  )

export default class ServicesInterface extends Component {

    constructor(props){
        super(props);
        this.deleteServices= this.deleteServices.bind(this);
        this.editService= this.editService.bind(this);

       this.onChangeTitle = this.onChangeTitle.bind(this);
       this.onChangeText=this.onChangeText.bind(this);
       this.onSubmit=this.onSubmit.bind(this);
       this.onSubmitEdit=this.onSubmitEdit.bind(this);


        this.state={
          services:[],
          title: '',
          text:'',
          showModal: false,
          showModalEdit: false,
          id:""
        }
      }
  
  
 
    onChangeTitle(e) {
      this.setState({
        title: e.target.value
      })
    }
  
    onChangeText(e) {
      this.setState({
        text: e.target.value
      })
    }
  
  
    onSubmit(e) {
      e.preventDefault();
  
      const service = {
        title: this.state.title,
        text: this.state.text
      
      }
  
      console.log(service);
  
      axios.post("http://localhost:5000/services/add",service)
      .then(res =>console.log(res.data))
  
      // window.location = '/';
    }
    onSubmitEdit(e) {
    
      e.preventDefault();
     
  const id = this.state.id
      const service = {
        title: this.state.title,
        text: this.state.text
      }
  
      console.log(service);
  
      axios.post("http://localhost:5000/services/update/"+id, service)
        .then(res => console.log(res.data))
      
      // window.location = '/';
      
    }

    editService(id){
      axios.get("http://localhost:5000/services/"+id)
      .then(response => {
        this.setState({
          title: response.data.title,
          text: response.data.text,
          id:id,
          showModalEdit:true
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }


      componentDidMount(){
        axios.get("http://localhost:5000/services/")
        .then(response=>{
          this.setState({ services:response.data})
        })
        .catch((error)=>{
          console.log(error)
        })
      }
   
      deleteServices(id){
       axios.delete("http://localhost:5000/services/"+id)
       .then(res=> console.log(res.data));
       this.setState({
         services:this.state.services.filter(el=>el._id !== id)
       })
      }

      servicesList(){
        return this.state.services.map(currentservice =>{
          return <Service service={currentservice} deleteService={this.deleteServices} key={currentservice._id} editService={this.editService}/>
        })
      }
 
    render() {
        return (
            <div>
          
           <h1>Logged Exercises</h1>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Text</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.servicesList()}
            </tbody>
          </table>
         

          <div className="text-right">
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>

        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
                <ModalHeader toggle={() => this.setState({  showModal: false})}  className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Create New Service</ModalHeader>
                <ModalBody>
                    <Table className="align-items-center table-flush" responsive>
                        <div style={{ 'max-height': '20rem', 'overflow': 'auto' }} >
                        
                     
        <form onSubmit={this.onSubmit}>
        
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group"> 
            <label>Text: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.text}
                onChange={this.onChangeText}
                />
          </div>
    
  
          {/* <div className="form-group">
            <input type="submit" value="Create Service" className="btn btn-primary" />
          </div> */}

<div className="form-group">
            <button  onClick={this.onSubmit} className="btn btn-primary justify-content-center" color="warning " > <i className="fa fa-paper-plane-o ml-1"  ></i> Save</button>
          </div>
         
        </form>

                        </div>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Row>  
                  </Row>
                </ModalFooter>
                    
                </Modal>
         

                <Modal isOpen={this.state.showModalEdit} toggle={() =>this.setState({ showModalEdit: false})}  >
                <ModalHeader toggle={() => this.setState({  showModalEdit: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Service edit</ModalHeader>
                <ModalBody>
                <Table className="align-items-center table-flush" responsive>
                        <div style={{ 'max-height': '20rem', 'overflow': 'auto' }} >
                       
        <form onSubmit={this.onSubmitEdit}>
        
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group"> 
            <label>Text: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.text}
                onChange={this.onChangeText}
                />
          </div>
    
  
          {/* <div className="form-group">
            <input type="submit" value="Create Service" className="btn btn-primary" />
          </div> */}
          <div className="form-group">
            <button  onClick={this.onSubmit} className="btn btn-primary justify-content-center" color="warning " > <i className="fa fa-paper-plane-o ml-1"  ></i> Save Change</button>
          </div>
        </form>

                        </div>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Row>  
                  </Row>
                </ModalFooter>
                    
                </Modal>
        
          </div>
        )
      }
    }

