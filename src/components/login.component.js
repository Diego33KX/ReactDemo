import React, { Component, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo Obligatorio.
      </div>
    );
  }
};


const Login = () =>{
  let navigate = useNavigate();
  const [state,setState] = useState({
      username: "",
      password: "",
      loading: false,
      message: ""
  })
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };
  const handleLogin=(e)=> {
    
    e.preventDefault();

    setState({
      message: "",
      loading: true
    }); 
    AuthService.login(state.username, state.password).then(
      () => {
        //this.props.history.push('/profile');
        navigate('/')
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
          loading: false,
          message: resMessage
        });
      }
    );
    }

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
          <div class="col-md-8 col-lg-6">
            <div class="register d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h1 class="textLogo">ContigoPE</h1><br/>
                    <Form
                      onSubmit={handleLogin}
                      
                    >
                      <div className="form-floating mb-3">
                      <label htmlFor="floatingInput">Usuario</label>
                      <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={state.username}
                          onChange={handleChange}
                          validations={[required]}
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
                          validations={[required]}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                        <label class="form-check-label" htmlfor="rememberPasswordCheck">Recibir Notificaciones</label>
                      </div>
                      <div class="d-grid"><br/>
                        <button
                          className="btn btn-dark btn-block"
                          disabled={state.loading}
                        >
                          {state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Login</span>
                        </button><br/>
                      </div>
                      <div class="text-center">
                          <a class="small" href="/register">Aún no eres mienbro? Registrate</a>
                       </div>
                       {state.message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {state.message}
                          </div>
                        </div>
                      )}
                      <CheckButton
                        
                      />
                                              <br/><br/>
                                  <div class="iconosRedes mb-6">
                                      <a href="#"><FiFacebook/></a>
                                      <a href="#"><FiTwitter/></a>
                                      <a href="#"><FiInstagram/></a>
                                  </div>
                                  <br/><br/><br/><br/>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );

}
export default Login