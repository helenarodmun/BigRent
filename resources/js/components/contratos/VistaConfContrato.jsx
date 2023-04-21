import { useForm, usePage } from "@inertiajs/react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, } from "react-bootstrap";
export default function VistaConfContrato() {
    const { cliente, direccion, autorizado, contrato, subfamilia, maquina, serie, importe_alquiler } = usePage().props;
    const { data, post } = useForm({
        cliente_id: cliente.id,
        direccion_id: direccion.id,
        autorizado_id: autorizado.id,
        serie_id: serie.numero_serie,
        fecha_retirada: contrato.fecha_retirada,
        fecha_entrega: contrato.fecha_entrega,
        dias: contrato.dias,
        importe_total: contrato.importe_total,
        notas1: contrato.notas1,
        notas2: contrato.notas2
    });
    function handleSubmit(e) {
        e.preventDefault();        
        post(
            "/nuevoContrato",
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );                
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-1 mb-0">Datos y totales del contrato</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="m-2">
                                <Row>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="CLIENTE" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nombre_fiscal} disabled readonly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NIF CLIENTE" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nif} disabled readonly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="PERSONA AUTORIZADA" className="mb-2" >
                                            <Form.Control aria-label="autorizado contrato" name="autorizado" value={autorizado.nombre_persona_autorizada} disabled readonly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="DIRECCION CONTRATO" className="mb-2">
                                            <Form.Control aria-label="direccion contrato" name="direccion" value={direccion.direccion} disabled readonly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="MAQUINA CONTRATADA" className="mb-2">
                                            <Form.Control aria-label="maquina contrato" name="maquina" value={maquina.descripcion} disabled readonly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NUMERO DE SERIE" className="mb-2">
                                            <Form.Control aria-label="serie contrato" name="serie" value={serie.numero_serie} disabled readonly />
                                        </FloatingLabel>
                                    </Col>                                    
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA INICIO" className="mb-2">
                                                <Form.Control aria-label="inicio contrato" name="fecha_inicio" value={contrato.fecha_retirada} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA FIN" className="mb-2">
                                                <Form.Control aria-label="finalización contrato" name="fceha_fin" value={contrato.fecha_entrega} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="NÚMERO DIAS" className="mb-2">
                                                <Form.Control aria-label="dias contrato" name="dias" value={contrato.dias} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE FIANZA" className="mb-2">
                                                <Form.Control aria-label="fianza contrato" name="importeFianza" value={subfamilia.fianza} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE ALQUILER" className="mb-2">
                                                <Form.Control aria-label="importe alquiler contrato" name="importeAlquiler" value={importe_alquiler} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE TOTAL" className="mb-2">
                                                <Form.Control aria-label="importe total contrato" name="importeTotal" value={contrato.importe_total} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                </Row>
                                <Row>
                                        <Col xs="12" sm="6" md="6">
                                            <FloatingLabel label="OBSERVACIONES CONTRATO" className="mb-2">
                                                <Form.Control aria-label="observaciones sobre el contrato" name="notas1" value={contrato.notas1} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="6">
                                            <FloatingLabel label="OBSERVACIONES MÁQUINA" className="mb-2">
                                                <Form.Control aria-label="observaciones sobre la máquina" name="notas2" value={contrato.notas2} disabled readonly />
                                            </FloatingLabel>
                                        </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="btn btn-success btn-lg m-5" method="post" onClick={handleSubmit}><strong>Confirmar contrato</strong></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}