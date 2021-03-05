import React from "react"
// import { Modal ,Col,Tabs, Row,Button,TabPane,TabContent,TabContainer,Nav,NavItem,NavLink,Form, InputGroup,FormGroup,FormLabel, FormControl,Table,ProgressBar,Image} from 'react-bootstrap'
import { Card, CardBody,  CardFooter,Modal ,Col,Tabs, Row,Button,TabPane,TabContent,Nav,NavItem,NavLink} from "reactstrap";
import classnames from 'classnames';
import {NavLink as RRNavLink,BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import { element } from "prop-types";

//import components from tabContent
import CarouselInterface from "../folderAdmin/viewInterface Admin/home/carousel";
import CarouselRoomInterface from "../folderAdmin/viewInterface Admin/room/carousel";
import ServiceInterface from "../folderAdmin/viewInterface Admin/home/service";
import FeaturedRoomInterface from "../folderAdmin/viewInterface Admin/home/featuredRomm";
import SearchRoomInterface from "../folderAdmin/viewInterface Admin/room/searchRooms";


class InterfaceAdmin extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      activeTab4: '8',
      activeTab3: '7',
      activeTab2: '5',
      activeTab: '1',
      numSection:1,
      curriculum:[],
      newCourse:"",
      documentname:"",
      image :"",
      date : new Date(),
      price:"",
      description:"",
      showTabs:true
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.handler=this.handler.bind(this);
    this.handler2=this.handler2.bind(this);
    this.handler3=this.handler3.bind(this);
    this.handler4=this.handler4.bind(this)

   
  }
  handler(documentname,date,description){
    this.setState({
    documentname:documentname,
    date : date,
    description:description

    })
  }
  handler2(image){
    this.setState({
    image :image,

    })
  }
  handler3(price){
    this.setState({
    price :price,

    })
  }
  handler4(curriculum){
    this.setState({
      curriculum :curriculum,

    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  toggle2(tab2) {
    if (this.state.activeTab2 !== tab2) {
      this.setState({ activeTab2: tab2 });
    }
  }
  toggle3(tab3) {
    if (this.state.activeTab3 !== tab3) {
      this.setState({ activeTab3: tab3 });
    }
  }
  toggle4(tab4) {
    if (this.state.activeTab4 !== tab4) {
      this.setState({ activeTab4: tab4 });
    }
  }

 


render(){
 
  return(
    <div>
      <Col className="justify-content-center" sm="12" md="12" lg="12" xl="12" >
        <Card  className="mt-2 mb-2 mr-2 ml-2 card-stats  mb-xl-0"  >
          <CardBody  >
            <Row>
              <Col sm="2" md="2" lg="2" xl="2">

                <Nav  vertical tabs>

                  <NavItem>

                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                      Home
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}onClick={() => { this.toggle('2'); }}>
                      Rooms
                    </NavLink>
                  </NavItem>

              

                </Nav>
              </Col>

              <Col sm="10" md="10" lg="10" xl="10">
                <TabContent activeTab={this.state.activeTab}>

                  <TabPane tabId="1">{ this.state.activeTab == 1 ? (<div>
                  
<Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab2 === '5' })}
            onClick={() => { this.toggle2('5'); }}
          >
            Carousel
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab2 === '6' })}
            onClick={() => { this.toggle2('6'); }}
          >
           Featured Rooms
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab2 === '7' })}
            onClick={() => { this.toggle2('7'); }}
          >
            Services
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab2}>
        <TabPane tabId="5">
        
        <CarouselInterface />       
                            
        </TabPane>
        <TabPane tabId="6">
        {/* <TargetYourStudents showStep={this.state.showStep} /> */}
        <FeaturedRoomInterface/>
        </TabPane>
        <TabPane tabId="7">
        
        <ServiceInterface/>

        </TabPane>
      </TabContent>
  </div>) : null }</TabPane>

                  <TabPane tabId="2">
                
                    <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab3 === '8' })}
            onClick={() => { this.toggle3('8'); }}
          >
           Carousel Rooms
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab3 === '9' })}
            onClick={() => { this.toggle3('9'); }}
          >
           Search Rooms
          </NavLink>
        </NavItem>
        
      </Nav>
      <TabContent activeTab={this.state.activeTab3}>
        <TabPane tabId="8">
        
        {/* <Curriculum curriculum={this.state.curriculum}  handler4={this.handler4} /> */}
        <CarouselRoomInterface/>
                       
        </TabPane>
        <TabPane tabId="9">
        
        {/* <Curriculum curriculum={this.state.curriculum}  handler4={this.handler4} /> */}
        <SearchRoomInterface/>
                       
        </TabPane>
        
      </TabContent>
                  </TabPane>

            
                </TabContent>
        </Col>
      </Row>
     
    </CardBody>

  </Card>
</Col>

</div>
 
  )}}
export default   InterfaceAdmin






