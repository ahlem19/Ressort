import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// core components



//routes
import routes from "../../routes";


class User extends React.Component {

  
  getRoutes = routes => {
    return routes.map((prop, key) => {
    
      if(prop.layout === "/admin")  {
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

            <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/admin/login" />
            </Switch>
      
        </div>
    );
  }
}

export default User;
