import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function CrearSiembra() {
    const cookies = new Cookies();
    const [sie, setSie]=useState({
        fechaSiembra:"",
        areaTotalS: 1,
        idTerrenoFK: 1
    
      });
      const [te, setTe]=useState([]);
      const obtenerTe = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Terreno`)
        if(response.ok){
          const data = await response.json()
          setTe(data);
        }
      }
      const navigate = useNavigate();
      useEffect(()=>{
        obtenerTe()
        if(!cookies.get('id')){
          navigate('/')
        }
          },[]);
      const handleChange=e=>{
        const {name, value} = e.target;
        setSie({...sie,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}Siembra`,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(sie)
          })
          if(response.ok){
              navigate("/siembra")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/siembra")
    }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Siembra</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                        <Label>Fecha Siembra</Label>
                            <Input type="date" name="fechaSiembra"onChange={handleChange} value={sie.fechaSiembra} />
                            <Label>Area Total Sembrada</Label>
                            <Input type="number" name="areaTotalS"onChange={handleChange} value={sie.areaTotalS} />
                            
                            <Label>Terreno</Label>
                            <select class="form-select" aria-label="Default select example" name="idTerrenoFK" onChange={handleChange} value={sie.idTerrenoFK}>
                                {
                                    te.map((item)=>(
                                        <option value={item.idTerreno}>{item.nombre}</option>
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

export default CrearSiembra