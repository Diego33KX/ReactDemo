import React, { Component }  from 'react';
import {BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap';
//Paginas
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

import Footer from './pages/Footer';
import Contenido from './pages/Contenido';
import { DataProvider } from "./Context/dataProvider";
import { Carrito } from './carrito/carrito';
import Detalles from './pages/Detalles';
import {Detallescate} from './pages/Detallescate';
import {DetallesProducto} from './pages/DetallesProducto';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import Prueba from './components/prueba';
import Historial from './pages/Historial';
import BotonCar from './carrito/boton';

class App extends Component  {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render(){
  return (
    <DataProvider>
      <Router>
        <Navbar/>
            <Routes>
                <Route exact path='/' element={<Homepage/>}/>               
                <Route exact path="/detalles" element={<Detalles/>}/>
                <Route exact path='/decategoria' element={<Detallescate/>}/>
                <Route exact path='/detallesProducto/:id' element={<DetallesProducto/>}/>
                <Route exact path='/home' element={<Home/>}/>
                <Route exact path='/login' element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path='/profile' element={<Profile/>}/>
                <Route exact path='/prueba' element={<Prueba/>}/>
                <Route path="/user" element={<BoardUser/>} />
                <Route path="/mod" element={<BoardModerator/>} />
                <Route path="/admin" element={<BoardAdmin/>} />
                <Route path='/historial' element={<Historial/>}/>
                <Route path='/pagar' element={<BotonCar/>}/>
            </Routes>
    </Router>
    </DataProvider>
  )
  }
}


export default App;
