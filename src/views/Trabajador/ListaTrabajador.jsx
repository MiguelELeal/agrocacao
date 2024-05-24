import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaTrabajador() {
  const go = useNavigate();
   const cookies = new Cookies();
   const [Traba, setTraba]=useState([]);

   const obtenerTraba = async()=>{

    const response = await fetch(`${appsettings.apiUrl}Trabajadores`)
    if(response.ok){
      const data = await response.json()
      setTraba(data);
    }

  }
  useEffect(()=>{
    obtenerTraba()
      if(!cookies.get('id')){
          go('/')
      }
        },[]);

        const Eliminar = (id) =>{
          Swal.fire({
            title: "¿Esta seguro?",
            text: "Eliminar Trabajador",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}Trabajadores/${id}`, {method:"DELETE"});
                if (response.ok) {
                  await obtenerTraba()
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
                    <h4>Lista de Trabajadores</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Creartra">Nuevo Trabajador</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Numero de Documento</th>
                            <th>Tipo de Documento</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Rol</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Traba.map((item)=>(
                            <tr key={item.idTrabajador}>
                              <td>{item.numDoc}</td>
                              <td>{item.tipoDocumento.tipoDo}</td>
                              <td>{item.nombres}</td>
                              <td>{item.apellidos}</td>
                              <td>{item.rol.tipoRol}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editartra/${item.idTrabajador}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idTrabajador)}}>
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

export default ListaTrabajador