import { usePage } from "@inertiajs/react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
export default function FichaMaquina() {
    const { maquina } = usePage().props;
    return (
        <Container>
            <Button variant="btn btn-primary btn-lg m-3 bi bi-arrow-90deg-left" href="/maquinas">  Volver al listado</Button>
            <Row>
                <Col>
                    <Card className="shadow rounded">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h-3 m-0"><strong className="ms-2">{maquina.descripcion}</strong></p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
              <Row>
                <Col sm="12" md="12" lg="6" className="order-sm-2">
                  <p><strong>Referencia:  </strong>{maquina.referencia}</p>
                  <p><strong>Subfamilia:  </strong> {maquina.subfamilia.descripcion}</p>
                  <p><strong>Marca: </strong> {maquina.marca.denominacion}</p>
                  <p><strong>Precio alquiler por día: </strong>{maquina.subfamilia.precio_dia} €</p>
                  <p><strong>Precio fianza: </strong>{maquina.subfamilia.fianza} €</p>
                  <p><strong>Disponibles en tienda: </strong>{maquina.series.length} uds.</p>
                </Col>
                <Col sm="12" md="12" lg="6" className="order-sm-1">
                  <Card.Img variant="right" id="img_maquinaria" src={maquina.url_imagen} alt={maquina.descripcion} />
                </Col>
              </Row>
            </Card.Body>
                        <Card.Footer>
                            <Button variant = 'dark' size="lg" className="m-3 shadow"><a className="btn btn-dark" href={maquina.url_manual} target="_blank">Ver Manual</a></Button>
                            <Button variant = 'dark' size="lg" className="m-3 shadow"><a className="btn btn-dark" href={maquina.url_ficha} target="_blank">Ver Ficha</a></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}