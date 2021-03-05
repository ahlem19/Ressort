import React, { Component } from 'react';
import {CarouselControl,CarouselItem,CarouselCaption,Carousel,CarouselIndicators,Button}from 'reactstrap';
import axios from "axios"


export default class CarouselRooms extends Component {

  constructor(props){
    super(props);
    this.state = {
            activeIndex: 0,
            // items :props.ListCourses
            items :[]}


        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
       
}
componentDidMount(){
  axios.get("http://localhost:5000/carouselsRoom/")
  .then(response=>{
    this.setState({ items:response.data})
  })
  .catch((error)=>{
    console.log(error)
  })
}
// componentWillReceiveProps(props) {
//     this.setState({  items: props.ListCourses,
//     })}

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
 
render() {
    const { activeIndex } = this.state;

    const slides = this.state.items.map((item) => {
      return (
        <CarouselItem
          className="carouselImg"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
          <img  className="d-block w-100 " style={{ height: '90vh' }} src={item.image} alt="img" />
          
          {/* <CarouselCaption captionText={item.captionText} captionHeader={item.captionHeader} className="bg-danger"  /> */}
          <div class="carousel-caption">
                <div class="full-width text-center transparent-bg">
                    <p>
                    {item.captionText}
                    </p>
                    <p>
                    {item.captionHeader} 
                    </p>
                    <Button className="btn-warning">RETURN HOME</Button>
                </div>
            </div>
      
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className=" mt-6 "
      >
        <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}