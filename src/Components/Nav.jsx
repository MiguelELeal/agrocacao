import { Link,useNavigate } from "react-router-dom";
import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';


function Nav() {

    const go = useNavigate();
   const cookies = new Cookies();

   const cerrarSesion=()=>{
    cookies.remove('id', {path: '/'});
    cookies.remove('email', {path: '/'});
    cookies.remove('contrasena', {path: '/'});
    cookies.remove('rol', {path: '/'});
    go('/')
}

useEffect(()=>{
    if(!cookies.get('id')){
        go('/')
    }
      },[]);
  return (
    <nav class="navbar bg-dark navbar-expand-lg " data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">AgroCacao</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#nav" aria-controls="navbarNavSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
        <div className="collapse navbar-collapse" id='nav'>
          <ul className="navbar-nav mx-auto mb-2">
         
            <li className="nav-item px-lg-5 h4">
              <Link to='/logro' className="nav-link">Logros</Link>
            </li>
            <li className="nav-item px-lg-5 h4">
              <Link to='/trabajador' className="nav-link">Trabajadores</Link>
            </li>
            <li className="nav-item px-lg-5 h4">
              <Link to='/cultivo' className="nav-link">Cultivos</Link>
            </li>
            <li className="nav-item px-lg-5 h4">
              <Link to='/estado' className="nav-link">Estado Cultivo</Link>
            </li>
            <li className="nav-item px-lg-5 h4">
              <Link to='/insumo' className="nav-link">Insumos</Link>
            </li>
            <li className="nav-item px-lg-5 h4">
              <Link to='/insumoR' className="nav-link">Insumos Requeridos</Link>
            </li>
          </ul>
          <ul className="navbar-nav mx-auto mb-2">
          <li className="nav-item px-lg-5 h4">
              <button className="btn btn-info"onClick={()=>cerrarSesion()} >Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      
    </nav>
  )
}

export default Nav