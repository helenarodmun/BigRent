import { usePage } from "@inertiajs/react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export default function TablaClientes() {
    const { clientes } = usePage().props;

    return (
        <>
        <Container>
            
        <p className="h3 m-3">Listado clientes</p>
            <Row>
                <Col sm={12} className="mt-3 pt-3 shadow ">
                    <Table
                        striped
                        bordered
                        hover
                        className="shadow"
                        size="sm"
                        responsive
                    >
                        <thead>
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
                                            className="btn btn-success m-1 shadow"
                                            size="sm"
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
            <Button
                className="m-5 align-items-center justify-content-center"
                variant="primary"
                href="/nuevoCliente"
            >
                Crear nuevo Cliente
            </Button>
            </Container>
        </>
        
    );
}
