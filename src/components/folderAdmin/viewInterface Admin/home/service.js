import React, { Component } from 'react';
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,Label,Input,Form} from 'reactstrap';
import axios from "axios"


const Service= props =>(
    <tr>
      <td>{props.service.icon}</td>
      <td>{props.service.title}</td>
      <td>{props.service.text}</td>
      <td><a href="#" onClick={()=> {props.deleteService(props.service._id)}}><span className="fa fa-trash text-danger" ></span></a></td>
      <td><a href="#" onClick={()=> {props.editService(props.service._id)}}><span className="fa fa-edit" ></span></a></td> 
    </tr>
  )

export default class ServicesInterface extends Component {

    constructor(props){
        super(props);
        this.deleteServices= this.deleteServices.bind(this);
        this.editService= this.editService.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitEdit=this.onSubmitEdit.bind(this);


        this.state={
          services:[],
          icon:'',
          title: '',
          text:'',
          showModal: false,
          showModalEdit: false,
          input:{"icon":'',"title": '',"text":''},
          id:"",
          update:false
        }
      }
  
      handleChange(event){

        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const service = {
          icon:this.state.input["icon"],
          title: this.state.input["title"],
          text: this.state.input["text"]
        
        }
    
        axios.post("http://localhost:5000/services/add",service)
        .then(res =>console.log(res.data))
        .then( this.setState({
          services:[...this.state.services,service],
          icon:"",
          title: "",
          text: "",
          input:{"icon":'',"title": '',"text":''},
          showModal: false,
        }))
        .then(axios.get("http://localhost:5000/services/")
        .then(response=>{
          this.setState({ services:response.data})
        })
        .catch((error)=>{
          console.log(error)
        }))
      }
      onSubmitEdit(e) {
      
        e.preventDefault();
      
    const id = this.state.id
        const service = {
          icon:this.state.input["icon"],
          title: this.state.input["title"],
          text: this.state.input["text"]
        }
    
        axios.post("http://localhost:5000/services/update/"+id, service)
          .then(res => console.log(res.data))
          .then( this.setState({
            icon:"",
            title: "",
            text: "",
            input:{"icon":'',"title": '',"text":''},
            showModalEdit: false,
            update:true
          }))
        
      }

      editService(id){
        axios.get("http://localhost:5000/services/"+id)
        .then(response => {
          this.setState({
            input:{"icon":response.data.icon,"title": response.data.title,"text":response.data.text},
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
      if(this.state.update==true){
        axios.get("http://localhost:5000/services/")
          .then(response=>{
            this.setState({ services:response.data})
          })
          .then(response=>{this.setState({ update:false })})
          .catch((error)=>{
            console.log(error)
          })
      }
        return (
            <div>
          <div class="tableFixHead" >  
          <Table className="table">
            <thead className="thead-light">
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Text</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.servicesList()}
            </tbody>
          </Table>
        </div>

          <div className="text-right">
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>

        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
          <ModalHeader toggle={() => this.setState({  showModal: false,input:{"icon":'',"title": '',"text":''},})}  className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Create New Service</ModalHeader>
          <ModalBody>
           
                <Form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <Input  type="text"
                          required
                          name="icon"
                          placeholder="Icon"
                          className="form-control"
                          value={this.state.input["icon"]}
                          onChange={this.handleChange}
                          />
                    </div>
                    <div className="form-group"> 
                      <Input  type="text"
                          required
                          name="title"
                          placeholder="Title"
                          className="form-control"
                          value={this.state.input["title"]}
                          onChange={this.handleChange}
                          />
                    </div>
                    <div className="form-group"> 
                      <Input  type="text"
                          required
                          name="text"
                          placeholder="Text"
                          className="form-control"
                          value={this.state.input["text"]}
                          onChange={this.handleChange}
                          />
                    </div>
              

                    <div className="form-group">
                      <Button  type="submit" className="btn btn-primary justify-content-center" color="warning " > <i className="fa fa-paper-plane-o ml-1"  ></i> Save</Button>
                    </div>
              
              </Form>       
             
        </ModalBody>
     </Modal>


     <Modal isOpen={this.state.showModalEdit} toggle={() =>this.setState({ showModalEdit: false})}  >
        <ModalHeader toggle={() => this.setState({  showModalEdit: false,input:{"icon":'',"title": '',"text":''},})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Service edit</ModalHeader>
        <ModalBody>

        <Form onSubmit={this.onSubmitEdit}>
        <div className="form-group"> 
            <Label>Icon: </Label>
            <Input  type="text"
                required
                name="icon"
                className="form-control"
                value={this.state.input["icon"]}
                onChange={this.handleChange}
                />
          </div>
          <div className="form-group"> 
            <Label>Title: </Label>
            <Input  type="text"
                required
                name="title"
                className="form-control"
                value={this.state.input["title"]}
                onChange={this.handleChange}
                />
          </div>
          <div className="form-group"> 
            <Label>Text: </Label>
            <Input  type="text"
                required
                name="text"
                className="form-control"
                value={this.state.input["text"]}
                onChange={this.handleChange}
                />
          </div>
    
          <div className="form-group">
            <Button  type="submit" className="btn btn-primary justify-content-center" color="warning " > <i className="fa fa-paper-plane-o ml-1"  ></i> Save Change</Button>
          </div>
        </Form>

                </ModalBody>
            
                    
                </Modal>    

                
        
          </div>
        )
      }
    }

