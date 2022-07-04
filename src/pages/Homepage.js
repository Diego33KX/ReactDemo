import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { DataContext } from '../Context/dataProvider';
import { Container } from 'react-bootstrap';
import Contenido from '../pages/Contenido';
import Footer from './Footer';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Homepage = () => {
    const value = useContext(DataContext);
    const [loading] = value.loading
    const [productos] = value.productos
    const addCarrito = value.addCarrito;
    const getDetallesProductos = value.getDetallesProductos

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
    
    //Alertas Para agregar

    return (
        <>
        <Contenido/>
        <section className='py-5 text-center'>
            <h3>NUESTROS PRODUCTOS</h3>
        </section>
        
        <div className='p-2'>

            {/*  */}
            {loading ? (
            <Loader></Loader>
            ) : (
            <Row>
                {
                    productos.map(i => (
                            
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
    );
}

export default Homepage;