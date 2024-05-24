import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";


function ListaEstado() {
  const go = useNavigate();
   const cookies = new Cookies();
   const [esta, setEsta]=useState([]);

   const obtenerEstado = async()=>{
    const response = await fetch(`${appsettings.apiUrl}EstadoCultivo`)
    if(response.ok){
      const data = await response.json()
      setEsta(data);
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
            text: "Eliminar Estado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}EstadoCultivo/${id}`, {method:"DELETE"});
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
                    <h4>Lista de Estado</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Creares">Nuevo Estado</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Nombre Estado</th>
                            <th></th>
                            
                        </tr>
                      </thead>
                      <tbody>
                        {
                          esta.map((item)=>(
                            <tr key={item.idEstado}>
                              <td>{item.nombreEstado}</td>
                              <td>
                                <Link className="btn btn-primary me-2" to={`/Editares/${item.idEstado}`}><i className="fa-solid fa-edit"></i></Link>
                                <Button color="danger" onClick={()=> {Eliminar(item.idEstado)}}>
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

export default ListaEstado