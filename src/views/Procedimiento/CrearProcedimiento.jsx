import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function CrearProcedimiento() {
    const cookies = new Cookies();
  
    const [pro, setPro]=useState({
      idCultivoFK: 1,
      idTipoProcedimientoFK:1,
      fechaProcedimiento:"",
      descripcion:"",
  
    });
    const [Cul, setCul]=useState([]);
   const obtenerCul = async()=>{
    const response = await fetch(`${appsettings.apiUrl}Cultivo`)
    if(response.ok){
      const data = await response.json()
      setCul(data);
    }
  }
    const [tipod, setTipod]=useState([]);
    const obtenerTipod = async()=>{
      const response = await fetch(`${appsettings.apiUrl}TipoProcedimiento`)
      if(response.ok){
        const data = await response.json()
        setTipod(data);
      }
    }
    const navigate = useNavigate();
    useEffect(()=>{
        obtenerCul()
       obtenerTipod()
      if(!cookies.get('id')){
        navigate('/')
      }
        },[]);
    const handleChange=e=>{
      const {name, value} = e.target;
      setPro({...pro,[name]: value});
      }
      const guardar = async() =>{
        const response = await fetch(`${appsettings.apiUrl}Procedimiento`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pro)
        })
        if(response.ok){
            navigate("/procedimiento")
        }else{
            Swal.fire({
                title:"Error!",
                text:"No se pudo guardar el Procedimiento",
                icon:"warning"
            });
        }
    }
    const volver = () =>{
      navigate("/procedimiento")
  }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Trabajador</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                        <Label>Cultivo</Label>
                            <select class="form-select" aria-label="Default select example" name="idCultivoFK" onChange={handleChange} value={pro.idCultivoFK}>
                                {
                                    Cul.map((item)=>(
                                        <option value={item.idCultivo}>ID: {item.idCultivo}</option>
                                    ))
                                }
                            </select>
                            
                            <Label>Tipo de Procedimiento</Label>
                            <select class="form-select" aria-label="Default select example" name="idTipoProcedimientoFK" onChange={handleChange} value={pro.idTipoProcedimientoFK}>
                                {
                                    tipod.map((item)=>(
                                        <option value={item.idTipoPro}>{item.nombre}</option>
                                    ))
                                }
                            </select>
                            <Label>Fecha de Procedimiento</Label>
                            <Input type="date" name="fechaProcedimiento"onChange={handleChange} value={pro.fechaProcedimiento} />
                            <Label>Descripción</Label>
                            <Input type="text" name="descripcion"onChange={handleChange} value={pro.descripcion} />

                            
                            
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default CrearProcedimiento