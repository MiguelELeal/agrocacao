import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaInsumo() {
    const go = useNavigate();
    const cookies = new Cookies();
    const [insu, setInsu]=useState([]);
    const obtenerEstado = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Insumo`)
        if(response.ok){
          const data = await response.json()
          setInsu(data);
        }
      }
      useEffect(()=>{
        obtenerEstado()
          if(!cookies.get('id')){
              go('/')
          }
            },[]);
        const Eliminar = (id) =>{
                Swal.fire({
                  title: "¿Esta seguro?",
                  text: "Eliminar Insumo",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, eliminar"
                }).then(async(result) => {
        
                  if (result.isConfirmed) {
                    const response = await fetch(`${appsettings.apiUrl}Insumo/${id}`, {method:"DELETE"});
                      if (response.ok) {
                        await obtenerEstado()
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
                    <h4>Lista de Insumos</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearin">Nuevo Insumo</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Nombre Insumo</th>
                            <th>Descripcion</th>
                            <th>Stock</th>
                            <th></th>
                            
                        </tr>
                      </thead>
                      <tbody>
                        {
                          insu.map((item)=>(
                            <tr key={item.idInsumo}>
                              <td>{item.nombreInsumo}</td>
                              <td>{item.descripcion}</td>
                              <td>{item.stock}</td>

                              <td>
                                <Link className="btn btn-primary me-2" to={`/Editarin/${item.idInsumo}`}><i className="fa-solid fa-edit"></i></Link>
                                <Button color="danger" onClick={()=> {Eliminar(item.idInsumo)}}>
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

export default ListaInsumo