import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './views/Login'
import Home from './views/Home';
import ListaLogro from './views/Logro/ListaLogro';
import CrearLogro from './views/Logro/CrearLogro';
import ActuLogro from './views/Logro/ActuLogro';
import Register from './views/Register';
import CrearTrabajador from './views/Trabajador/CrearTrabajador';
import ActuTrabajador from './views/Trabajador/ActuTrabajador';
import ListaTrabajador from './views/Trabajador/ListaTrabajador';
import CrearCultivo from './views/Cultivo/CrearCultivo';
import ActuCultivo from './views/Cultivo/ActuCultivo';
import ListaCultivo from './views/Cultivo/ListaCultivo';
import CrearEstado from './views/Estado/CrearEstado';
import ActuEstado from './views/Estado/ActuEstado';
import ListaEstado from './views/Estado/ListaEstado';
import CrearInsumo from './views/Insumos/CrearInsumo';
import ActuInsumo from './views/Insumos/ActuInsumo';
import ListaInsumo from './views/Insumos/ListaInsumo';
import CrearInsumoR from './views/InsumoRequerido/CrearInsumoR';
import ActuInsumoR from './views/InsumoRequerido/ActuInsumoR';
import ListaInsumoR from './views/InsumoRequerido/ListaInsumoR';


function App() {

  return (

  
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/logro" element={<ListaLogro/>}/>
      <Route path="/Crearlogro" element={<CrearLogro/>}/>
      <Route path="/Editarlogro/:id" element={<ActuLogro/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/Creartra" element={<CrearTrabajador/>}/>
      <Route path="/Editartra/:id" element={<ActuTrabajador/>}/>
      <Route path="/trabajador" element={<ListaTrabajador/>}/>
      <Route path="/Crearcul" element={<CrearCultivo/>}/>
      <Route path="/Editarcul/:id" element={<ActuCultivo/>}/>
      <Route path="/cultivo" element={<ListaCultivo/>}/>
      <Route path="/Creares" element={<CrearEstado/>}/>
      <Route path="/Editares/:id" element={<ActuEstado/>}/>
      <Route path="/estado" element={<ListaEstado/>}/>
      <Route path="/Crearin" element={<CrearInsumo/>}/>
      <Route path="/Editarin/:id" element={<ActuInsumo/>}/>
      <Route path="/insumo" element={<ListaInsumo/>}/>
      <Route path="/Crearinr" element={<CrearInsumoR/>}/>
      <Route path="/Editarinr/:id" element={<ActuInsumoR/>}/>
      <Route path="/insumoR" element={<ListaInsumoR/>}/>



    </Routes>
  </BrowserRouter>
  )
}

export default App
