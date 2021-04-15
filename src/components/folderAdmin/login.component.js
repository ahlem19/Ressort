import React from "react";
// reactstrap components
import {Button,Card, CardHeader,CardBody, FormGroup, Form,Input,InputGroupAddon, InputGroupText,InputGroup, Row,Col,NavLink} from "reactstrap";
import { Link ,Redirect  } from 'react-router-dom';
// import { Link ,Redirect , BrowserRouter as Router,Switch, Route, } from 'react-router-dom';

class Login extends React.Component {

  constructor(){
    super()
  
    this.state={
      input: {email:"ahlem1809@hotmail.fr",password:"ahlem123"},
      errors: {},
      authItem:[ {email:"ahlem1809@hotmail.fr",password:"ahlem123"}, {email:"ahlem@hotmail.fr",password:"ahlem1453"}],
      showModalCart: false,
      isLoggedin:false,
      showInterfaceAdmin:false
      
    }
  }
    
 
handleChange(event){
  let input = this.state.input;
  input[event.target.name] = event.target.value;
  this.setState({
    input
  });
}

validate(){
  let input = this.state.input;
  let errors = {};
  let isValid = true;

  if (!input["email"]) {
    isValid = false;
    errors["email"] = "Please enter your email Address.";
  }

  if (typeof input["email"] !== "undefined") {  
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(input["email"])) {
      isValid = false;
      errors["email"] = "Please enter valid email address.";
    }
  }
  
  if (!input["password"]) {
    isValid = false;
    errors["password"] = "Please enter your password.";
  }

  if (typeof input["password"] !== "undefined") {
    if(input["password"].length < 6){
        isValid = false;
        errors["password"] = "Please add at least 6 charachter.";
    }
  }

  this.setState({
    errors: errors
  });

  return isValid;
}

handleSubmit(event) {
  event.preventDefault();
  if(this.validate()){
   
    let valideItem=false
     let input = this.state.input;
     let errors = {};
        
        this.state.authItem.map(item=>{
          if((item.email==input["email"])&&(item.password==input["password"])){
            valideItem=true
          }
        })
      // let input = {};
   
     
      if(valideItem==false){
        errors["sign"] = "Password or Email incorrect !?";
        this.setState({errors: errors });
          } 
          else if (valideItem==true){
            this.setState({
              showInterfaceAdmin: true
              })
              
          }
    

      input["email"] = "";
      input["password"] = "";
      
     
      this.setState({input:input});
  }
 
}


  render() {
    if(this.state.showInterfaceAdmin)
      return ( <Redirect to="/admin/interfaceAdmin"/> )
	      else 
      return(
        <div>
          <div class=" d-flex justify-content-center mt-5 ">


          <Col lg="5" md="7">
      
          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              
            <div className="text-muted text-center mt-2 mb-3">
                <h6>Sign in with</h6>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                 <i class="fa fa-github fa-2x" aria-hidden="true"></i>

                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                 <i class="fa fa-google fa-2x " aria-hidden="true"></i>

                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h6>Or sign in with credentials</h6>
              </div>
              <Form role="form" onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email"  name="email" value={this.state.input.email} onChange={this.handleChange.bind(this)}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-danger">{this.state.errors.email}</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" name="password" value={this.state.input.password} onChange={this.handleChange.bind(this)}/> 
                  </InputGroup>
                </FormGroup>
                <div className="text-danger">{this.state.errors.password}</div> <br/>
                
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                
   
                <Button className="my-4" color="primary" type="submit" value="Submit"  name="sign" >
                    Sign in
                  </Button> 
                  <div className="text-danger">{this.state.errors.sign}</div> <br/> 
                 
                 
                </div>
               

              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
                  <NavLink
                    className="text-light"
                    to="/auth/register"
                    tag={Link}
                  >
                  <small>Create new account</small>
             
                  </NavLink>
            </Col>
          </Row>
   
        </Col>
     
    
        </div>
</div>

    );
  }
}


export default Login;