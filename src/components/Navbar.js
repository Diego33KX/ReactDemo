import React, { useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

import { Carrito } from '../carrito/carrito';
import { DataContext } from '../Context/dataProvider';
import AuthService from "../services/auth.service";
import { Navigate,useNavigate } from "react-router-dom";
import {AiOutlineClose,AiOutlineMenu} from "react-icons/ai";
import '../css/estilosN.css'



const Navbar = () => {
    let navigate = useNavigate();
    const value = useContext(DataContext);
    const [categorias] = value.categorias;
    const [paises] = value.paises;
    const [menu,setMenu] = value.menu;
    const [carrito] = value.carrito;
    const filtroPais = value.filtroPais;
    const filtroCategorias = value.filtroCategorias;
    const detallCategoria = value.detallCategoria
    const detallPais = value.detallPais;
    const getHistorial = value.getHistorial;

    console.log(categorias)
    const toogleMenu = () =>{
      setMenu(!menu)
    }
    const [state,setState]=useState({
      redirect:null,
      userReady:false,
      currentUser:{
          username:''
      }
  })

  useEffect(()=>{
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) setState({ redirect: "/home" });
      setState({ currentUser: currentUser, userReady: true })
  },[])
  
  const salir = ()=>{
    AuthService.logout().then(
      () => {
        //this.props.history.push('/profile');
        navigate('/')
        window.location.reload();
      }
    )
  }

  if (state.redirect) {
      return <Navigate to={state.redirect} />
    }
  const { currentUser } = state;
  
    return (
      <div>
        <Carrito></Carrito>
      <nav>
      
        <div className="wrapper">
        
          <div className="logo"><a href=""><img src="Captura.PNG" width="90" height="60"/></a></div>
          <input type="radio" name="slider" id="menu-btn"/>
          <input type="radio" name="slider" id="close-btn"/>
          <ul className="nav-links">
            <label for="close-btn" class="btn close-btn"><AiOutlineClose/></label>
            <li><Link to="/">PRODUCTOS</Link></li>
            <li>
              <a href="#" className="desktop-item">CATEGORIAS</a>
              <input type="checkbox" id="showMega"/>
              <label for="showMega" class="mobile-item">CATEGORIAS</label>
              <div className="mega-box" style={{height:200}}>
                <div className="content">
                  <div className="row">
                    <img src="3.PNG" alt=""/>
                  </div>
                  <div className="row">
                    <header>Polos deportivos</header>
                    <ul className="mega-links">
                    {
                        categorias.map(cat => (
                          <li class="nav-item" key={cat.id}>
                            <Link to="/decategoria" onClick={()=>{filtroCategorias(cat.id);detallCategoria(cat.id)}}>{cat.nombre}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="row">
                    <header>Short</header>
                    <ul className="mega-links">
                      <li><a href="#">Color Negro</a></li>
                      <li><a href="#">Color rosado</a></li>
                      <li><a href="#">Color tricolor</a></li>
                      <li><a href="#">Color jade</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="#" className="desktop-item">PAISES</a>
              <input type="checkbox" id="showMega"/>
              <label for="showMega" class="mobile-item">PAISES</label>
              <div className="mega-box">
                <div class="content">
                  <div className="row">
                    <img src="2.PNG" alt=""/>
                  </div>
                  <div className="row">
                    <header>Países Clasificados</header>
                    
                    <ul className="mega-links">
                    {
                          
                          paises.map(pais =>(
                            <li className="nav-item" key={pais.id}>
                              <Link to='/detalles' onClick={()=>{filtroPais(pais.id);detallPais(pais.id)}}>{pais.nombre}</Link>
                            </li>
                          ))
                        }
                      
                    </ul>
                  </div>
                  <div className="row">
                    <header>Países Europeos</header>
                    <ul className="mega-links">
                      <li><a href="#">España</a></li>
                      <li><a href="#">Alemania</a></li>
                      <li><a href="#">Suecia</a></li>
                      <li><a href="#">Italia</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="#">CLIENTES</a></li>
            <li><a href="#">CONTACTANOS</a></li>
            
            {
                    (currentUser)?
                    <li><strong>{currentUser.username}</strong></li>
                    :<li></li>
                  }  
                  {
                    (currentUser)?
                    <li>
                    <Link to={"/historial"} onClick={()=>{getHistorial(currentUser.username)}} className="nav-link active">Historial</Link>
                  </li>:<li></li>
                  
              }
            <li>

            </li>{
              (!currentUser)?
              <Link to={`/register`}><i className="bi bi-person-lines-fill"> Registrar</i></Link>:
              null
            }
            
            <li>
            
                  {
                    (!currentUser)?
                    <Link  type="submit" to={'/login'}><i class="bi bi-person-circle"> Ingresar</i></Link>:
                    <Link   type="submit" to={'/'} onClick={salir}><i class="bi bi-person-circle">Salir</i></Link>
                    
                  }
            </li>

          </ul>
          
          <label for="menu-btn" class="btn menu-btn"><AiOutlineMenu/></label>
        </div>
        <button type="button" onClick={toogleMenu} data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="m-2 btn btn-outline-success position-relative">
                  <i class="bi bi-cart-plus"> Comprar</i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carrito.length}
                    <span class="visually-hidden">unread messages</span>
                  </span>
        </button>
      </nav>
      
      </div>
    );
  }
  
  export default Navbar;
