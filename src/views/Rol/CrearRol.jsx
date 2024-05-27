import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function CrearRol() {
    const cookies = new Cookies();
    const [rol, setRol]=useState({
        tipoRol:""
      });
      const navigate = useNavigate();
      useEffect(()=>{
        if(!cookies.get('id')){
          navigate('/')
        }
          },[]);
      const handleChange=e=>{
        const {name, value} = e.target;
        setRol({...rol,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Rol`,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(rol)
          })
          if(response.ok){
              navigate("/Rol")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/Rol")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Rol</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Nombre Rol</Label>
                            <Input type="text" name="tipoRol"onChange={handleChange} value={rol.tipoRol} />
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
  )
}

export default CrearRol