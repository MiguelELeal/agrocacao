import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuTrabajador() {
  const cookies = new Cookies();
  const [rol, setRol]=useState([]);
  const obtenerRol = async()=>{
    const response = await fetch(`${appsettings.apiUrl}Rol`)
    if(response.ok){
      const data = await response.json()
      setRol(data);
    }
  }
  const [tipod, setTipod]=useState([]);
  const obtenerTipod = async()=>{
    const response = await fetch(`${appsettings.apiUrl}TipoDocumento`)
    if(response.ok){
      const data = await response.json()
      setTipod(data);
    }
  }
  const { id } = useParams();
  const [traba, setTraba]=useState({
    numDoc:"",
    nombres:"",
    apellidos:"",
    idRolFK: 1,
    idTipoDocFK: 1

  });
  const navigate = useNavigate();
  useEffect(()=>{
    const obtenerTraba = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Trabajadores/${id}`)
      if(response.ok){
        const data = await response.json()
        setTraba(data);
      }
    }
    obtenerTraba()
    obtenerRol()
    obtenerTipod()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);
      const handleChange=e=>{
        const {name, value} = e.target;
        setTraba({...traba,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Trabajadores`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(traba)
          })
          if(response.ok){
              navigate("/trabajador")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/trabajador")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Trabajador</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Numero de Documento</Label>
                            <Input type="number" name="numDoc"onChange={handleChange} value={traba.numDoc} />
                            <Label>Tipo de Documento</Label>
                            <select class="form-select" aria-label="Default select example" name="idTipoDocFK" onChange={handleChange} value={traba.idTipoDocFK}>
                                {
                                    tipod.map((item)=>(
                                        <option value={item.idTipoDoc}>{item.tipoDo}</option>
                                    ))
                                }
                            </select>
                            <Label>Nombres</Label>
                            <Input type="text" name="nombres"onChange={handleChange} value={traba.nombres} />
                            <Label>Apellidos</Label>
                            <Input type="text" name="apellidos"onChange={handleChange} value={traba.apellidos} />

                            <Label>Rol</Label>
                            <select class="form-select" aria-label="Default select example" name="idRolFK" onChange={handleChange} value={traba.idRolFK}>
                                {
                                    rol.map((item)=>(
                                        <option value={item.idRol}>{item.tipoRol}</option>
                                    ))
                                }
                            </select>
                            
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default ActuTrabajador