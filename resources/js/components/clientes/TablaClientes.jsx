import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button, Col, Container, Row, Table, InputGroup, Form, Pagination } from "react-bootstrap";
import FlashMessage from '../partials/FlashMessage';

const TablaClientes = () => {
    // Se obtienen los datos de clientes y resultado del hook usePage y se almacenan en las variables clientes
    const { clientes, flash } = usePage().props;
    // se crea el estado query utilizando la función useState y se establece su valor inicial como  una cadena vacía 
    const [query, setQuery] = useState('');
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);
    };
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = clientes.data.filter((cliente) =>
        cliente.nombre_fiscal.toLowerCase().includes(query.toLowerCase())
        || cliente.nif.toLowerCase().includes(query.toLowerCase())
    );
    const mostrarResultados = query.length >= 3 ? resultadosBusqueda : clientes.data;
    const links = query.length >= 3 ? [] : clientes.links;
    return (
        <Container >
            <FlashMessage success={flash.success} error={flash.error} />
            <Row className="justify-content-end mt-5">
                <Col xs="auto">
                    <InputGroup action="/clientes/buscar" method="get" className="d-flex shadow" role="search">
                        <InputGroup.Text className='bg-success bg-opacity-25'><i className="bi bi-search text-dark"></i></InputGroup.Text>
                        <Form.Control name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar cliente" />
                    </InputGroup>
                </Col>
            </Row>
            <p className="h3 m-3">Listado clientes</p>
            <Row>
                <Col sm={12} className="mt-3 pt-3 shadow rounded">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Nombre fiscal</th>
                                <th>CIF</th>
                                <th></th>
                            </tr>
                        </thead>
                        {mostrarResultados.map((cliente) => (
                            <tbody key={cliente.id}>
                                <tr>
                                    <td>{cliente.nombre_fiscal}</td>
                                    <td>{cliente.nif}</td>
                                    <td>
                                        <Button className="btn btn-success m-1 shadow" size="sm" href={"/verCliente/" + cliente.id}>Seleccionar</Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <Row className="justify-content-center">
                        <Col sm={12} md={6} className="text-center">
                            <Pagination>
                                {links.map((link) => (
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
            <div className="d-grid gap-2">
                <Button variant="btn btn-outline-primary btn-lg m-5" method='get' href="/nuevoCliente"><strong>Nuevo cliente</strong></Button>
            </div>
        </Container>
    );
};

export default TablaClientes;
