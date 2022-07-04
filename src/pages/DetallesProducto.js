import React,{ useState, useEffect, createContext, useContext} from "react";
import { DataContext } from "../Context/dataProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/estilosT.css'
import { useBootstrapPrefix } from "react-bootstrap/esm/ThemeProvider";



export const DetallesProducto =()=>{
    const value = useContext(DataContext);
    const addCarrito = value.addCarrito
    const [detallesproductos,setDetallesproductos] = useState({
        id:'',
        nombre:'',
        categoria_id:'',
        pais_id:'',
        precio:'',
        stock:'',
        marca:'',
        talla:'',
        genero:'',
        img_delante:'',
        img_atras:'',
        cantidad:'',
        descripcion:'',
        pub_date:''
      })
    //PRODUCTO POR ID
    const {id} = useParams();
    
    useEffect(()=>{
        getDetallesProductos();
    },[detallesproductos])
    const getDetallesProductos=()=>{
        axios.get('http://localhost:8081/api/products/'+id+'/').then(response =>{
          const detProd = response.data
          setDetallesproductos(detProd)
        })
      }

      return(
      
        <div class="container ">
        <div class="col-md-9 col-sm-7">
          <div class="product-page">
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <div class="product-main-image">
                  <img src={detallesproductos.img_delante} />
                </div>

              </div>
              <div class="col-md-6 col-sm-6">
                <h1>{detallesproductos.nombre}</h1>
                <div class="price-availability-block clearfix">
                  <div class="price">
                    <strong><span>S/</span>{detallesproductos.precio}.00</strong>
                  </div>
                  <div class="availability">
                    Disponible: <strong>En Stock</strong>
                  </div>
                </div>

                <div class="description">
                  <p>{detallesproductos.descripcion}</p>
                </div>
                <div class="product-page-options">
                  <div className="container">
                    <button className='btn btn-outline-dark btn-lg' onClick={() => addCarrito(detallesproductos.id)}>Agregar al carrito <i class="bi bi-arrow-right"></i></button>
                  </div>
              
                </div>
              </div>



              <div class="sticker sticker-sale"></div>
            </div>
          </div>
        </div>
      </div>
    )

}