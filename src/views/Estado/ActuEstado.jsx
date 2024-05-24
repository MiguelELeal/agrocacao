import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuEstado() {
  const cookies = new Cookies();
  const { id } = useParams();
  const [esta, setEsta]=useState({
    nombreEstado:""
});
const navigate = useNavigate();
  useEffect(()=>{
    const obtenerEstado = async()=>{
      const response = await fetch(`${appsettings.apiUrl}EstadoCultivo/${id}`)
      if(response.ok){
        const data = await response.json()
        setEsta(data);
      }
    }
    obtenerEstado()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);

      const handleChange=e=>{
        const {name, value} = e.target;
        setEsta({...esta,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}EstadoCultivo`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(esta)
          })
          if(response.ok){
              navigate("/estado")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/estado")
    }
  return (
    <div>
    
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Estado</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Nombre Estado</Label>
                            <Input type="text" name="nombreEstado"onChange={handleChange} value={esta.nombreEstado} />
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default ActuEstado