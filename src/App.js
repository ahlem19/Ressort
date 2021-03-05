import React from 'react';
// npm install bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//npm install react-router-dom
import {BrowserRouter as Router ,Route} from "react-router-dom";

// import Navbarr from "./components/navbar.component";
// import ExercisesList from "./components/exercise-list.component";
// import EditExercise from "./components/edit-exercise.component";
// import CreateExercise from "./components/create-exercise.component";
// import CreateUser from "./components/create-user.component";
// import Home from  "./components/home.component";
// import Rooms from  "./components/rooms.component";
import Admin from  "./components/folderAdmin/admin.component";
import User from  "./components/folderUser/user.component";

function App() {
  return (
  
   <Router>
     <div className="container">
        {/* <Navbarr/>
        
        <br/> */}
        {/* <Route path="/" exact component={ExercisesList}/>
        <Route path="/edit/:id"  component={EditExercise}/>
        <Route path="/create"  component={CreateExercise}/>
        <Route path="/user"  component={CreateUser}/>
        <Route path="/home"  component={Home }/>
        <Route path="/rooms"  component={Rooms}/> */}
        <Route path="/user"  component={User}/>
        <Route path="/admin"  component={Admin}/>
     </div>
   </Router>
   
  );
}

export default App;
