import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function ListaInsumoR() {
  const go = useNavigate();
   const cookies = new Cookies();
   const [inr, setInr]=useState([]);
   const obtenerInr = async()=>{
    const response = await fetch(`${appsettings.apiUrl}InsumoRequerido`)
    if(response.ok){
      const data = await response.json()
      setInr(data);
    }
  }
  useEffect(()=>{
    obtenerInr()
      if(!cookies.get('id')){
          go('/')
      }
        },[]);

        const Eliminar = (id) =>{
          Swal.fire({
            title: "¿Esta seguro?",
            text: "Eliminar Insumo Requerido",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}InsumoRequerido/${id}`, {method:"DELETE"});
                if (response.ok) {
                  await obtenerInr()
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
                    <Link className="btn btn-success mb-3" to="/Crearinr">Nuevo Insumo</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Insumo</th>
                            <th>Procedimiento</th>
                            <th>Cantidad</th>

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          inr.map((item)=>(
                            <tr key={item.Editarinr}>
                              <td>{item.insumos.nombreInsumo}</td>
                              <td>ID: {item.procedimento.idProcedimiento} Descripción: {item.procedimento.descripcion}</td>
                              <td>{item.cantidad}</td>
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarinr/${item.idInRe}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idInRe)}}>
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

export default ListaInsumoR