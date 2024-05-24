import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function Register() {
    
  
  const [register, setRgister]=useState({
    email:"",
    contrasena : "",
    idRolFK : 5
  });
  const navigate = useNavigate();

  const handleChange=e=>{
    const {name, value} = e.target;
    setRgister({...register,[name]: value});
    }
    const guardar = async() =>{
      const response = await fetch(`${appsettings.apiUrl}Usuario`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(register)
      })
      if(response.ok){
          navigate("/")
      }else{
          Swal.fire({
              title:"Error!",
              text:"No crear Usuario",
              icon:"warning"
          });
      }
  }
  const volver = () =>{
    navigate("/")
}
  return (
    <div>
    
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Registrarse</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" name="email"onChange={handleChange} value={register.email} />
                            <Label>Contraseña</Label>
                            <Input type="text" name="contrasena"onChange={handleChange} value={register.contrasena} />
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

export default Register