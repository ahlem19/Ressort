import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components

import Navbar from "../folderUser/navbar.component";


//routes
import routes from "../../routes";


class User extends React.Component {

  
  getRoutes = routes => {
    return routes.map((prop, key) => {
    
      if(prop.layout === "/user")  {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
 
 

  render() {
  
    return (
        <div>

            <Navbar/>
          
            <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/user/home" />
            </Switch>
      
        </div>
    );
  }
}

export default User;
