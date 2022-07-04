import React, { useContext, useEffect, useRef,useState } from "react"
import * as BiIcons from "react-icons/bi";
import { DataContext } from "../Context/dataProvider";
import ReactDOM from "react-dom"
import {Link, Navigate} from "react-router-dom"
import AuthService from "../services/auth.service";
import axios from "axios";
const url = 'http://localhost:8081/api/ventas/'
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//Importando usos :

export const Carrito = () => {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;
    const tooglefalse = () => {
        setMenu(false);
    };
    const show1 = menu ? "carritos show" : "carrito";
    const show2 = menu ? "carrito show" : "carrito";
    console.log(show1)
    const [state,setState]=useState({
        redirect:null,
        userReady:false,
        currentUser:{
            username:''
        }
    })
    useEffect(()=>{
        const currentUser = AuthService.getCurrentUser();
        if(!currentUser){
            setState({
                redirect:'/home'
            })
        }
        setState({
            currentUser: currentUser,
            userReady:true
        })
    },[])
    if (state.redirect) {
        return <Navigate to={state.redirect} />
      }
    const { currentUser } = state;

    const resta = id => {
        carrito.forEach(item => {
            if (item.id === id) {
                item.cantidad === 1 ? item.cantidad = 1 : item.cantidad -= 1;
            }
            setCarrito([...carrito])
        })
    }

    const suma = id => {
        carrito.forEach(item => {
            if (item.id === id) {
                item.cantidad += 1;
            }
            setCarrito([...carrito])
        })
    }


    const removeProducto = id => {
        if (window.confirm("Â¿Desea suspender el producto?")) {

            carrito.forEach((item, index) => {
                if (item.id === id) {
                    item.cantidad = 1;
                    carrito.splice(index, 1)
                }
            })
            setCarrito([...carrito])
        }

    }

    const createOrder=(data, actions)=> {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total,
              },
            },
          ],
        });
      }
    const guardarVenta = () => {
        try{
            carrito.forEach(item=>{               
                item.img_atras === null? item.img_atras = currentUser.username:item.img_atras = currentUser.username;
                setCarrito([...carrito])
            })
            axios.post(url,carrito);
            
        }catch(error){
            console.log(error)
        }
    }
    const  onApprove=(data, actions)=> {
        guardarVenta();
        alert("compra exitosa")
        window.location.href = "http://localhost:3000/"

        
        return actions.order.capture(console.log("PROCESO REALIZADO CON EXITO"));
    }
    
    
    return (
        /*  */

        <div class="modal modal-lg fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title logo-style" id="staticBackdropLabel">CARRITO DE COMPRAS</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {

                            carrito.length === 0 ?
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title">Sin Productos</h5>
                                        <img src="https://media.istockphoto.com/vectors/cartoon-face-sad-negative-people-emotion-icon-vector-id689366286?b=1&k=20&m=689366286&s=170667a&w=0&h=ujDUO7h9bdiqMSs0zqIxzFvwuiR9eLb4EEBK75-YxwE="></img>
                                    </div>
                                    <div class="card-footer text-muted">
                                        Actualizado Recientemente <i class="bi bi-arrow-clockwise"></i>
                                    </div>
                                </div>
                                : <>

                                    {

                                        carrito.map((producto) => (
                                            <>
                                                <div class="card mb-3">
                                                    <div class="row g-0 border">
                                                        <div class="col-md-2">
                                                            <img src={producto.img_delante} class="img-fluid rounded-start" alt="..." />
                                                        </div>
                                                        <div class="col-md-5">
                                                            <div class="card-body">
                                                                <h5 class="card-title">{producto.nombre}</h5>
                                                                <h6>s/.{producto.precio}</h6>
                                                                


                                                                <div class="row g-0 ">
                                                                    <div class="col-md-1 ">
                                                                        <div className="text-center">
                                                                            <button type="button" onClick={() => suma(producto.id)} class="btn btn-light btn-circle btn-sm">
                                                                                <strong><i class="bi bi-plus"></i></strong>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-2 ">
                                                                        <div className="text-center">
                                                                            <button type="button" class="btn btn-light" disabled>
                                                                                <strong>{producto.cantidad}</strong>
                                                                            </button>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-1 ">
                                                                        <div className="text-center">
                                                                            <button type="button" onClick={() => resta(producto.id)} class="btn btn-light btn-circle btn-sm">
                                                                                <i class="bi bi-dash"></i>
                                                                            </button>
                                                                        </div>   
                                                                    </div>
                                                                </div>



                                                            </div>
                                                        </div>
                                                        <div class="col-md-5 ">
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </>
                                        ))
                                    }
                                    {/* BOTON DE PAGAR */}
                                    
                                    <div className="container">
                                        <div className="row">
                                            <div class="col-md-4">
                                                <h4>Total: s/. {total}</h4>
                                            </div>
                                            <div class="col-md-4"></div>
                                        
                                            
                                                {
                                                   (!currentUser)?
                                                   <div class="col-md-4 text-center">
                                                   <Link to="/login"><button type="button"className="btn btn-danger">INICIAR SESION <i class="bi bi-arrow-right-square"></i></button> </Link></div>:
                                                    <div className="container">
                                                    <div className="text-center">
                                                        <PayPalButton
                                                            createOrder={(data, actions) => createOrder(data, actions)}
                                                            onApprove={(data, actions) => onApprove(data, actions)}
                                                            
                                                        />  
                                                    </div>

                                                    
                                            </div>
                                                }
                                            
                                            </div>

                                        
                                        
                                    </div>
                                    <th></th><br></br>

                                    
                                </>

                        }

                    </div>
                    <div>
                    
                    </div>

                </div>
            </div>
        <div>

        </div>


        </div>



    )
}
