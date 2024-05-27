import { ChangeEvent, useState,useEffect } from "react";
import { appsettings } from '../../settings/appsettings';
import { useNavigate, useParams,Link} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import Nav from '../../Components/Nav';
import { Container, Row, Col, Form, Table, FormGroup, Label, Input, Button } from "reactstrap";

function LIstaLogroC() {
    const go = useNavigate();
   const cookies = new Cookies();
   const [logc, setLogc]=useState([]);
   const obtenerLog = async()=>{
    const response = await fetch(`${appsettings.apiUrl}LogroConseguido`)
    if(response.ok){
      const data = await response.json()
      setLogc(data);
    }
  }
  useEffect(()=>{
    obtenerLog()
      if(!cookies.get('id')){
          go('/')
      }
        },[]);

        const Eliminar = (id) =>{
          Swal.fire({
            title: "¿Esta seguro?",
            text: "Eliminar Logro Conseguido",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
  
            if (result.isConfirmed) {
              const response = await fetch(`${appsettings.apiUrl}LogroConseguido/${id}`, {method:"DELETE"});
                if (response.ok) {
                  await obtenerLog()
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
                    <h4>Lista de Logros Conseguidos</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/Crearlogroc">Nuevo Logro Conseguido</Link>
                    <Table bordered>
                      <thead>
                        <tr>
                            <th>Partida</th>
                            <th>Logro</th>
                            <th>Fecha Logro</th>
                            

                            <th></th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          logc.map((item)=>(
                            <tr key={item.idLogCon}>
                              <td>ID Usuario: {item.partida.idUsuarioFK} Fecha Inciao {item.partida.fechaInicio}</td>
                              <td>{item.logro.nombreLogro}</td>
                              <td>{item.fechaLogro}</td>
                              
                              <td>
                              <Link className="btn btn-primary me-2" to={`/Editarlogroc/${item.idLogCon}`}><i className="fa-solid fa-edit"></i></Link>
                              
                              </td>
                              <td>
                              <Button color="danger" onClick={()=> {Eliminar(item.idLogCon)}}>
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

export default LIstaLogroC