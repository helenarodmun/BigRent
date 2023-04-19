import { Link,usePage } from "@inertiajs/react";
import React, {  useState } from "react";
import { Row, Col, Button, Card, Form, FloatingLabel, } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import TipInfo from "../partials/TipInfo";
export default function FormNuevoContrato() {
    const { cliente, tiendas, series, resultado } = usePage().props;
    const [fechaEntrada, setFechaEntrada] = useState("");
    const [fechaSalida, setFechaSalida] = useState(""); // se crea el estado query utilizando la función useState y se establece su valor inicial como el valor de resultado, o una cadena vacía si no existe resultado
    const [query, setQuery] = useState(resultado || "");
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
    const handleSearch = (event) => { setQuery(event.target.value);};
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = series.filter(
        (serie) => serie.maquina.descripcion.toLowerCase().includes(query.toLowerCase()) ||serie.numero_serie.toLowerCase().includes(query.toLowerCase()));
    return (
        <div>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-1 mb-0">Nuevo contrato <small className="ms-2"></small>{cliente.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="m-2">
                                <Form className="m-2">
                                    <Row>
                                        <Col xs="12" sm="6" md="6" className="shadow mt-3">
                                            <p className="h4 m-1">Dirección del contrato</p>
                                            <Table striped bordered hover className="shadow " size="sm" responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Dirección</th>
                                                        <th>Localidad</th>
                                                        <th>CP</th>
                                                        <th>Municipio</th>
                                                        <th>Provincia</th>
                                                        <th>Dirección pred.</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                {cliente.direcciones.map((direccion) => (
                                                    <tbody className="">
                                                        <tr key={direccion.id}>
                                                            <td>{direccion.direccion}</td>
                                                            <td>{direccion.localidad}</td>
                                                            <td>{direccion.cp}</td>
                                                            <td>{direccion.municipio}</td>
                                                            <td>{direccion.provincia}</td>
                                                            {direccion.predeterminada == 0 ? (
                                                                <td>No</td>
                                                            ) : (
                                                                <td>Sí</td>)}
                                                            <td>
                                                                <TipInfo content='Seleccionar dirección' direction='left' >
                                                                    <Link onClick={() => handleDireccionClick(direccion.id)} method="get" as="button" className="h5 border-0 bi bi-check-circle text-success m-1" />
                                                                </TipInfo>
                                                            </td>
                                                        </tr>
                                                    </tbody>))}
                                            </Table>
                                        </Col>
                                        <Col xs="12" sm="6" md="6" className="shadow mt-3">
                                            <p className="h4 m-1">Autorizados</p>
                                            <Table striped  bordered  hover className="shadow" size="sm" responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>DNI</th>
                                                        <th>Observaciones</th>
                                                        <th>Archivo DNI</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                {cliente.autorizados.map((autorizado) => (
                                                    <tbody className="">
                                                        <tr key={autorizado.id}>
                                                            <td>
                                                                {autorizado.nombre_persona_autorizada}
                                                            </td>
                                                            <td>{autorizado.dni}</td>
                                                            <td>{autorizado.notas}</td>
                                                            <td>{autorizado.url_dni}</td>
                                                            <td>
                                                                <TipInfo content='Seleccionar persona autorizada' direction='left' >
                                                                    <Link method="get" href=''  as="button" className="h5 border-0 bi bi-check-circle text-success m-1"/>
                                                                </TipInfo>
                                                            </td>
                                                        </tr>
                                                    </tbody>))}
                                            </Table>
                                        </Col>
                                        <Col xs="12" sm="6" md="6" className="shadow mt-3">
                                            <p className="h4 m-1">Búsqueda máquina a alquilar</p>
                                            <div className="container mt-1">
                                                <form action="/series/buscar" method="get" className="d-flex m-3" role="search">
                                                    <input name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar serie"/>
                                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                                                </form>
                                            </div>
                                            <Table striped bordered hover className="shadow" size="sm" responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Máquina</th>
                                                        <th>Número serie</th>
                                                        <th>Horometro</th>
                                                        <th>Hora inicio</th>
                                                        <th>Disponible</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                {query && resultadosBusqueda.map((serie) => (
                                                    <tbody className="">
                                                        <tr key={serie.id}>
                                                            <td>{serie.maquina.descripcion}</td>
                                                            <td>{serie.numero_serie}</td>
                                                            {serie.horometro === 0 ? (
                                                                <td><strong>NO</strong></td>
                                                            ) : (
                                                                <td><strong>SÍ</strong></td>)}
                                                            <td>{serie.hora_inicio}</td>
                                                            {serie.disponible === 0 ? (
                                                                <td className="text-danger"><strong>NO</strong></td>
                                                            ) : (
                                                                <td className="text-success"><strong>SÍ</strong></td>)}
                                                            <td>
                                                                <TipInfo content='Seleccionar máquina' direction='left' >
                                                                    <Link method="get" href='' as="button" className="h5 border-0 bi bi-check-circle text-success m-1"/>
                                                                </TipInfo>
                                                            </td>
                                                        </tr>
                                                    </tbody>))}
                                            </Table>
                                        </Col>
                                        <Col xs="12" sm="3" md="6" >
                                            <Row>
                                                <Col xs="12" sm="3" md="6">
                                                    <FloatingLabel label="FECHA INICIO ALQUILER" className="mt-5 ">
                                                        <Form.Control type="date"
                                                            value={fechaEntrada}
                                                            onChange={(e) => setFechaEntrada(e.target.value)} />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs="12" sm="3" md="6">
                                                    <FloatingLabel label="FECHA FINALIZACIÓN" className="mt-5">
                                                        <Form.Control type="date"
                                                            value={fechaSalida}
                                                            onChange={(e) => setFechaSalida(e.target.value)} />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs="12" sm="3" md="12">
                                                    <FloatingLabel label="OBSERVACIONES CONTRATO" className="mt-3">
                                                        <Form.Control size="sm" as="textarea" rows={3} name="notas1" value=""
                                                            onChange={(e) => setData("notas1", e.target.value)}></Form.Control>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs="12" sm="3" md="12">
                                                    <FloatingLabel label="OBSERVACIONES ARTÍCULO" className="mt-3">
                                                        <Form.Control size="sm" as="textarea" rows={3} name="notas2" value=""
                                                            onChange={(e) => setData("notas2", e.target.value)}></Form.Control>
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="btn btn-info btn-lg m-5" method="get" href={"/previsualizarContrato/"}>
                                <strong>Previsualización contrato</strong>
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>);}
