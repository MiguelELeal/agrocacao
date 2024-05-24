import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import Nav from '../Components/Nav';

function Home() {
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
    
    <div>
      <Nav/>
        <h5>ID: {cookies.get('id')}</h5>
    </div>
  )
}

export default Home