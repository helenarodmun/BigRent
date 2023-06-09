import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row, Container } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function CardCliente({ children }) {
    const { cliente, flash, tipo } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data } = useForm({
        nombre_fiscal: cliente.nombre_fiscal,
        nif: cliente.nif,
        nombre_comercial: cliente.nombre_comercial,
        tipo_cliente: tipo.tipo,
        url_escrituras: cliente.url_escrituras || '',
        url_cif: cliente.url_cif || '',
        anotaciones: cliente.anotaciones || '',
    });
    //se guarda en una variable de estado el id del cliente, que se establecer´`a cuando el usuario haga clic en el icono de la papelera
    const [clienteId, setClienteId] = useState(null);
    return (
       <Container>
           <FlashMessage success={flash.success} error={flash.error} />
            <p className="h3 m-3 mb-0">Ficha cliente</p>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-0"><small className="ms-2"><small>{cliente.id} - </small></small>{data.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={3}>
                                        <FloatingLabel label="NIF" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={data.nif} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel label="NOMBRE COMERCIAL" className="mb-2">
                                            <Form.Control aria-label="nombre comercial" name="nombre_comercial" value={data.nombre_comercial} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={12}>
                                        <FloatingLabel label="OBSERVACIONES" className="mb-2">
                                            <Form.Control as="textarea" rows={5} value={data.anotaciones} disabled></Form.Control>
                                        </FloatingLabel>
                                    </Col><hr></hr>
                                    <Col>
                                        <Button variant='dark' className="ms-3 shadow">
                                            {data.url_escrituras ? (
                                                <a className="btn btn-dark" href={cliente.url_escrituras} target="_blank">
                                                    <i className="bi bi-file-earmark-pdf-fill text-success"></i> Escrituras</a>
                                            ) : (
                                                <a className="btn btn-dark">
                                                    <i className="bi-exclamation-triangle-fill text-danger"></i>  Escrituras</a>
                                            )}
                                        </Button>
                                        <Button variant='dark' className="ms-3 shadow">
                                            {data.url_cif ? (
                                                <a className="btn btn-dark" href={cliente.url_cif} target="_blank">
                                                    <i className="bi bi-file-earmark-pdf-fill text-success"></i> CIF</a>
                                            ) : (
                                                <a className="btn btn-dark">
                                                    <i className="bi-exclamation-triangle-fill text-danger"></i>   CIF</a>
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button size="lg" type="submit" className="m-3 shadow" variant="primary" method="get" href={"/editarCliente/" + cliente.id} aria-label="Modificar los datos del cliente">Editar cliente</Button>
                            <Button size="lg" className="m-3 shadow" variant="secondary" href={"/clientes"} aria-label="Volver a la vista anterior">Cancelar</Button>
                            <Button size="lg" className="m-3" variant="warning" href={"/listarContratos/" + cliente.id} aria-label="Volver a la vista anterior">Ver contratos</Button>
                        </Card.Footer>
                    </Card>
                    <div className="d-grid gap-2">
                        <Button variant="btn btn-outline-warning btn-lg m-5" method='get' href={"/nuevoContrato/" + cliente.id}><strong>Contratar alquiler</strong></Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
