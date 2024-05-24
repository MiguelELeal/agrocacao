import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

function CrearInsumoR() {
    const cookies = new Cookies();
  
    const [inr, setInr]=useState({
      idInsumoFK: 1,
      idProcedimientoFK: 1,
      cantidad: 1,

  
    });
    const [insu, setInsu]=useState([]);
    const obtenerInsu = async()=>{
      const response = await fetch(`${appsettings.apiUrl}Insumo`)
      if(response.ok){
        const data = await response.json()
        setInsu(data);
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
    obtenerInsu()
    obtenerPro()
    if(!cookies.get('id')){
      navigate('/')
    }
      },[]);
  const handleChange=e=>{
    const {name, value} = e.target;
    setInr({...inr,[name]: value});
    }
    const guardar = async() =>{
      const response = await fetch(`${appsettings.apiUrl}InsumoRequerido`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(inr)
      })
      if(response.ok){
          navigate("/insumoR")
      }else{
          Swal.fire({
              title:"Error!",
              text:"No se pudo guardar el logro",
              icon:"warning"
          });
      }
  }
  const volver = () =>{
    navigate("/insumoR")
}
  return (
    <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Insumos Requeridos</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            
                            <Label>Insumo</Label>
                            <select class="form-select" aria-label="Default select example" name="idInsumoFK" onChange={handleChange} value={inr.idInsumoFK}>
                                {
                                    insu.map((item)=>(
                                        <option value={item.idInsumo}>{item.nombreInsumo}</option>
                                    ))
                                }
                            </select>
                            <Label>Procedimiento</Label>
                            <select class="form-select" aria-label="Default select example" name="idProcedimientoFK" onChange={handleChange} value={inr.idProcedimientoFK}>
                                {
                                    pro.map((item)=>(
                                        <option value={item.idProcedimiento}>ID: {item.idProcedimiento}- Descripcion: {item.descripcion}</option>
                                    ))
                                }
                            </select>
                            <Label>Cantidad</Label>
                            <Input type="number" name="cantidad"onChange={handleChange} value={inr.cantidad} />
                            

                        </FormGroup>
                    </Form>
                    <Button color="primary"className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
    </Container>
  )
}

export default CrearInsumoR