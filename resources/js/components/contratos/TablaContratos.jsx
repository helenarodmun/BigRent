import { Link, usePage } from "@inertiajs/react";
import { useState } from 'react';
import { Col, Table, Row, Container, Button, Form, InputGroup, Pagination } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";
import TipInfo from "../partials/TipInfo";

export default function TablaContratos() {
    const { contratos, cliente, flash } = usePage().props;
    console.log(contratos)
    // Estados para el valor de búsqueda y filtro
    const [query, setQuery] = useState('');
    //Inicializa el estado del filtrado con el valor '2' para mostrar todos los contratos
    const [activoFilter, setActivoFilter] = useState(2);
    // Función para formatear la fecha
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY -  HH:mm:ss");
    }
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);
    };

    let resultadosFiltrados = contratos.data;
    if (query.length >= 3) {
        resultadosFiltrados = resultadosFiltrados.filter((contrato) =>
            contrato.serie.numero_serie.toLowerCase().includes(query.toLowerCase())
        );
    }
    //Funciones de filtrado de contratos están comentados hasta reparar bug de la paginación
    // const handleActivoFilter = (value) => {
    //     setActivoFilter(value);
    // };
    // if (activoFilter !== 2) {
    //     resultadosFiltrados = resultadosFiltrados.filter((contrato) =>
    //         contrato.activo === activoFilter
    //     );
    // }
    const links = contratos.links;
    return (
        <>
            <FlashMessage success={flash.success} error={flash.error} />
            <Container>
                <Row className="justify-content-end mt-5 mb-5">
                    <Col xs="auto">
                        <InputGroup action="/maquinas/buscar" method="get" className="d-flex shadow" role="search">
                            <InputGroup.Text className='bg-success bg-opacity-25'><i className="bi bi-search text-dark"></i></InputGroup.Text>
                            <Form.Control name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar subfamilia" />
                        </InputGroup>
                    </Col>
                    {/* <Col xs="auto">
                        <Form.Select action={`/listarContratos/${cliente.id}?activoFilter=${activoFilter}`} // Agregar filtro en la URL de acción
                            method="get" onChange={handleFilterChange}>
                            <option value={2}>Todos</option>
                            <option value={1}>Activos</option>
                            <option value={0}>No activos</option>
                        </Form.Select>
                    </Col> */}
                </Row>
                <Row className="mt-2">
                    <Col className="shadow rounded">
                        <h1 className="m-3">Contratos {cliente.nombre_fiscal}</h1>
                        <Table striped bordered hover className="shadow" size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Serie</th>
                                    <th>Alta del contrato</th>
                                    <th>Fecha inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Total</th>
                                    <th>Activo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {resultadosFiltrados.length === 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="9" className="text-center text-danger"><strong>NO SE ENCONTRARON CONTRATOS</strong></td>
                                    </tr>
                                </tbody>
                            ) : (
                                resultadosFiltrados.map((contrato) => (
                                    <tbody key={contrato.id} className="">
                                        <tr>
                                            <td>{contrato.id}</td>
                                            <td>{contrato.serie.numero_serie}</td>
                                            <td>{myDate(contrato.created_at)}</td>
                                            <td>{contrato.fecha_retirada}</td>
                                            <td>{contrato.fecha_entrega}</td>
                                            <td>{`${contrato.importe_total} €`}</td>
                                            {contrato.activo == 0 ? (
                                                <td className="text-danger">
                                                    <strong>NO</strong>
                                                </td>
                                            ) : (
                                                <td className="text-success">
                                                    <strong>SÍ</strong>
                                                </td>
                                            )}
                                            <td>
                                                <TipInfo content="Ver contrato" direction="left">
                                                    <Link href={"/verContrato/" + contrato.id} className="h5 border-0 bi bi-search text-dark m-1" />
                                                </TipInfo>
                                            </td>
                                        </tr>
                                    </tbody>)))}
                        </Table>
                        <Row className="justify-content-center">
                            <Col sm={12} md={6} className="text-center">
                                <Pagination>
                                    {contratos.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            href={link.url}
                                            className={`page-link${link.active ? ' active' : ''}`}
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </Link>
                                    ))}
                                </Pagination>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="d-flex justify-content-start">
                        <TipInfo content="Añadir nuevo contrato" direction="right">
                            <Link href={"/nuevoContrato/" + cliente.id} className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
                        </TipInfo>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="btn bi bi-arrow-90deg-left btn-outline-primary btn-lg m-5" method='get' href={"/verCliente/" + cliente.id}><strong> Ficha cliente</strong></Button>
                </div>
            </Container>
        </>
    );
}
