import { createHashHistory } from "history";
import React,{useContext,useState} from "react";
import { DataContext } from "../Context/dataProvider";

const Historial = () =>{
    const value = useContext(DataContext);
    const [historial] = value.historial;
    return(
        <div className="container py-5">
            <table className="table">
                <thead className="table-info">
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>IGV</th>
                    <th>Total</th>
                </thead>
                
                    {
                        historial.map(his=>(
                            <tbody>
                                <td>{his.producto}</td>
                                <td>{his.precio}</td>
                                <td>{his.cantidad}</td>
                                <td>{his.subtotal}</td>
                                <td>{his.igv}</td>
                                <td>{his.total}</td>
                        </tbody>
                    ))
                    }
                
            </table>
        </div>
    )
}
export default Historial