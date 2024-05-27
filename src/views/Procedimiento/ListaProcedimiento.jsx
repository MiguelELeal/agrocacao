import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaProcedimiento() {
  const go = useNavigate();
   const cookies = new Cookies();
   const [pro, setPro]=useState([]);
   const obtenerPro = async()=>{
    const response = await fetch(`${appsettings.apiUrl}Procedimiento`)
    if(response.ok){
        const data = await response.json()
        setPro(data);
    }
    }
    useEffect(()=>{
      obtenerPro()
        if(!cookies.get('id')){
            go('/')
        }
          },[]);
  
          const Eliminar = (id) =>{
            Swal.fire({
              title: "¿Esta seguro?",
              text: "Eliminar Procedimiento",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar"
            }).then(async(result) => {
    
              if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Procedimiento/${id}`, {method:"DELETE"});
                  if (response.ok) {
                    await obtenerPro()
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
                    <h4>Lista de Procedimientos</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearpro">Nuevo Procedimiento</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Cultivo</th>
                            <th>Tipo de Procedimiento</th>
                            <th>Fecha Procedimiento</th>
                            <th>Descripción</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pro.map((item)=>(
                            <tr key={item.idProcedimiento}>
                              <td>ID Cultivo: {item.idCultivoFK}</td>
                              <td>{item.tipoProcedimiento.nombre}</td>
                              <td>{item.fechaProcedimiento}</td>
                              <td>{item.descripcion}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarpro/${item.idProcedimiento}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idProcedimiento)}}>
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

export default ListaProcedimiento