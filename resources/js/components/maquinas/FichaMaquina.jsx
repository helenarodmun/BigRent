import { usePage } from "@inertiajs/react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
export default function FichaMaquina() {
    const { maquina } = usePage().props;
    return (
        <Container>
            <Button variant="btn btn-info btn-lg m-3 bi bi-arrow-90deg-left" href="/maquinas">  Volver al listado</Button>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h-3 m-0"><strong className="ms-2">{maquina.descripcion}</strong></p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" sm="12" md="6">
                                    <Card.Img variant="right" id="img_maquinaria" src={maquina.url_imagen} alt={maquina.descripcion} />
                                </Col>
                                <Col xs="12" sm="12" md="6" className="mt-5">
                                    <p><strong>Referencia:  </strong>{maquina.referencia}</p>
                                    <p><strong>Subfamilia:  </strong> {maquina.subfamilia.descripcion}</p>
                                    <p><strong>Marca: </strong> {maquina.marca.denominacion}</p>
                                    <p><strong>Precio alquiler por día: </strong>{maquina.subfamilia.precio_dia} €</p>
                                    <p><strong>Precio fianza: </strong>Precio fianza: {maquina.subfamilia.fianza} €</p>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button size="lg" className="m-3 shadow"><a className="btn btn-primary" href={maquina.url_manual} target="_blank">Ver Manual</a></Button>
                            <Button size="lg" className="m-3 shadow"><a className="btn btn-primary" href={maquina.url_ficha} target="_blank">Ver Ficha</a></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}