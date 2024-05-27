import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaSiembra() {
    const go = useNavigate();
    const cookies = new Cookies();
    const [sie, setSie]=useState([]);
    const obtenerSie = async()=>{
        const response = await fetch(`${appsettings.apiUrl}Siembra`)
        if(response.ok){
          const data = await response.json()
          setSie(data);
        }
      }
      useEffect(()=>{
        obtenerSie()
          if(!cookies.get('id')){
              go('/')
          }
            },[]);
    
            const Eliminar = (id) =>{
              Swal.fire({
                title: "¿Esta seguro?",
                text: "Eliminar Siembra",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar"
              }).then(async(result) => {
      
                if (result.isConfirmed) {
                  const response = await fetch(`${appsettings.apiUrl}Siembra/${id}`, {method:"DELETE"});
                    if (response.ok) {
                      await obtenerSie()
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
                    <h4>Lista de Siembras</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearsi">Nueva Siembra</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Fecha de Siembra</th>
                            <th>Area Total Sembrada</th>
                            <th>Terreno</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          sie.map((item)=>(
                            <tr key={item.idSiembra}>
                              <td>{item.fechaSiembra} </td>
                              <td>{item.areaTotalS}</td>
                              <td>{item.terreno.nombre}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarsi/${item.idSiembra}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idSiembra)}}>
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

export default ListaSiembra