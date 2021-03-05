import Home from  "../src/components/folderUser/home.component";
import Rooms from  "../src/components/folderUser/rooms.component";
import Login from  "../src/components/folderAdmin/login.component";
import InterfaceAdmin from  "../src/components/folderAdmin/InterfaceAdmin.component";
import EditCarousel from  "../src/components/folderAdmin/viewInterface Admin/home/edit";


var routes = [
 
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-key-25 text-info",
    component: Home,
    layout: "/user",
    display: true
  },
  {
    path: "/rooms",
    name: "Rooms",
    icon: "ni ni-key-25 text-info",
    component: Rooms,
    layout: "/user",
    display: true
  },
  {
    path: "/rooms",
    name: "Rooms",
    icon: "ni ni-key-25 text-info",
    component: Rooms,
    layout: "/admin",
    display: true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/admin",
    display: true
  },
  {
    path: "/interfaceAdmin",
    name: "InterfaceAdmin",
    icon: "ni ni-key-25 text-info",
    component:InterfaceAdmin ,
    layout: "/admin",
    display: true
  },
  {
    path: "/edit",
    name: "edit",
    icon: "ni ni-key-25 text-info",
    component:EditCarousel ,
    layout: "/admin",
    display: true
  },
];
export default routes;