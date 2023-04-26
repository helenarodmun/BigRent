import { useForm, usePage } from "@inertiajs/react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, } from "react-bootstrap";
export default function VerContrato() {
    const { cliente, direccion, direccion_predeterminada, telefono,autorizado, contrato, subfamilia, maquina, serie, importe_alquiler } = usePage().props;
    const { data, get } = useForm({
        cliente_id: cliente.id,
        direccion_id: direccion.id,
        telefono_id: telefono.id,
        direccion_predeterminada: direccion_predeterminada.id,
        autorizado_id: autorizado.id,
        serie_id: serie.id,
        fecha_retirada: contrato.fecha_retirada,
        fecha_entrega: contrato.fecha_entrega,
        dias: contrato.dias,
        importe_total: contrato.importe_total,
        notas1: contrato.notas1,
        notas2: contrato.notas2 || ''
    });
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY");
    }
    function handleSubmit(e) {
        e.preventDefault();        
        put(
            "/ActualizaContrato" + contrato.id,
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
            <p className="h1 mt-3">Modificación contrato {myData(contrato.created_at)}</p>
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
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nombre_fiscal} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NIF CLIENTE" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nif}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="DIRECCION CLIENTE" className="mb-2">
                                            <Form.Control aria-label="direccion cliente" name="direccion" value={`${direccion_predeterminada.direccion} - ${direccion_predeterminada.cp} - ${direccion_predeterminada.municipio} - ${direccion_predeterminada.provincia}`}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="PERSONA AUTORIZADA" className="mb-2" >
                                            <Form.Control aria-label="autorizado contrato" name="autorizado" value={autorizado.nombre_persona_autorizada}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="DIRECCION CONTRATO" className="mb-2">
                                            <Form.Control aria-label="direccion contrato" name="direccion" value={`${direccion.direccion} - ${direccion.cp} - ${direccion.municipio} - ${direccion_predeterminada.provincia}`}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="CONTACTO" className="mb-2">
                                            <Form.Control aria-label="contacto contrato" name="telefono" value={telefono.contacto}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="MAQUINA CONTRATADA" className="mb-2">
                                            <Form.Control aria-label="maquina contrato" name="maquina" value={maquina.descripcion}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NUMERO DE SERIE" className="mb-2">
                                            <Form.Control aria-label="serie contrato" name="serie" value={serie.numero_serie}/>
                                        </FloatingLabel>
                                    </Col>                                    
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA INICIO" className="mb-2">
                                                <Form.Control aria-label="inicio contrato" name="fecha_inicio" value={myDate(contrato.fecha_retirada)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="3">
                                            <FloatingLabel label="FECHA FIN" className="mb-2">
                                                <Form.Control aria-label="finalización contrato" name="fceha_fin" value={myDate(contrato.fecha_entrega)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="NÚMERO DIAS" className="mb-2">
                                                <Form.Control aria-label="dias contrato" name="dias" value={contrato.dias}/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE FIANZA" className="mb-2">
                                                <Form.Control aria-label="fianza contrato" name="importeFianza" value={subfamilia.fianza}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE ALQUILER" className="mb-2">
                                                <Form.Control aria-label="importe alquiler contrato" name="importeAlquiler" value={importe_alquiler}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="2">
                                            <FloatingLabel label="IMPORTE TOTAL" className="mb-2">
                                                <Form.Control aria-label="importe total contrato" name="importeTotal" value={contrato.importe_total}/>
                                            </FloatingLabel>
                                        </Col>
                                </Row>
                                <Row>
                                        <Col xs="12" sm="6" md="6">
                                            <FloatingLabel label="ESTADO ARTÍCULO - OBSERVACIONES" className="mb-2">
                                                <Form.Control aria-label="observaciones sobre el artículo" name="notas1" value={contrato.notas1}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs="12" sm="6" md="6">
                                            <FloatingLabel label="OBSERVACIONES CONTRATO" className="mb-2">
                                                <Form.Control aria-label="observaciones sobre el contrato" name="notas2" value={contrato.notas2 ||''}/>
                                            </FloatingLabel>
                                        </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="btn btn-success btn-lg m-5" method="put" onClick={handleSubmit}><strong>Modificar contrato</strong></Button>
                            <Button variant="btn btn-secondary btn-lg m-5"  href={"/listarContratos/" + cliente.id}><strong>Cancelar</strong></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}