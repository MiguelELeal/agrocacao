import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function CrearLogroC() {
    const cookies = new Cookies();
    const navigate = useNavigate();
  
    const [logc, setLogc]=useState({
        idPartidaFK: 1,
        idLogroFK: 1,
        fechaLogro : ""
    });
    const [par, setPar]=useState([]);
    const obtenerPar = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Partida`)
      if(response.ok){
        const data = await response.json()
        setPar(data);
      }
    }
    const [logro, setLogro]=useState([]);

   const obtenerLogro = async()=>{
    const response = await fetch(`${appsettings.apiUrl}Logros`)
    if(response.ok){
      const data = await response.json()
      setLogro(data);
    }

  }
  useEffect(()=>{
    obtenerPar()
    obtenerLogro()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);

    
    const handleChange=e=>{
        const {name, value} = e.target;
        setLogc({...logc,[name]: value});
        }
        const guardar = async() =>{
          const response = await fetch(`${appsettings.apiUrl}LogroConseguido`,{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify(logc)
          })
          if(response.ok){
              navigate("/logroc")
          }else{
              Swal.fire({
                  title:"Error!",
                  text:"No se pudo guardar el logro",
                  icon:"warning"
              });
          }
      }
      const volver = () =>{
        navigate("/logroc")
    }
  return (

    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Logros Conseguidos</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            
                            <Label>Partida</Label>
                            <select class="form-select" aria-label="Default select example" name="idPartidaFK" onChange={handleChange} value={logc.idPartidaFK}>
                                {
                                    par.map((item)=>(
                                        <option value={item.idPartida}>ID Usuario: {item.idUsuarioFK} Fecha Inicio: {item.fechaInicio}</option>
                                    ))
                                }
                            </select>
                            <Label>Logro</Label>
                            <select class="form-select" aria-label="Default select example" name="idLogroFK" onChange={handleChange} value={logc.idLogroFK}>
                                {
                                    logro.map((item)=>(
                                        <option value={item.idLogro}> {item.nombreLogro}</option>
                                    ))
                                }
                            </select>
                            <Label>Fecha de Logro</Label>
                            <Input type="date" name="fechaLogro"onChange={handleChange} value={logc.fechaLogro} />
                            
                            

                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default CrearLogroC