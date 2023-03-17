import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

export default function Index() {

    const { clientes } = usePage().props;

    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY - HH:mm:ss");
    }

    return (
        <>
            <Container>
                {/* {flash.viaje && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.cliente}
                    </div>
                )} */}
                <Row> 
                    <h1 className="m-3">Clientes</h1>
                    <Col  sm={12} className="mt-3 pt-3 shadow ">
                        <Table striped bordered hover className="shadow" size="sm" responsive>
                            <thead >
                                <tr>
                                    <th>Nombre fiscal</th>
                                    <th>Nombre comercial</th>
                                    <th>Nombre administrador</th>
                                </tr>
                            </thead>
                            {clientes.map((cliente) => (                                                 
                                <tbody>
                                    <tr key={cliente.id}>
                                        <td>{cliente.nombre_fiscal}</td>
                                        <td>{cliente.nombre_comercial}</td>
                                        <td>{cliente.administrador}</td>
                                        <td>                                           
                                        <Button
                                        className="btn btn-success  m-3 shadow" size="sm"
                                        href={"/verCliente/" + cliente.id}
                                    >
                                        Ver Ficha
                                    </Button>                             
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </Row>
                <Button className="m-5 align-items-center justify-content-center" variant="primary"  href="/nuevoCliente" size="lg">            
                    Crear nuevo Cliente
                </Button>
            </Container>
        </>
    );
}
