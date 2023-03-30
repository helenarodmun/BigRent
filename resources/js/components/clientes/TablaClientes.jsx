import { usePage } from "@inertiajs/react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export default function TablaClientes() {
    const { clientes, flash } = usePage().props;

    return (
        <>
        <Container>
        <div align="center">
            <Col sm={10}>
                {flash.borrado && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.borrado}
                    </div>
                )}
            </Col>
        </div> 
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
                                <th></th>
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
