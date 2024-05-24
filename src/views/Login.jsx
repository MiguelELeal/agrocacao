import React, {useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom";
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

function Login() {
const baseUrl="https://agrocacao.somee.com/api/Usuario";
const cookies = new Cookies();
const go = useNavigate();
const [form, setForm]=useState({
  username:'',
  password: ''
});
  const handleChange=e=>{
 const {name, value} = e.target;
 setForm({
   ...form,
   [name]: value
 });
  }
  const iniciarSesion=async()=>{
    await axios.get(baseUrl+`/${form.username}/${(form.password)}`)
    .then(response=>{
      return response.data;
    }).then(response=>{
      if(response.length > 0){
        var respuesta=response[0];
        cookies.set('id', respuesta.idUsuario, {path: '/'});
        cookies.set('email', respuesta.email, {path: '/'});
        cookies.set('contrasena', respuesta.contrasena, {path: '/'});
        cookies.set('rol', respuesta.idRolFK, {path: '/'});
        alert("Bienvenido: ");
        go('/home')
        
        
      }else{
        alert('El usuario o la contraseña no son correctos');
      }
    })
    
    .catch(error=>{
      console.log(error);
    })
  }

 useEffect(()=>{
if(cookies.get('id')){
  go('/home')
  
}
  },[]);
  return (
    <div className="containerPrincipal">
        <div className="containerLogin">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=>iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
        
          <div class="text-center">
            <p>¿No esta registrado? <a><Link to='/register'>Registrarse</Link></a></p>
            
          </div>
      </div>
  )
}

export default Login