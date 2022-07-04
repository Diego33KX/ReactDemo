import { DataContext } from "../Context/dataProvider";
import React, { useContext,useEffect,useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const BotonCar = ()=>{
    const value = useContext(DataContext);

    const [menu,setMenu] = value.menu;
    const [carrito] = value.carrito;
    
    const toogleMenu = () =>{
      setMenu(!menu)
    }
    return(
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    )
}
export default BotonCar