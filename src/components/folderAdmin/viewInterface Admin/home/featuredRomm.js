import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';


const FeaturedRooms= props =>(
    <tr>
      <td><img style={{ height: '8rem' }}  className="img-fluid img-thumbnail border-primary d-block  m-2 " src={props.featuredRooms.image} alt="img" /></td>
      <td>{props.featuredRooms.text}</td>
      <td>
        <a href="#" onClick={()=> {props.deleteFeaturedRooms(props.featuredRooms._id)}}><span className="fa fa-trash text-danger" ></span></a>
      </td>
     <td>
     <a href="#" onClick={()=>{props.editFeaturedRooms(props.featuredRooms._id)}}><span className="fa fa-edit" ></span></a>
     </td> 
    </tr>
  )

export default class FeaturedRoomsInterface extends Component {

    constructor(props){
        super(props);
        this.deleteFeaturedRooms= this.deleteFeaturedRooms.bind(this);
        this.editFeaturedRooms= this.editFeaturedRooms.bind(this);


        this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeText=this.onChangeText.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
      this.onSubmitEdit=this.onSubmitEdit.bind(this);


        this.state={
          featuredRooms:[],
          image: '',
          text:'',
          showModal: false,
          showModalEdit: false,
          id:""
        }
      }
  
  
 
    onChangeImage(e) {
      this.setState({
        image: e.target.value
      })
    }
  
    onChangeText(e) {
      this.setState({
        text: e.target.value
      })
    }
  
  
    onSubmit(e) {
      e.preventDefault();
  
      const featuredRooms = {
        image: this.state.image,
        text: this.state.text,
      
      }
  
      console.log(featuredRooms);
  
      axios.post("http://localhost:5000/featuredrooms/add",featuredRooms)
      .then(res =>console.log(res.data))
  
      // window.location = '/';
    }

    onSubmitEdit(e) {
    
      e.preventDefault();
     
  const id = this.state.id
      const featuredRooms  = {
        image: this.state.image,
        text: this.state.text,
      }
  
      console.log(featuredRooms );
  
      axios.post("http://localhost:5000/featuredrooms/update/"+id, featuredRooms )
        .then(res => console.log(res.data))
      
      // window.location = '/';
      
    }

    editFeaturedRooms(id){
      axios.get("http://localhost:5000/featuredrooms/"+id)
      .then(response => {
        this.setState({
          image: response.data.image,
          text: response.data.text,
          id:id,
          showModalEdit:true
        })   
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    }


      componentDidMount(){
        axios.get("http://localhost:5000/featuredrooms/")
        .then(response=>{
          this.setState({ featuredRooms:response.data})
        })
        .catch((error)=>{
          console.log(error)
        })
      }
   
      deleteFeaturedRooms(id){
       axios.delete("http://localhost:5000/featuredrooms/"+id)
       .then(res=> console.log(res.data));
       this.setState({
        featuredRooms:this.state.featuredRooms.filter(el=>el._id !== id)
       })
      }
      featuredRoomsList(){
        return this.state.featuredRooms.map(currentfeaturedrooms =>{
          return <FeaturedRooms featuredRooms={currentfeaturedrooms} deleteFeaturedRooms={this.deleteFeaturedRooms} key={currentfeaturedrooms._id} editFeaturedRooms={this.editFeaturedRooms}/>
        })
      }
 
    render() {
        return (
            <div>
          
           <h1>Logged Exercises</h1>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Text</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.featuredRoomsList()}
            </tbody>
          </table>
         

        <div className="text-right">
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>

        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
                <ModalHeader toggle={() => this.setState({  showModal: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary"  charCode="X"> Create New FeaturedRooms</ModalHeader>
                <ModalBody>
                    <Table className="align-items-center table-flush" responsive>
                        <div style={{ 'max-height': '20rem', 'overflow': 'auto' }} >
                        
                        
        <form onSubmit={this.onSubmit}>
        
          <div className="form-group"> 
            <label>Image: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.image}
                onChange={this.onChangeImage}
                />
          </div>
          <div className="form-group"> 
            <label>Text: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Text}
                onChange={this.onChangeText}
                />
          </div>
        
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
                <ModalHeader toggle={() => this.setState({  showModalEdit: false})}  className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Carousel edit</ModalHeader>
                <ModalBody>
                <Table className="align-items-center table-flush" responsive>
                        <div style={{ 'max-height': '20rem', 'overflow': 'auto' }} >
                        
                       
        <form onSubmit={this.onSubmitEdit}>
        
          <div className="form-group"> 
            <label>Image: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.image}
                onChange={this.onChangeImage}
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
            <input type="submit" value="edit FeaturedRooms" className="btn btn-primary" />
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

