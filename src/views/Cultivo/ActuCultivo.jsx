import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuCultivo() {
    const cookies = new Cookies();
    const { id } = useParams();
    const navigate = useNavigate();
    const [cul, setCul]=useState({
        idSiembraFK: 1,
        fechaCosechaE:"",
        idEstadoFK: 1,
        fechaModificacion:""
    
      });
    const [siembra, setSiembra]=useState([]);
    const obtenerSiembra = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Siembra`)
        if(response.ok){
        const data = await response.json()
        setSiembra(data);
        }
    }
    const [estado, setEstado]=useState([]);
    const obtenerEstado = async()=>{
        const response = await fetch(`${appsettings.apiUrl}EstadoCultivo`)
        if(response.ok){
        const data = await response.json()
        setEstado(data);
        }
    }
    useEffect(()=>{
        const obtenerCul = async()=>{
          const response = await fetch(`${appsettings.apiUrl}Cultivo/${id}`)
          if(response.ok){
            const data = await response.json()
            setCul(data);
          }
        }
        obtenerCul()
        obtenerSiembra()
        obtenerEstado()
        if(!cookies.get('id')){
          navigate('/')
        }
          },[]);

          const handleChange=e=>{
            const {name, value} = e.target;
            setCul({...cul,[name]: value});
            
            }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Cultivo`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(cul)
          })
          if(response.ok){
              navigate("/cultivo")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/cultivo")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Cultivo</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Siembra</Label>
                            
                            <select class="form-select" aria-label="Default select example" name="idSiembraFK" onChange={handleChange} value={cul.idSiembraFK}>
                                {
                                    siembra.map((item)=>(
                                        <option value={item.idSiembra}>{item.terreno}Fecha : {item.fechaSiembra}</option>
                                    ))
                                }
                            </select>
                            <Label>Fecha de cosecha Estimada</Label>
                            <Input type="date" name="fechaCosechaE"onChange={handleChange} value={cul.fechaCosechaE} />
                            <Label>Estado del Cultivo</Label>
                            
                            <select class="form-select" aria-label="Default select example" name="idEstadoFK" onChange={handleChange} value={cul.idEstadoFK}>
                                {
                                    estado.map((item)=>(
                                        <option value={item.idEstado}>{item.nombreEstado}</option>
                                    ))
                                }
                            </select>
                            <Label>Fecha de Modificacion</Label>
                            <Input type="date" name="fechaModificacion"onChange={handleChange} value={cul.fechaModificacion} />

                            
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default ActuCultivo