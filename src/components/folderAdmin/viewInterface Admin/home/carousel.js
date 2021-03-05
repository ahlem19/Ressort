import React, { Component } from 'react';
import axios from "axios"
import { Button ,Table,Row, Modal, ModalHeader, ModalBody,ModalFooter,Col,Form,FormGroup,Label,Input} from 'reactstrap';



const Carousel= props =>(
    <tr>
      <td  ><img style={{ height: '8rem' }}  className="img-fluid img-thumbnail border-primary d-block  m-2 " src={props.carousel.image} alt="img" /></td>
      <td>{props.carousel.captionText}</td>
      <td>{props.carousel.captionHeader}</td>
      <td>
        <a href="#" onClick={()=> {props.deleteCarousel(props.carousel._id)}}><span className="fa fa-trash text-danger" ></span></a>
      </td>
     <td>
     <a href="#" onClick={()=> {props.editCarousel(props.carousel._id)}}><span className="fa fa-edit" ></span></a>
     </td> 
    </tr>
  )

export default class CarouselInterface extends Component {

    constructor(props){
        super(props);
        this.deleteCarousels= this.deleteCarousels.bind(this);
        this.editCarousel= this.editCarousel.bind(this);
       

        this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeCaptionText=this.onChangeCaptionText.bind(this);
      this.onChangeCaptionHeader=this.onChangeCaptionHeader.bind(this);
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
        
          
        }
      }

 
    onChangeImage(e) {
      this.setState({
        image: e.target.value
      })
    }
  
    onChangeCaptionText(e) {
      this.setState({
        captionText: e.target.value
      })
    }
  
    onChangeCaptionHeader(e) {
      this.setState({
        captionHeader: e.target.value
      })
    }
  
  
  
    onSubmit(e) {
      e.preventDefault();
  
      const carousel = {
        image: this.state.image,
        captionText: this.state.captionText,
        captionHeader: this.state.captionHeader,
      
      }
  
      console.log(carousel);
  
      axios.post("http://localhost:5000/carousels/add",carousel)
      .then(res =>console.log(res.data))
  
      // window.location = '/';
    }
    onSubmite(e){
      e.preventDefault();
    }
    onSubmitEdit(e) {
    
      e.preventDefault();
     
  const id = this.state.id
      const carousel = {
        image: this.state.image,
        captionHeader: this.state.captionHeader,
        captionText: this.state.captionText
      }
  
      console.log(carousel);
  
      axios.post("http://localhost:5000/carousels/update/"+id, carousel)
        .then(res => console.log(res.data))
      
      // window.location = '/';
      
    }

    editCarousel(id){
      axios.get("http://localhost:5000/carousels/"+id)
      .then(response => {
        this.setState({
          image: response.data.image,
          captionText: response.data.captionText,
          captionHeader: response.data.captionHeader,
          id:id,
          showModalEdit:true
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }

      componentDidMount(){
        axios.get("http://localhost:5000/carousels/")
        .then(response=>{
          this.setState({ carousels:response.data})
        })
        .catch((error)=>{
          console.log(error)
        })

       
      }
   
      deleteCarousels(id){
       axios.delete("http://localhost:5000/carousels/"+id)
       .then(res=> console.log(res.data));
       this.setState({
         carousels:this.state.carousels.filter(el=>el._id !== id)
       })
      }
      carouselsList(){
        return this.state.carousels.map(currentcarousel =>{
          return <Carousel carousel={currentcarousel} deleteCarousel={this.deleteCarousels} key={currentcarousel._id} editCarousel={this.editCarousel}/>
        })
      }
 
    render() {
  
        return (
            <div>
          
           <h1>Logged Exercises</h1>
           <div className="md-form">
              <input type="text"  className="form-control" id="search" placeholder="Search" />
              
          </div>
          <table  className="table table-striped table-responsive-md btn-table">
            <thead className="thead-light" >
              <tr>
                <th>Image</th>
                <th>CaptionText <i className="fa fa-sort fa-  prefix"></i></th>
                <th>CaptionHeader</th>
                <th>X</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              {this.carouselsList()}
            </tbody>
          </table>
         
         <div className="text-right">
         <Button  color="primary"  onClick={()=>{this.setState({ showModal: true})}}><span className="fa fa-plus " ></span></Button>
         </div>
       
        <Modal isOpen={this.state.showModal} toggle={() =>this.setState({ showModal: false})}  >
                <ModalHeader toggle={() => this.setState({  showModal: false})} className=" white-text w-100 font-weight-bold py-2 text-center bg-primary" charCode="X"><h3 >Create New Carousel</h3></ModalHeader>
                <ModalBody>
         
   


<Table className="align-items-center table-flush" responsive>
                        <div style={{ 'max-height': '20rem', 'overflow': 'auto' }} >
                        
                 
           <form onSubmit={this.onSubmit}>  
             
          <div className="form-group"> 
         
       
             <input  type="text"
                required
                placeholder="Image"
                className="form-control"
                value={this.state.image}
                onChange={this.onChangeImage}
                /> 
          </div>
          <div className="form-group"> 
           
            <input  type="text"
                required
                placeholder="CaptionText"
                className="form-control"
                value={this.state.captionText}
                onChange={this.onChangeCaptionText}
                />
          </div>
          <div className="form-group"> 
            
            <input  type="text"
                required
                placeholder="CaptionHeader"
                className="form-control"
                value={this.state.captionHeader}
                onChange={this.onChangeCaptionHeader}
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
          <label>Caption Text: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.captionText}
              onChange={this.onChangeCaptionText}
              />
        </div>

        <div className="form-group">
          <label>Caption Header: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.captionHeader}
              onChange={this.onChangeCaptionHeader}
              />
        </div>
        
      

        {/* <div className="form-group">
          <input type="submit" value="Edit Carousel" className="btn btn-primary" />
        </div> */}
        <div className="form-group">
            <button  onClick={this.onSubmit} className="btn btn-primary justify-content-center" color="warning " > <i className="fa fa-paper-plane-o ml-1"  ></i> Save Change</button>
          </div>
      </form>

                        </div>
                    </Table>
                </ModalBody>
             
                    
                </Modal>
         


        
          </div>
        )
      }
    }

