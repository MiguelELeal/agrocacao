import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaTrabajadorR() {
    const go = useNavigate();
   const cookies = new Cookies();
   const [tr, setTr]=useState([]);
   const obtenerTr = async()=>{
    const response = await fetch(`${appsettings.apiUrl}TrabajadoresRequeridos`)
    if(response.ok){
      const data = await response.json()
      setTr(data);
    }
    
  }
  useEffect(()=>{
    obtenerTr()
      if(!cookies.get('id')){
          go('/')
      }
        },[]);

        const Eliminar = (id) =>{
          Swal.fire({
            title: "¿Esta seguro?",
            text: "Eliminar Trabajador Requerido",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}TrabajadoresRequeridos/${id}`, {method:"DELETE"});
                if (response.ok) {
                  await obtenerTr()
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
                    <h4>Lista de Trabajadores Requeridos</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Creartrar">Nuevo Trabajador Requerido</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Trabajador</th>
                            <th>Procedimiento</th>
                            

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          tr.map((item)=>(
                            <tr key={item.idTraRe}>
                              <td>{item.trabajadores.nombres} {item.trabajadores.apellidos}</td>
                              <td>ID: {item.procedimento.idProcedimiento} Descripción: {item.procedimento.descripcion}</td>
                              
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editartrar/${item.idTraRe}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idTraRe)}}>
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

export default ListaTrabajadorR