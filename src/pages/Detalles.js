import React,{ useState, useEffect, createContext, useContext} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataContext } from "../Context/dataProvider";
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loader from '../components/Loader';
const Detalles=()=>{
    const value = useContext(DataContext);
    const [loading] = value.loading
    //PRODUCTOS FILTRADOS POR PAIS (usa map)
    const [productpais] = value.productpais;
    //DETALLES DE CADA PAIS, COMO IMAGEN Y NOMBRE (no usa map)
    const [detallespais] = value.detallespais;
    const addCarrito = value.addCarrito;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    return(
        <>
        <div className="carousel slide">
                <div className="carousel-inner">
                <img src={detallespais.img} className="d-block w-100"></img>
                </div>
        </div>
        <section className='py-5 text-center'>
            <h3>{detallespais.nombre}</h3>
        </section>
        
        <div className='p-2'>

            {/*  */}
            {loading ? (
            <Loader></Loader>
            ) : (
            <Row>
                {
                    productpais.map(i => (
                            
                        <Col  key={i.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                            
                            <Card className='border my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white rounded' style={{ border: 'none' }}>
                                
                                    {/* FOTO DE PAGINAS */}  
                                    <Card.Img style={{ width: '24rem', textAlign: 'center' }} class="d-block w-100" src={i.img_delante} variant='top' />
                                    <Card.Body className={`rounded text-dark`}>
                                        <Link to="/#" className='link-name'>
                                            <Card.Title as='div' class="text-dark"><strong>#{i.id} {i.nombre}</strong></Card.Title>
                                        </Link>
                                        <Card.Text><strong>{i.precio}</strong></Card.Text>
                                        {/* BOTON DE DIEGO */}

                                        <button class="btn btn-dark" onClick={handleClick}>
                                            <button class="btn btn-dark" onClick={() => addCarrito(i.id)} > 
                                                    Agregar al carrito  <i class="bi bi-cart-plus"></i>
                                     
                                            </button>
                                        </button>
                                        <div className='p-2'>
                                            <Link to={'/detallesProducto/'+i.id}><button  class="btn btn-day">Ver detalles</button></Link>
                                        </div>
                                        
                                        {/* --------------------------------------- ------------------------------------------------------------------------------*/}
                                </Card.Body>
                            </Card>         
                        </Col>
                    ))
                }
               
            </Row>
            )}
            {/* ALERTA AGREGAR PRODUCTO */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Producto Agregado con Exito !
                </Alert>
            </Snackbar>
        </div>
        <Footer/>
        </>
    )
}
export default Detalles;