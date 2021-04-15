import React, { Component } from 'react';
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,Form,Label,Input,FormGroup,Col} from 'reactstrap';
import axios from "axios"

const Carousel= (props )=>(
    <tr>
      <td><img style={{ height: '8rem',width:"10rem" }}  className="img-fluid img-thumbnail border-primary d-block  m-2 " src={props.carousel.image} alt="img" /></td>
      <td>{props.carousel.captionText}</td>
      <td>{props.carousel.captionHeader}</td>
      <td><a href="#" onClick={()=> {props.deleteCarousel(props.carousel._id)}}><span className="fa fa-trash text-danger" ></span></a></td>
      <td><a href="#" onClick={()=> {props.editCarousel(props.carousel._id)}}><span className="fa fa-edit" ></span></a></td> 
    </tr>
  )

export default class CarouselInterface extends Component {

    constructor(props){
        super(props);
        this.deleteCarousels= this.deleteCarousels.bind(this);
        this.editCarousel= this.editCarousel.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.fileChanged=this.fileChanged.bind(this)
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitEdit=this.onSubmitEdit.bind(this);
        

        this.state={
          carousels:[],
          image: '',
          captionText:'',
          captionHeader:'',
          showModal: false,
          showModalEdit: false,
          id:"",
          selectedFile: "",
          imagePreviewUrl: "",
          input:{"captionText":"","captionHeader":""},
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
  
      const carousel = {
        image: this.state.image,
        captionText: this.state.input["captionText"],
        captionHeader: this.state.input["captionHeader"],
      
      }
      axios.post("http://localhost:5000/carouselsRoom/add",carousel)
      .then(res =>console.log(res.data))
      .then( this.setState({
        carousels:[...this.state.carousels,carousel],
        imagePreviewUrl: "",
        image: "",
        input:{"captionText":"","captionHeader":""},
        captionText: "",
        captionHeader: "",
        imagePreviewUrl:"",
        showModal: false,
      }))
     .then( axios.get("http://localhost:5000/carouselsRoom/")
     .then(response=>{
       this.setState({ carousels:response.data})
     })
     .catch((error)=>{
       console.log(error)
     }))
    }
 
    onSubmitEdit(e) {
    
      e.preventDefault();
     
      const id = this.state.id
      const carousel = {
        image: this.state.image,
        captionText: this.state.input["captionText"],
        captionHeader: this.state.input["captionHeader"],
      }
      
  
      axios.post("http://localhost:5000/carouselsRoom/update/"+id, carousel)
        .then(res => console.log(res.data))
        .then( this.setState({
          image: "",
          input:{"captionText":"","captionHeader":""},
          captionText: "",
          captionHeader: "",
          showModalEdit: false,
          update:true
        }))
       
    }

    editCarousel(id){
      axios.get("http://localhost:5000/carouselsRoom/"+id)
      .then(response => {
        this.setState({
          image: response.data.image,
          input:{"captionText": response.data.captionText, "captionHeader": response.data.captionHeader},
          id:id,
          showModalEdit:true
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
      
    }
 

      componentDidMount(){
        axios.get("http://localhost:5000/carouselsRoom/")
        .then(response=>{
          this.setState({ carousels:response.data})
        })
        .catch((error)=>{
          console.log(error)
        })
      }
   
      deleteCarousels(id){
       axios.delete("http://localhost:5000/carouselsRoom/"+id)
       .then(res=> console.log(res.data));
       this.setState({
         carousels:this.state.carousels.filter(el=>el._id !== id)
       })
      }
      carouselsList(){
        return this.state.carousels.map(currentcarousel =>{
          return <Carousel carousel={currentcarousel} deleteCarousel={this.deleteCarousels} key={currentcarousel._id}  editCarousel={this.editCarousel}/>
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
 
    render() {
      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      if (this.state.imagePreviewUrl) {
        
        $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" id="image"/> </div>);
          }
          if(this.state.update==true){
            axios.get("http://localhost:5000/carouselsRoom/")
            .then(response=>{
              this.setState({ carousels:response.data})
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
                <th>CaptionText</th>
                <th>CaptionHeader</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.carouselsList()}
            </tbody>
          </Table>
         
        </div>
        
        <div className="text-right">
        
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>
         

        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
          <ModalHeader toggle={() => this.setState({  showModal: false, imagePreviewUrl: "",input:{"captionText":"","captionHeader":""}})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X"> Create New Carousel</ModalHeader>
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
                      placeholder="CaptionText"
                      name="captionText"
                      className="form-control"
                      value={this.state.input["captionText"]}
                      onChange={this.handleChange}
                      />
                </div>
                <div className="form-group"> 
                  <Input  type="text"
                      required
                      placeholder="CaptionHeader"
                      name="captionHeader"
                      className="form-control"
                      value={this.state.input["captionHeader"]}
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
        <ModalHeader toggle={() => this.setState({  showModalEdit: false,  imagePreviewUrl: "",input:{"captionText":"","captionHeader":""}})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X">Carousel edit</ModalHeader>
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
              <Label>Caption Text: </Label>
              <Input 
                  type="text" 
                  className="form-control"
                  name="captionText"
                  value={this.state.input["captionText"]}
                  onChange={this.handleChange}
                  />
            </div>

            <div className="form-group">
              <Label>Caption Header: </Label>
              <Input 
                  type="text" 
                  className="form-control"
                  name="captionHeader"
                  value={this.state.input["captionHeader"]}
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

