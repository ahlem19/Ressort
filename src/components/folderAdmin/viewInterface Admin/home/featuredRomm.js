import React, { Component } from 'react';
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,Label,Col,Form,FormGroup,Input} from 'reactstrap';
import axios from "axios"


const FeaturedRooms= props =>(
    <tr>
      <td><img style={{ height: '8rem',width:"10rem" }}  className="img-fluid img-thumbnail border-primary d-block  m-2 " src={props.featuredRooms.image} alt="img" /></td>
      <td>{props.featuredRooms.type}</td>
      <td>{props.featuredRooms.details}</td>
      <td>{props.featuredRooms.price}</td>
      <td>{props.featuredRooms.nbrRoom}</td>
      <td>{props.featuredRooms.maxcapacity}</td>
      <td>{props.featuredRooms.pets}</td>
      <td>{props.featuredRooms.freebreakfast}</td>
      <td><a href="#" onClick={()=> {props.deleteFeaturedRooms(props.featuredRooms._id)}}><span className="fa fa-trash text-danger" ></span></a></td>
      <td><a href="#" onClick={()=>{props.editFeaturedRooms(props.featuredRooms._id)}}><span className="fa fa-edit" ></span></a></td> 
    </tr>
  )

export default class FeaturedRoomsInterface extends Component {

    constructor(props){
        super(props);
        this.deleteFeaturedRooms= this.deleteFeaturedRooms.bind(this);
        this.editFeaturedRooms= this.editFeaturedRooms.bind(this);
        this.handleChange=this.handleChange.bind(this); 
        this.fileChanged=this.fileChanged.bind(this)
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitEdit=this.onSubmitEdit.bind(this);


        this.state={
          featuredRooms:[],
          image: '',
          type:'',
          details:"",
          price:"",
          nbrRoom:"",
          maxcapacity:"",
          pets:"",
          freebreakfast:"",
          showModal: false,
          showModalEdit: false,
          id:"",
          selectedFile: "",
          imagePreviewUrl: "",
          input:{"type":"","details":"","price":"","nbrRoom":"", "maxcapacity":"","pets":"","freebreakfast":""},
          update:false
          
        }
      }
      
      

      deleteFeaturedRooms(id){
        axios.delete("http://localhost:5000/featuredrooms/"+id)
        .then(res=> console.log(res.data));
        this.setState({
         featuredRooms:this.state.featuredRooms.filter(el=>el._id !== id)
        })
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
  
      const featuredRooms = {
        image: this.state.image,
        type: this.state.input["type"],
        details: this.state.input["details"],
        price: this.state.input["price"],
        nbrRoom: this.state.input["nbrRoom"],
        maxcapacity: this.state.input["maxcapacity"],
        pets: this.state.input["pets"],
        freebreakfast: this.state.input["freebreakfast"],
      
      }
  
      axios.post("http://localhost:5000/featuredrooms/add",featuredRooms)
      .then(res =>console.log(res.data))
      .then( this.setState({
        featuredRooms:[...this.state.featuredRooms,featuredRooms],
        imagePreviewUrl: "",
        image: "",
        input:{"type":"","details":"","price":"","nbrRoom":"", "maxcapacity":"","pets":"","freebreakfast":""},
        type: "",
        details: "",
        price: "",
        nbrRoom: "",
        maxcapacity: "",
        pets: "",
        freebreakfast: "",
        showModal: false,
      }))
     .then( axios.get("http://localhost:5000/featuredrooms/")
     .then(response=>{
       this.setState({ featuredRooms:response.data})
     })
     .catch((error)=>{
       console.log(error)
     }))
    }

    onSubmitEdit(e) {
    
      e.preventDefault();
     
  const id = this.state.id
      const featuredRooms  = {
        image: this.state.image,
        type: this.state.input["type"],
        details: this.state.input["details"],
        price: this.state.input["price"],
        nbrRoom: this.state.input["nbrRoom"],
        maxcapacity: this.state.input["maxcapacity"],
        pets: this.state.input["pets"],
        freebreakfast: this.state.input["freebreakfast"],
      }
  
  
      axios.post("http://localhost:5000/featuredrooms/update/"+id, featuredRooms )
        .then(res => console.log(res.data))
        .then(this.setState({
          image: "",
          input:{"type":"","details":"","price":"","nbrRoom":"", "maxcapacity":"","pets":"","freebreakfast":""},
          type: "",
          details: "",
          price: "",
          nbrRoom: "",
          maxcapacity: "",
          pets: "",
          freebreakfast: "",
          showModalEdit: false,
          update:true
        }))
      
    }

