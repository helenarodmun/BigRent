import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Button, Card, Form, FloatingLabel, Container, } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function FormNuevoContrato() {
    const { cliente, telefonos, correos, series, familias, subfamilias, maquinas, errors, flash } = usePage().props;
    const { data, setData, post } = useForm({
        cliente_id: cliente.id,
        direccion_id: '',
        telefono_id: '',
        autorizado_id: '',
        serie_id: '',
        fecha_retirada: '',
        fecha_entrega: '',
        notas1: '',
        notas2: '',
    })
    const [selectedFamiliaId, setSelectedFamiliaId] = useState(null); // nuevo estado para la familia seleccionada  
    const subfamiliasFiltradas = subfamilias.filter(subfamilia => subfamilia.familia_id === selectedFamiliaId); // subfamilias filtradas por la familia seleccionada
    const [selectedSubfamiliaId, setSelectedSubfamiliaId] = useState(null); // nuevo estado para la subfamilia seleccionada  
    const maquinasFiltradas = maquinas.filter(maquinas => maquinas.subfamilia_id === selectedSubfamiliaId);
    const [selectedMaquinaId, setSelectedMaquinaId] = useState(null);// maquinas filtradas por la subfamilia seleccionada
    const seriesFiltradas = series.filter(series => series.maquina_id === selectedMaquinaId);
    function handleSubmit(e) {
        e.preventDefault();
        post("/contrato/confirmar",
            { onSuccess: () => { console.log(data); }, },
            data);
    }
    return (

        <Container className="mt-5">
            <FlashMessage success={flash.success} error={flash.error} />
            <Row>
                <Col>
                    <Card className="shadow rounded">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-1 mb-0">Nuevo contrato <small className="ms-2"></small>{cliente.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="m-2">
                                <Row>
                                    <Col xs="12" sm="6" md="6">
                                        <FloatingLabel label="DIRECCIÓN CONTRATO" className="mb-2">
                                            <Form.Select name="direccion_id" placeholder="Selecciona una dirección" onChange={(e) => setData("direccion_id", e.target.value)}>
                                                <option>Seleccione dirección ...</option>
                                                {cliente.direcciones.sort((a, b) => a.direccion.localeCompare(b.direccion)).map(direccion => (<option key={direccion.id} value={direccion.id}>{direccion.direccion}</option>))}
                                            </Form.Select>
                                            {errors.direccion_id && (<div className="alert alert-danger">{errors.direccion_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="3" md="3">
                                        <FloatingLabel label="CORREO ELÉCTRONICO" className="mb-2">
                                            <Form.Select name="telefono_id" placeholder="Selecciona un correo" onChange={(e) => setData("telefono_id", e.target.value)}>
                                                <option>Seleccione correo ...</option>
                                                {correos.map(telefono => (<option key={telefono.id} value={telefono.id}>{telefono.contacto}</option>))}
                                            </Form.Select>
                                            {errors.telefono_id && (<div className="alert alert-danger">{errors.telefono_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="6">
                                        <FloatingLabel label="AUTORIZADO CONTRATO" className="mb-2">
                                            <Form.Select name="autorizado_id" placeholder="Selecciona un autorizado" onChange={(e) => setData("autorizado_id", e.target.value)}>
                                                <option>Seleccione autorizado ...</option>
                                                {cliente.autorizados.sort((a, b) => a.nombre_persona_autorizada.localeCompare(b.nombre_persona_autorizada)).map(autorizado => (<option key={autorizado.id} value={autorizado.id}>{autorizado.nombre_persona_autorizada}</option>))}
                                            </Form.Select>
                                            {errors.autoizado_id && (<div className="alert alert-danger">{errors.autorizado_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="3" md="3">
                                        <FloatingLabel label="TELÉFONO PERSONA AUTORIZADA" className="mb-2">
                                            <Form.Select name="telefono_id" placeholder="Selecciona un correo" onChange={(e) => setData("telefono_id", e.target.value)}>
                                                <option>Seleccione teléfono ...</option>
                                                {telefonos.map(telefono => (<option key={telefono.id} value={telefono.id}>{telefono.contacto}</option>))}
                                            </Form.Select>
                                            {errors.telefono_id && (<div className="alert alert-danger">{errors.telefono_id}</div>)}
                                        </FloatingLabel>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="FAMILIA" className="mb-2">
                                            <Form.Select size="sm" aria-label="familia" as="select" name="familia_id" value={data.familia_id} onChange={(e) => { setData("familia_id", e.target.value); setSelectedFamiliaId(parseInt(e.target.value)); }}>
                                                <option>Seleccione la familia...</option>
                                                {familias.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((familia) => (<option key={familia.id} value={familia.id}>{familia.nombre}</option>))}
                                            </Form.Select>
                                            {errors.familia_id && (<div className="alert alert-danger">{errors.familia_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="SUBFAMILIA" className="mb-2">
                                            <Form.Select size="sm" aria-label="subfamilia" as="select" name="subfamilia_id" value={data.subfamilia_id} onChange={(e) => { setData("subfamilia_id", e.target.value); setSelectedSubfamiliaId(parseInt(e.target.value)); }}>
                                                <option>Seleccione la subfamilia...</option>
                                                {subfamiliasFiltradas.sort((a, b) => a.descripcion.localeCompare(b.descripcion)).map((subfamilia) => (<option key={subfamilia.id} value={subfamilia.id}>{subfamilia.descripcion}</option>))}
                                            </Form.Select>
                                            {errors.subfamilia_id && (<div className="alert alert-danger">{errors.subfamilia_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="MÁQUINA" className="mb-2">
                                            <Form.Select size="sm" aria-label="maquina" as="select" name="maquina_id" value={data.maquina_id} onChange={(e) => { setData("maquina_id", e.target.value); setSelectedMaquinaId(parseInt(e.target.value)); }}>
                                                <option>Seleccione la máquina...</option>
                                                {maquinasFiltradas.sort((a, b) => a.descripcion.localeCompare(b.descripcion)).map((maquina) => (<option key={maquina.id} value={maquina.id}>{maquina.descripcion}</option>))}
                                            </Form.Select>
                                            {errors.maquina_id && (<div className="alert alert-danger">{errors.maquina_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        {selectedMaquinaId && seriesFiltradas.length > 0 ? (
                                            <FloatingLabel label="NUMERO SERIE" className="mb-2">
                                                <Form.Select size="sm" aria-label="series" as="select" name="serie_id" value={data.serie_id} onChange={(e) => setData("serie_id", e.target.value)}>
                                                    <option>Seleccione la serie...</option>
                                                    {seriesFiltradas
                                                        .sort((a, b) => a.numero_serie.localeCompare(b.numero_serie))
                                                        .map((serie) => (
                                                            <option key={serie.id} value={serie.id}>{serie.numero_serie} </option>
                                                        ))}
                                                </Form.Select>
                                                {errors.serie_id && (<div className="alert alert-danger">{errors.serie_id}</div>)}
                                            </FloatingLabel>
                                        ) : (
                                            selectedMaquinaId && <p className="text-danger"><strong>NO SE HAN ENCONTRADO SERIES DISPONIBLES</strong></p>
                                        )}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs="12" sm="3" md="6" >
                                        <Row>
                                            <Col xs="12" sm="3" md="6">
                                                <FloatingLabel label="FECHA INICIO ALQUILER" className="mb-2 ">
                                                    <Form.Control type="date" name="date" value={data.fecha_retirada} onChange={(e) => setData("fecha_retirada", e.target.value)} />
                                                    {errors.fecha_retirada && (<div className="alert alert-danger">{errors.fecha_retirada}</div>)}
                                                </FloatingLabel>
                                            </Col>
                                            <Col xs="12" sm="3" md="6">
                                                <FloatingLabel label="FECHA FINALIZACIÓN" className="mb-2">
                                                    <Form.Control type="date" name="date" value={data.fecha_entrega} onChange={(e) => setData("fecha_entrega", e.target.value)} />
                                                    {errors.fecha_entrega && (<div className="alert alert-danger">{errors.fecha_entrega}</div>)}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
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
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="btn btn-primary btn-lg m-3" method="get" onClick={handleSubmit}>
                                <strong>Visualizar datos y totales</strong>
                            </Button>
                            <Button variant="btn btn-secondary btn-lg m-3" method="post" href={"/verCliente/" + cliente.id}><strong>Cancelar</strong></Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
