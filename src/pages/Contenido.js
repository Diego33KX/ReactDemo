import React, { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/estilosC.css';
import ReactPlayer from 'react-player';

const Contenido = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

    return (
      <div>
      <section className="hero_sec">
        <div className="hero_text">
          <p>
          <Typewriter
  options={{
    autoStart:true,
    loop:true,
    cursor: null,
  }}
  onInit={(typewriter) => {
    typewriter
    .typeString(`<span class="text-1">Sé tu verdadero yo</span>`)
    .pauseFor(2000)
    .deleteAll()
    .typeString(`<span class="text-2">Elige tu personaje</span>`)
    .pauseFor(2000)
    .deleteAll()
    .typeString(`<span class="text-3">Y sal con estilo.</span>`)
    .pauseFor(2000)
    .deleteAll()
    .start();
  }}
/>
</p>
          <h1>Descubre tu top ideal</h1>
        </div>
      </section>
      <section className="sec1">
          <div className="sec1_img_group">
            <div className="sec1_img_ sec1_img1">
              <img src="1.PNG" width="300" height="350"/>
            </div>

            <div className="sec1_img_ sec1_img2">
              <img src="2.PNG" alt=""/>
            </div>

            <div className="sec1_img_ sec1_img3">
              <img src="3.PNG" alt=""width="300" height="300"/>
            </div>
          </div>
        </section>


        <section className="sec2 luxy_el">
              <div className="sec_text">
                <h2>Tendencia</h2>
                <div className="sec_text_desc">
                  <div className="sec_text_desc_p">
                    <p>Sencilla, clásica y creada para marcar un hito. El look atemporal de esta camiseta de local oficial adidas Real Madrid se acentúa con detalles en morado claro y el escudo del club repetido en relieve sobre el tejido blanco. Esta versión está diseñada para rendir al máximo en la cancha gracias a la tecnología de ventilación HEAT.RDY.</p>
                    <p>Hecho con materiales 100% reciclados, este producto representa solo una de nuestras soluciones para acabar con los residuos plásticos.</p>
                  </div>
                </div>
              </div>
              <div className="sec_img">
                <ReactPlayer url='video1.mp4'
                loop
                muted
                controls
                />
              </div>
          </section>

          <section className="sec4 luxy_el">
            <h3>Running/ Fútbol/ Outdoor/ Training</h3>
            <div className="sec4_img_group">
              <div className="sec4_img1">
                <img src="9.PNG" width="400" height="500"/>
              </div>
              <div className="sec4_img2">
                <img src="7.PNG" width="400" height="450"/>
              </div>
              <div className="sec4_img3">
                <img src="8.PNG" width="400" height="500"/>
              </div>
            </div>
          </section>

          <section>
          <h6>Nuestros clientes</h6>
        <Slider {...settings}>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
          <div>
            <img src="P1.PNG" width="300" height="300"/>
          </div>
        </Slider>
      </section>

      </div>



    );
}

export default Contenido;