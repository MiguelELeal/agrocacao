import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuPartida() {
    const cookies = new Cookies();
    const { id } = useParams();
  
    const [par, setPar]=useState({
      idUsuarioFK: 1,
      fechaInicio:"",
      ubicacion:"",
      nivel:""
  
    });
    const [usu, setUsu]=useState([]);
    const obtenerUsu = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Usuario`)
      if(response.ok){
        const data = await response.json()
        setUsu(data);
      }
    }
    const navigate = useNavigate();
  useEffect(()=>{
    const obtenerPartida = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Partida/${id}`)
      if(response.ok){
        const data = await response.json()
        setPar(data);
      }
    }
    obtenerPartida()
    obtenerUsu()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);

      const handleChange=e=>{
        const {name, value} = e.target;
        setPar({...par,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Partida`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(par)
          })
          if(response.ok){
              navigate("/partida")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/partida")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Partida</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            
                            <Label>Usuario</Label>
                            <select class="form-select" aria-label="Default select example" name="idUsuarioFK" onChange={handleChange} value={par.idUsuarioFK}>
                                {
                                    usu.map((item)=>(
                                        <option value={item.idUsuario}>{item.email}</option>
                                    ))
                                }
                            </select>
                            <Label>Fecha Inicio</Label>
                            <Input type="date" name="fechaInicio"onChange={handleChange} value={par.fechaInicio} />
                            <Label>Ubicacion</Label>
                            <Input type="text" name="ubicacion"onChange={handleChange} value={par.ubicacion} />
                            <Label>Nivel</Label>
                            <Input type="text" name="nivel"onChange={handleChange} value={par.nivel} />

                            
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default ActuPartida