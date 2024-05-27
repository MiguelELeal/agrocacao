import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function ActuTrabajadroR() {
    const cookies = new Cookies();
    const { id } = useParams();
    const [tr, setTr]=useState({
        idTrabjadorFK: 1,
        idProcedimientoFK: 1
      });
      const [tra, setTra]=useState([]);
      const obtenerTra = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Trabajadores`)
        if(response.ok){
          const data = await response.json()
          setTra(data);
        }
      }
      const [pro, setPro]=useState([]);
      const obtenerPro = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Procedimiento`)
        if(response.ok){
          const data = await response.json()
          setPro(data);
        }
      }
      const navigate = useNavigate();
      useEffect(()=>{
        const obtenerTr = async()=>{
          const response = await fetch(`${appsettings.apiUrl}TrabajadoresRequeridos/${id}`)
          if(response.ok){
            const data = await response.json()
            setTr(data);
          }
        }
        obtenerTr()
        obtenerTra()
        obtenerPro()
        if(!cookies.get('id')){
          navigate('/')
        }
          },[]);
          const handleChange=e=>{
            const {name, value} = e.target;
            setTr({...tr,[name]: value});
            }
            const guardar = async() =>{
              const response = await fetch(`${appsettings.apiUrl}TrabajadoresRequeridos`,{
                  method:'PUT',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify(tr)
              })
              if(response.ok){
                  navigate("/trabajadorR")
              }else{
                  Swal.fire({
                      title:"Error!",
                      text:"No se pudo guardar el logro",
                      icon:"warning"
                  });
              }
          }
          const volver = () =>{
            navigate("/trabajadorR")
        }
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Trabajadores Requeridos</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            
                            <Label>Trbajador</Label>
                            <select class="form-select" aria-label="Default select example" name="idTrabjadorFK" onChange={handleChange} value={tr.idTrabjadorFK}>
                                {
                                    tra.map((item)=>(
                                        <option value={item.idTrabajador}>{item.nombres} {item.apellidos}</option>
                                    ))
                                }
                            </select>
                            <Label>Procedimiento</Label>
                            <select class="form-select" aria-label="Default select example" name="idProcedimientoFK" onChange={handleChange} value={tr.idProcedimientoFK}>
                                {
                                    pro.map((item)=>(
                                        <option value={item.idProcedimiento}>ID: {item.idProcedimiento}- Descripcion: {item.descripcion}</option>
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

export default ActuTrabajadroR