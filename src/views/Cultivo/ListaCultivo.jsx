import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaCultivo() {
    const go = useNavigate();
   const cookies = new Cookies();
   const [Cul, setCul]=useState([]);
   const obtenerCul = async()=>{
    const response = await fetch(`${appsettings.apiUrl}Cultivo`)
    if(response.ok){
      const data = await response.json()
      setCul(data);
    }
  }
  useEffect(()=>{
    obtenerCul()
      if(!cookies.get('id')){
          go('/')
      }
        },[]);
    const Eliminar = (id) =>{
            Swal.fire({
              title: "¿Esta seguro?",
              text: "Eliminar Cultivo",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar"
            }).then(async(result) => {
    
              if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Cultivo/${id}`, {method:"DELETE"});
                  if (response.ok) {
                    await obtenerCul()
                  }
              }
            });
        }
  return (
    <div>
        <Nav/>
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Lista de Cultivo</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearcul">Nuevo Cultivo</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Siembra</th>
                            <th>Fecha de Cosecha Estimada</th>
                            <th>Estado Del Cultivo</th>
                            <th>Fecha de Modificacion</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Cul.map((item)=>(
                            <tr key={item.idTrabajador}>
                              <td>{item.siembra.fechaSiembra}</td>
                              <td>{item.fechaCosechaE}</td>
                              <td>{item.estadoCultivo.nombreEstado}</td>
                              <td>{item.fechaModificacion}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarcul/${item.idCultivo}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idCultivo)}}>
                              <i className="fa-solid fa-trash"></i>
                              </Button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default ListaCultivo