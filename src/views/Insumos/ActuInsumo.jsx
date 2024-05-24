import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuInsumo() {
  const cookies = new Cookies();
  const { id } = useParams();
  const [insu, setInsu]=useState({
    nombreInsumo:"",
    descripcion:"",
    stock: 1
  });
  const navigate = useNavigate();
  useEffect(()=>{
    const obtenerEstado = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Insumo/${id}`)
      if(response.ok){
        const data = await response.json()
        setInsu(data);
      }
    }
    obtenerEstado()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);
      const handleChange=e=>{
        const {name, value} = e.target;
        setInsu({...insu,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Insumo`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(insu)
          })
          if(response.ok){
              navigate("/insumo")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/insumo")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Insumos</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Nombre Insumo</Label>
                            <Input type="text" name="nombreInsumo"onChange={handleChange} value={insu.nombreInsumo} />
                            <Label>Descripción Insumo</Label>
                            <Input type="text" name="descripcion"onChange={handleChange} value={insu.descripcion} />
                            <Label>Stock</Label>
                            <Input type="text" name="stock"onChange={handleChange} value={insu.stock} />
                        
                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
  )
}

export default ActuInsumo