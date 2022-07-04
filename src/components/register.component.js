import React,{ Component,useState, useEffect, createContext, useContext} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo Obligatorio
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Usuario invalido
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Debe ser mayor a 3 caracteres.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Debe ser mayor a 6 caracteres.
      </div>
    );
  }
};


const Register =()=>{
    let navigate = useNavigate();
    const [state, setState] = useState({
      email: "",
      password: "",
      username: "",
      successful: false,
      message: "",
      password2:""
    })
    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    };
    const vpassword2 = value => {
      if (state.password2!=state.password) {
        return (
          <div className="alert alert-danger" role="alert">
            Las constraseñas deben ser iguales
          </div>
        );
      }
    };
    
    const handleRegister=(e)=>{
      e.preventDefault();
      setState({
        message:"",
        successful: false
      });
      
      AuthService.register(
        state.email,
        state.username,
        state.password
      ).then(
        () => {          
          navigate('/login');
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }

    return (
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div class="col-md-8 col-lg-6">
              <div class="register d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-md-9 col-lg-8 mx-auto">
                      <h1 class="textLogo">ContigoPE</h1><br/>

          <form
            onSubmit={handleRegister}
          >
            {!state.successful && (
              <div>
                        <div className="form-floating mb-3">
                        <label htmlFor="floatingInput">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            validations={[required, email]}
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label htmlFor="floatingInput">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={state.username}
                                onChange={handleChange}
                                validations={[required, vusername]}
                              />
                        </div>
                        <div className="form-floating mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                            validations={[required, vpassword]}
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label htmlFor="password2">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password2"
                            value={state.password2}
                            onChange={handleChange}
                            validations={[required, vpassword2 ]}
                          />
                        </div>
                        <div className="form-check mb-3">
                          <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                          <label class="form-check-label" htmlfor="rememberPasswordCheck">Recibir Notificaciones</label>
                        </div>

                        <div class="d-grid"><br/>
                          <button className="btn btn-dark btn-block">Registrar</button><br/>
                        </div>
                        <div class="text-center">
                            <a class="small" href="/login">Aún no eres miembro? Registrate</a>
                         </div>
              </div>
            )}
             <br/>
              <div class="iconosRedes mb-3">
                <a href="#"><FiFacebook/></a>
                <a href="#"><FiTwitter/></a>
                <a href="#"><FiInstagram/></a>
              </div>
              <br/>
          </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}

export default Register