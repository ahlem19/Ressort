import React, { Component}from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LogoHotel from "../../images/logo.svg"


export default class Navbarr extends Component {
constructor(props){
  super(props);
  this.state={
    collapsed:false,
   
  }
  this.toggleNavbar = this.toggleNavbar.bind(this);
}


toggleNavbar(){
  this.setState({collapsed:!this.state.collapsed})
 }


  render() {
    
    return (


       <Navbar color="light" light expand="md" >
        <NavbarBrand href="/" ><img src={LogoHotel}  alt="Beach Resort"/></NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.collapsed} navbar>

          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink to="/user/home" tag={Link}>Home</NavLink>
            
            </NavItem>
            <NavItem>
              <NavLink to="/user/rooms" tag={Link}>Rooms</NavLink>
            
            </NavItem>
            
          </Nav>
        </Collapse>
        </Navbar> 


    );
  
}
}





