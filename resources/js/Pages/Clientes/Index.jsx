import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

export default function Index() {
    const { clientes } = usePage().props;
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY - HH:mm:ss");
    }

    return (
        <>
            <Container className="accesibilidad-texto">
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

                    <Col sm={12} className="mt-3 pt-3 shadow  p-2 ">
                        <Table striped bordered hover className="shadow">
                            <thead className="h3">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>NIF</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {clientes.map((cliente) => (
                                <tbody>
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nombre_fiscal}</td>
                                        <td>{cliente.nif}</td>
                                        <td>                                           
                                            <Link
                                                href={"/cliente/" + cliente.id}
                                                className="shadow  bi bi-pencil-square m-1 text-success"
                                                as="button"
                                            />                                           
                                            <Link
                                            method="delete"
                                                href={"/clientes/" + cliente.id}
                                                className="shadow bi bi-trash m-1 text-danger"
                                                as="button"
                                            />                                        
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
