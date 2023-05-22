import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from 'react';
import { Col, Table, Row, Container, Button, Form, InputGroup, Pagination } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";
import TipInfo from "../partials/TipInfo";

export default function TablaContratos() {
    const { contratos, cliente, flash } = usePage().props;
    const {get} = useForm();
    const [query, setQuery] = useState('');
    const [activoFilter, setActivoFilter] = useState('');

    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY -  HH:mm:ss");
    }

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        get(`/listarContratos/${cliente.id}?query=${searchQuery}`);
        
    };

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        setActivoFilter(filterValue);
        window.location.href = `/listarContratos/${cliente.id}?activoFilter=${filterValue}`;
    };

    return (
        <>
            <FlashMessage success={flash.success} error={flash.error} />
            <Container>
                <Row className="justify-content-end mt-5 mb-5">
                    <Col xs="auto">
                        <InputGroup className="d-flex shadow" role="search">
                            <InputGroup.Text className='bg-success bg-opacity-25'><i className="bi bi-search text-dark"></i></InputGroup.Text>
                            <Form.Control name="query" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar subfamilia" />
                        </InputGroup>
                    </Col>
                    <Col xs="auto">
                        <Form.Select value={activoFilter} onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            <option value="1">Activos</option>
                            <option value="0">No activos</option>
                        </Form.Select>
                    </Col>
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
                            {contratos.data.length === 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="9" className="text-center text-danger"><strong>NO SE ENCONTRARON CONTRATOS</strong></td>
                                    </tr>
                                </tbody>
                            ) : (
                                contratos.data.map((contrato) => (
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
