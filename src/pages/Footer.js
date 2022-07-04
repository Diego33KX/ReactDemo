import React from 'react';
import '../css/estilosF.css';
import { FaPaperPlane } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import {MdGpsFixed} from 'react-icons/md';

const Footer = () => {
    return (
      <div className="main">
    		<div className="content">

             <div className="content_left">
             	<div className="more_detail">
             		<h4>ContigoPE</h4>
             		<p>Ingrese su correo, para recibir notificaciones</p>

             		<div className="form">
             			<input type="email" placeholder="Enter Email"/>
             			<button><FaPaperPlane/></button>

             		</div>

             	</div>

             	<div className="more_detail_2">
             		<h4>Producto</h4>
             		<p><a>Polos</a></p>
             		<p><a>Short</a></p>
             		<p><a>Buzo</a></p>
             	</div>
             </div>

             <div className="content_right">
             	<div className="more_detail">
             		<h4>Paises</h4>
             		<p><a>Perú</a></p>
             		<p><a>Brasil</a></p>
             		<p><a>España</a></p>
             	</div>

             	<div className="more_detail_2">
             		<h4>Contáctanos</h4>
             		<p><BsTelephone/> +(01) 5568413</p>
             		<p><HiOutlineMail/> soporte@contigope.com.pe</p>
             		<p><MdGpsFixed/> Av. Camino Real 208, San Isidro 15073</p>
             	</div>
             </div>

    		</div>
    		<p id="line"></p>

    		<div className="bottom_content">

                <div className="terms_services">
                	<p><a>Team Python</a></p>
                	<p><a>Policy Privacy</a></p>
                </div>



                <p id="copyright">@2022 TeamPython.com. All Rights Reserved.</p>

    		</div>

    	</div>

    );
}

export default Footer;