    editFeaturedRooms(id){
      axios.get("http://localhost:5000/featuredrooms/"+id)
      .then(response => {
        this.setState({
          image: response.data.image,
          input:{"type":response.data.type,"details":response.data.details,"price":response.data.price,"nbrRoom":response.data.nbrRoom, "maxcapacity":response.data.maxcapacity,"pets":response.data.pets,"freebreakfast":response.data.freebreakfast},
          id:id,
          showModalEdit:true
        })  
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
    
    fileChanged (event) {
      this.setState({
        selectedFile: event.target.files[0]
      })
    
      let reader = new FileReader();
      
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
          
        });
      }
      reader.readAsDataURL(event.target.files[0])
      var pathImage = (document.getElementById('img').value).split('\\');
      var image="/"+pathImage[pathImage.length-1];
      this.setState({
        image: image
      })
      
    
    } 


      featuredRoomsList(){
        return this.state.featuredRooms.map(currentfeaturedrooms =>{
          return <FeaturedRooms featuredRooms={currentfeaturedrooms} deleteFeaturedRooms={this.deleteFeaturedRooms} key={currentfeaturedrooms._id} editFeaturedRooms={this.editFeaturedRooms}/>
        })
      }
 

    render() {
      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      if (this.state.imagePreviewUrl) {
        
        $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" id="image"/> </div>);
          }
          if(this.state.update==true){
            axios.get("http://localhost:5000/featuredrooms/")
      .then(response=>{
        this.setState({ featuredRooms:response.data})
      })
      .then(response=>{this.setState({ update:false })})
      .catch((error)=>{
        console.log(error)
      })
          }
    return (
      <div>
          <div class="tableFixHead" >
          <Table className="table table-striped table-responsive-md btn-table">
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Details</th>
                <th>Price</th>
                <th>NbrRoom</th>
                <th>Max Capacity</th>
                <th>Pets</th>
                <th>Fee Breakfast</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.featuredRoomsList()}
            </tbody>
          </Table>  
         </div>
          <div className="text-right">
            <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
          </div>

        
          <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
            <ModalHeader toggle={() => this.setState({  showModal: false ,imagePreviewUrl: "",image: "",input:{"type":"","details":"","price":"","nbrRoom":"", "maxcapacity":"","pets":"","freebreakfast":""}})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary"  charCode="X"> Create New FeaturedRooms</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.onSubmit} action="/" enctype="multipart/form-data" method="post">
               <Row>
                 <Col>{ $imagePreview }</Col>
                 <Col>
                      <Row>
                        <Col className="col-9"> 
                          <Input type="file" name="file-to-upload" id="img" onChange={this.fileChanged}/>
                        </Col>
                      </Row>
                 </Col>
               </Row>
             
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="type"
                    placeholder="Type"
                    className="form-control"
                    value={this.state.input["type"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="details"
                    placeholder="Details"
                    className="form-control"
                    value={this.state.input["details"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    value={this.state.input["price"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="nbrRoom"
                    placeholder="Nombre Room"
                    className="form-control"
                    value={this.state.input["nbrRoom"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="maxcapacity"
                    placeholder="Max Capacity"
                    className="form-control"
                    value={this.state.input["maxcapacity"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="pets"
                    placeholder="Pets"
                    className="form-control"
                    value={this.state.input["pets"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Input  type="text"
                    required
                    name="freebreakfast"
                    placeholder="Free Breakfast"
                    className="form-control"
                    value={this.state.input["freebreakfast"]}
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
          <ModalHeader toggle={() => this.setState({  showModalEdit: false ,imagePreviewUrl: "",image: "",input:{"type":"","details":"","price":"","nbrRoom":"", "maxcapacity":"","pets":"","freebreakfast":""}})}  className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Carousel edit</ModalHeader>
          <ModalBody>
                        
            <Form onSubmit={this.onSubmitEdit} action="/" enctype="multipart/form-data" method="post">
            
              <Row>
              <Col><img src={this.state.image} alt="icon" width="200" id="image"/></Col>
              <Col>
                    <Row>
                      <Col className="col-9"> 
                        <Input type="file" name="file-to-upload" id="img" onChange={this.fileChanged}/>
                      </Col>
                    </Row>
              </Col>
            </Row>
              <div className="form-group"> 
                <Label>Type: </Label>
                <Input  type="text"
                    required
                    name="type"
                    className="form-control"
                    value={this.state.input["type"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>Details: </Label>
                <Input  type="text"
                    required
                    name="details"
                    className="form-control"
                    value={this.state.input["details"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>Price: </Label>
                <Input  type="text"
                    required
                    name="price"
                    className="form-control"
                    value={this.state.input["price"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>NbrRoom: </Label>
                <Input  type="text"
                    required
                    name="nbrRoom"
                    className="form-control"
                    value={this.state.input["nbrRoom"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>Max Capacity: </Label>
                <Input  type="text"
                    required
                    name="maxcapacity"
                    className="form-control"
                    value={this.state.input["maxcapacity"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>Pets: </Label>
                <Input  type="text"
                    required
                    name="pets"
                    className="form-control"
                    value={this.state.input["pets"]}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group"> 
                <Label>Free Breakfast: </Label>
                <Input  type="text"
                    required
                    name="freebreakfast"
                    className="form-control"
                    value={this.state.input["freebreakfast"]}
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

