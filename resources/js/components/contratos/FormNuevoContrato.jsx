import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    Card,
    Container,
    Form,
    FloatingLabel,
} from "react-bootstrap";
import DireccionContrato from "./DireccionContrato";
import SerieContrato from "./SerieContrato";
import AutorizadoContrato from "./AutorizadoContrato";

export default function FormNuevoContrato() {
    const { cliente, tiendas, series} = usePage().props;
    const [serie, setSerie] = useState("");
    const [autorizado, setAutorizado] = useState("");
    const [fechaEntrada, setFechaEntrada] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");
    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar los datos al backend, incluyendo la dirección seleccionada
        console.log("Datos a enviar al backend:", {
            direccion: direccionId,
            serie: serie,
            autorizado: autorizado,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida
        }); }
    return (
        <Container>
            <p className="h3 m-3 mb-0">Nuevo contrato</p>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-0"><small className="ms-2"><small>{cliente.id} - </small></small>{cliente.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <DireccionContrato onDireccionSeleccionada={direccionId => console.log('Direccion seleccionada:', direccionId)} ></DireccionContrato>
                                <AutorizadoContrato></AutorizadoContrato>
                                <SerieContrato setSerie={series}></SerieContrato>
                                <Form onSubmit={handleSubmit} className="m-5">
                                    <Row>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA INICIO ALQUILER" className="m-2">
                                                <Form.Control type="date"
                                                    value={fechaEntrada}
                                                    onChange={(e) => setFechaEntrada( e.target.value )}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA FINALIZACIÓN" className="m-2">
                                                <Form.Control type="date"
                                                    value={fechaSalida}
                                                    onChange={(e) => setFechaSalida( e.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="12">
                                            <FloatingLabel label="OBSERVACIONES CONTRATO" className="m-2">
                                                <Form.Control size="sm"  as="textarea" rows={3} name="notas1"value=""
                                                    onChange={(e) => setData( "notas1",  e.target.value)}></Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="12">
                                            <FloatingLabel label="OBSERVACIONES ARTÍCULO" className="m-2">
                                                <Form.Control size="sm" as="textarea" rows={3} name="notas2" value=""
                                                    onChange={(e) =>setData( "notas2", e.target.value)}></Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button  onSubmit={handleSubmit} variant="btn btn-info btn-lg m-5" method="get" href={"/previsualizarContrato/" }>
                                <strong>Previsualización contrato</strong>
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
