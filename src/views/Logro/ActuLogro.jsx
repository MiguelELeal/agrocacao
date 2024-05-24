import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";


function ActuLogro() {
  const cookies = new Cookies();
  const { id } = useParams();
  const [logro, setLogro]=useState({
    nombreLogro:""
  });
  const navigate = useNavigate();
  useEffect(()=>{
    const obtenerLogro = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Logros/${id}`)
      if(response.ok){
        const data = await response.json()
        setLogro(data);
      }
    }
    obtenerLogro()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);

      const handleChange=e=>{
        const {name, value} = e.target;
        setLogro({...logro,[name]: value});
        }

        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Logros`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(logro)
          })
          if(response.ok){
              navigate("/logro")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo editar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/logro")
    }

  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Editar Logro</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Logro  Conseguido</Label>
                            <Input type="text" name="nombreLogro"onChange={handleChange} value={logro.nombreLogro} />
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
  )
}

export default ActuLogro