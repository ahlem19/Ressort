import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';


const SearchRooms= props =>(
    <tr>
      <td><img style={{ height: '8rem' }}  className="img-fluid img-thumbnail border-primary d-block  m-2 " src={props.searchRooms.image} alt="img" /></td>
      <td>{props.searchRooms.roomtype}</td>
      <td>{props.searchRooms.roomprice}</td>
      <td>{props.searchRooms.roomsize}</td>
      <td>{props.searchRooms.breakfast}</td>
      <td>{props.searchRooms.pets}</td>
      <td>
        <a href="#" onClick={()=> {props.deleteSearchRooms(props.searchRooms._id)}}><span className="fa fa-trash text-danger" ></span></a>
      </td>
     <td>
     <a href="#" onClick={()=> {props.editSearchRooms(props.searchRooms._id)}}><span className="fa fa-edit" ></span></a>
     </td> 
    </tr>
  )

export default class SearchRoomsInterface extends Component {

    constructor(props){
        super(props);
        this.deleteSeachRooms= this.deleteSearchRooms.bind(this);
        this.editSearchRooms= this.editSearchRooms.bind(this);

        this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeRoomType=this.onChangeRoomType.bind(this);
      this.onChangeRoomPrice=this.onChangeRoomPrice.bind(this);
      this.onChangeRoomSize=this.onChangeRoomSize.bind(this);
      this.onChangeBreakfast=this.onChangeBreakfast.bind(this);
      this.onChangePets=this.onChangePets.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
      this.onSubmitEdit=this.onSubmitEdit.bind(this);


        this.state={
          searchRooms:[],
          image: '',
          roomtype:'',
          roomprice:'',
          roomsize:'',
          breakfast:'',
          pets:'',
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
  
    onChangeRoomType(e) {
      this.setState({
      roomtype: e.target.value
      })
    }

    onChangeRoomPrice(e) {
      this.setState({
      roomprice: e.target.value
      })
    }
    onChangeRoomSize(e) {
      this.setState({
      roomsize: e.target.value
      })
    }
    onChangeBreakfast(e) {
      this.setState({
      breakfast: e.target.value
      })
    }
    onChangePets(e) {
      this.setState({
      pets: e.target.value
      })
    }
  
  
    onSubmit(e) {
      e.preventDefault();
  
      const searchRooms = {
        image: this.state.image,
        roomtype: this.state.roomtype,
        roomprice: this.state.roomprice,
        roomsize: this.state.roomsize,
        breakfast: this.state.breakfast,
        pets: this.state.pets,
      
      }
  
      console.log(searchRooms);
  
      axios.post("http://localhost:5000/searchrooms/add",searchRooms)
      .then(res =>console.log(res.data))
  
      // window.location = '/';
    }

    onSubmitEdit(e) {
    
      e.preventDefault();
     
  const id = this.state.id
      const searchRooms  = {
        image: this.state.image,
        roomtype: this.state.roomtype,
        roomprice: this.state.roomprice,
        roomsize: this.state.roomsize,
        breakfast: this.state.breakfast,
        pets: this.state.pets,
      }
  
      console.log(searchRooms );
  
      axios.post("http://localhost:5000/searchrooms/update/"+id, searchRooms )
        .then(res => console.log(res.data))
      
      // window.location = '/';
      
    }

    editSearchRooms(id){
      axios.get("http://localhost:5000/searchrooms/"+id)
      .then(response => {
        this.setState({
          image: response.data.image,
          roomtype: response.data.roomtype,
          roomprice: response.data.roomprice,
          roomsize: response.data.roomsize,
          breakfast: response.data.breakfast,
          pets: response.data.pets,
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
        axios.get("http://localhost:5000/searchrooms/")
        .then(response=>{
          this.setState({ searchRooms:response.data})
        })
        .catch((error)=>{
          console.log(error)
        })
      }
   
      deleteSearchRooms(id){
       axios.delete("http://localhost:5000/searchrooms/"+id)
       .then(res=> console.log(res.data));
       this.setState({
        searchRooms:this.state.searchRooms.filter(el=>el._id !== id)
       })
      }
      searchRoomsList(){
        return this.state.searchRooms.map(currentsearchrooms =>{
          return <SearchRooms searchRooms={currentsearchrooms} deleteSearchRooms={this.deleteSearchRooms} key={currentsearchrooms._id} editSearchRooms={this.editSearchRooms}/>
        })
      }
 
    render() {
        return (
            <div>
          
           <h1>Logged Exercises</h1>
          <table className="table table-striped table-responsive-md btn-table">
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Room Size</th>
                <th>Breakfast</th>
                <th>Pets</th>
                <th>X</th>
                <th>E</th>

              </tr>
            </thead>
            <tbody>
              {this.searchRoomsList()}
            </tbody>
          </table>
         

        <div className="text-right">
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>

        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
                <ModalHeader toggle={() => this.setState({  showModal: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X"> Create New Search Rooms</ModalHeader>
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
            <label>Room Type: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomtype}
                onChange={this.onChangeRoomType}
                />
          </div>
       
          <div className="form-group"> 
            <label>Room Price: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomprice}
                onChange={this.onChangeRoomPrice}
                />
          </div>
          <div className="form-group"> 
            <label>Room Size: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomsize}
                onChange={this.onChangeRoomSize}
                />
          </div>
          <div className="form-group"> 
            <label>Breakfast: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.breakfast}
                onChange={this.onChangeBreakfast}
                />
          </div>
          <div className="form-group"> 
            <label>Pets: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.pets}
                onChange={this.onChangePets}
                />
          </div>
  
          {/* <div className="form-group">
            <input type="submit" value="Create Search Rooms" className="btn btn-primary" />
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
                <ModalHeader toggle={() => this.setState({  showModalEdit: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">SearchRooms edit</ModalHeader>
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
            <label>Room Type: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomtype}
                onChange={this.onChangeRoomType}
                />
          </div>
       
          <div className="form-group"> 
            <label>Room Price: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomprice}
                onChange={this.onChangeRoomPrice}
                />
          </div>
          <div className="form-group"> 
            <label>Room Size: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.roomsize}
                onChange={this.onChangeRoomSize}
                />
          </div>
          <div className="form-group"> 
            <label>Breakfast: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.breakfast}
                onChange={this.onChangeBreakfast}
                />
          </div>
          <div className="form-group"> 
            <label>Pets: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.pets}
                onChange={this.onChangePets}
                />
          </div>
         
  
          {/* <div className="form-group">
            <input type="submit" value="Create Search Rooms" className="btn btn-primary" />
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

