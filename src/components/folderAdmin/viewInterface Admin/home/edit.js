import React, { Component } from 'react';
import axios from "axios";



export default class EditCarousel extends Component {
  constructor(props){
      super(props);

      this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeCaptionText = this.onChangeCaptionText.bind(this);
      this.onChangeCaptionHeader = this.onChangeCaptionHeader.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    

      this.state={
        image: '',
        captionText: '',
        captionHeader: '',
        carousels: []
      }
  }

  componentDidMount(){
    const path = window.location.pathname.split('/')
const id = path[path.length - 1]
    axios.get("http://localhost:5000/carousels/"+id)
    .then(response => {
      this.setState({
        image: response.data.image,
        captionText: response.data.captionText,
        captionHeader: response.data.captionHeader
      })   
    })
    .catch(function (error) {
      console.log(error);
    })
   

    // axios.get("http://localhost:5000/carousels/")
    // .then(response => {
    //   if (response.data.length > 0) {
    //     this.setState({
    //       carousels: response.data.map(carousel => carousel.id),
    //     })
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  
  }
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    })
  }

  onChangeCaptionHeader(e) {
    this.setState({
      captionHeader: e.target.value
    })
  }

  onChangeCaptionText(e) {
    this.setState({
      captionText: e.target.value
    })
  }


  onSubmit(e) {
    
    e.preventDefault();
    const path = window.location.pathname.split('/')
const id = path[path.length - 1]
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

  render() {
    return (
    <div>
      <h3>Edit Carousel</h3>
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
      

        <div className="form-group">
          <input type="submit" value="Edit Carousel" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
