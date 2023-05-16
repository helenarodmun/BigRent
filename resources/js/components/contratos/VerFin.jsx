import { useForm, usePage } from "@inertiajs/react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { useState } from "react";
export default function VistaFin() {
    const { cliente, direccion, direccion_predeterminada, telefono, autorizado, contrato, subfamilia, maquina, serie, importe_alquiler } = usePage().props;
    const { data, setData, post, errors } = useForm({
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
    const { delete: destroy } = useForm();
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToClose, setIdToClose] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleClick = (id) => {
        setShowConfirmModal(true);
        setIdToClose(id); // Se establece la id del registro a eliminar
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Card className="shadow rounded">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-1 mb-0">Finalización contrato</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="m-2">
                                <Row>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="CLIENTE" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nombre_fiscal} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NIF CLIENTE" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" name="nif" value={cliente.nif} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="DIRECCION CLIENTE" className="mb-2">
                                            <Form.Control aria-label="direccion cliente" name="direccion" value={`${direccion_predeterminada.direccion} - ${direccion_predeterminada.cp} - ${direccion_predeterminada.municipio} - ${direccion_predeterminada.provincia}`} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="PERSONA AUTORIZADA" className="mb-2" >
                                            <Form.Control aria-label="autorizado contrato" name="autorizado" value={autorizado.nombre_persona_autorizada} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="DIRECCION CONTRATO" className="mb-2">
                                            <Form.Control aria-label="direccion contrato" name="direccion" value={`${direccion.direccion} - ${direccion.cp} - ${direccion.municipio} - ${direccion_predeterminada.provincia}`} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="CONTACTO" className="mb-2">
                                            <Form.Control aria-label="contacto contrato" name="telefono" value={telefono.contacto} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="7">
                                        <FloatingLabel label="MAQUINA CONTRATADA" className="mb-2">
                                            <Form.Control aria-label="maquina contrato" name="maquina" value={maquina.descripcion} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="NUMERO DE SERIE" className="mb-2">
                                            <Form.Control aria-label="serie contrato" name="serie" value={serie.numero_serie} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="FECHA INICIO" className="mb-2">
                                            <Form.Control aria-label="inicio contrato" name="fecha_inicio" value={myDate(contrato.fecha_retirada)} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="FECHA FIN" className="mb-2">
                                            <Form.Control aria-label="finalización contrato" name="fceha_fin" value={myDate(contrato.fecha_entrega)} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="TOTAL DÍAS" className="mb-2">
                                            <Form.Control aria-label="dias contrato" name="dias" value={contrato.dias} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="IMPORTE FIANZA" className="mb-2">
                                            <Form.Control aria-label="fianza contrato" name="importeFianza" value={`${subfamilia.fianza} €`} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="IMPORTE ALQUILER" className="mb-2">
                                            <Form.Control aria-label="importe alquiler contrato" name="importeAlquiler" value={`${subfamilia.precio_dia} €/día`} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="IMPORTE FINAL" className="mb-2">
                                            <Form.Control aria-label="importe total contrato" name="importeTotal" value={`${contrato.importe_total} €`} disabled readOnly />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="3" md="12">
                                        <FloatingLabel label="ESTADO DEL ARTÍCULO - OTRAS OBSERVACIONES" className="mb-2">
                                            <Form.Control size="sm" as="textarea" rows={3} name="notas1" value={data.notas1} onChange={(e) => setData("notas1", e.target.value)}></Form.Control>
                                            {errors.notas1 && (<div className="alert alert-danger">{errors.notas1}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="3" md="12">
                                        <FloatingLabel label="OBSERVACIONES CONTRATO" className="mb-2">
                                            <Form.Control size="sm" as="textarea" rows={3} name="notas2" value={data.notas2} onChange={(e) => setData("notas2", e.target.value)}></Form.Control>
                                            {errors.notas2 && (<div className="alert alert-danger">{errors.notas2}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            {contrato.activo == 1 ? (
                                <Button variant="btn btn-danger btn-lg m-5" method="get" onClick={() => handleClick(contrato.id)}><strong>Cerrar contrato</strong></Button>

                            ) : ('')}
                            <ModalConfirmacion show={showConfirmModal}
                                onHide={() => {
                                    setIdToClose(null);
                                    setShowConfirmModal(false);
                                }}
                                onConfirm={(urlAccion, idRegistro) => {
                                    post(
                                        `${urlAccion}/${idRegistro}`,
                                        {
                                            onSuccess: () => {
                                                console.log("contrato cerrado");
                                            },
                                        }
                                    );
                                }}
                                title="¡ADVERTENCIA!"
                                message="Se va a proceder al cierre del contrato. ¿Está seguro que desea continuar?"
                                urlAccion="/cerrarContrato"
                                idRegistro={idToClose} variant={'success'} text={'Aceptar'}
                            />
                            <Button variant="btn btn-info btn-lg m-3" method="get" href={'/contrato-pdf/' + contrato.id}><strong>Generar documento</strong></Button>
                            <Button variant="btn btn-secondary btn-lg m-5" href={"/listarContratos/" + cliente.id}><strong>Cancelar</strong></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}