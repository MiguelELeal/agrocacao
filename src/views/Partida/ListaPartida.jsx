import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaPartida() {
    const go = useNavigate();
    const cookies = new Cookies();
    const [par, setPar]=useState([]);
    const obtenerPartida = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Partida`)
        if(response.ok){
          const data = await response.json()
          setPar(data);
        }
      }
      useEffect(()=>{
        obtenerPartida()
          if(!cookies.get('id')){
              go('/')
          }
            },[]);
    
            const Eliminar = (id) =>{
              Swal.fire({
                title: "¿Esta seguro?",
                text: "Eliminar Partida",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar"
              }).then(async(result) => {
      
                if (result.isConfirmed) {
                  const response = await fetch(`${appsettings.apiUrl}Partida/${id}`, {method:"DELETE"});
                    if (response.ok) {
                      await obtenerPartida()
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
                    <h4>Lista de Partidas</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearpar">Nueva Partida</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Fecha de Inicio</th>
                            <th>Ubicaion</th>
                            <th>Nivel</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          par.map((item)=>(
                            <tr key={item.idPartida}>
                              <td>ID: {item.usuario.idUsuario} {item.usuario.email}</td>
                              <td>{item.fechaInicio}</td>
                              <td>{item.ubicacion}</td>
                              <td>{item.nivel}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarpar/${item.idPartida}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idPartida)}}>
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

export default ListaPartida