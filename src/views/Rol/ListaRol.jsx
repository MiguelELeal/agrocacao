import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";


function ListaRol() {
    const go = useNavigate();
    const cookies = new Cookies();
    const [rol, setRol]=useState([]);
    const obtenerRol = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Rol`)
        if(response.ok){
          const data = await response.json()
          setRol(data);
        }
      }
      useEffect(()=>{
        obtenerRol()
          if(!cookies.get('id')){
              go('/')
          }
            },[]);
  
        const Eliminar = (id) =>{
          Swal.fire({
            title: "¿Esta seguro?",
            text: "Eliminar Rol",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}Rol/${id}`, {method:"DELETE"});
                if (response.ok) {
                  await obtenerRol()
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
                    <h4>Lista de Roles</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/CrearRol">Nuevo Rol</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Nombre Logro</th>
                            <th></th>
                            
                        </tr>
                      </thead>
                      <tbody>
                        {
                          rol.map((item)=>(
                            <tr key={item.idRol}>
                              <td>{item.tipoRol}</td>
                              <td>
                                <Link className="btn btn-primary me-2" to={`/EditarRol/${item.idRol}`}><i className="fa-solid fa-edit"></i></Link>
                                <Button color="danger" onClick={()=> {Eliminar(item.idRol)}}>
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

export default ListaRol