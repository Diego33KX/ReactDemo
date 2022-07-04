import React,{useState,useEffect} from "react";
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
const Prueba =() =>{
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
    })

    if (state.redirect) {
        return <Navigate to={state.redirect} />
      }
    const { currentUser } = state;

    return(
        <div>
             <div className="container">
                {(state.userReady) ?
                    <div>
                        <header className="jumbotron">
                    <h2>
                        Hola <strong>{currentUser.username}</strong>
                    </h2>
                    <h3>Roles:</h3>
                    <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    </header>
                </div>: null}
            </div>
        </div>
        
    )
}
export default Prueba