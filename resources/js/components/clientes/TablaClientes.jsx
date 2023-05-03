import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const TablaClientes = () => {
    // Se obtienen los datos de clientes y resultado del hook usePage y se almacenan en las variables clientes y resultado respectivamente
    const { clientes, resultado, flash } = usePage().props;
    // se crea el estado query utilizando la función useState y se establece su valor inicial como el valor de resultado, o una cadena vacía si no existe resultado
    const [query, setQuery] = useState(resultado || '');
    // función handleSearch que establece el valor del estado query como el valor del campo de búsqueda
    const handleSearch = (event) => { setQuery(event.target.value); }
    // variable resultadosBusqueda que filtra los clientes según su nombre fiscal, cif o nombre de administrador y los almacena en un array
    const resultadosBusqueda = clientes.filter((cliente) =>
        cliente.nombre_fiscal.toLowerCase().includes(query.toLowerCase())
        || cliente.nif.toLowerCase().includes(query.toLowerCase())
        || cliente.administrador.toLowerCase().includes(query.toLowerCase())
    );
    return (
        <Container>
             <div align="center">
                <Col sm={10}>
                    {flash.success && (
                        <div className="alert alert-success" role={"alert"}>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {flash.success}
                        </div>)}
                        {flash.error && (
                        <div className="alert alert-danger" role={"alert"}>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {flash.error}
                        </div>)}
                </Col>
            </div>
            <div className="container mt-5">
                <form action="/clientes/buscar" method="get" className="d-flex" role="search">
                    <input name="consulta" value={query} onChange={handleSearch} className="form-control" type="search" placeholder="Buscar" aria-label="Buscar cliente" />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>
            <p className="h3 m-3">Listado clientes</p>
            <Row>
                <Col sm={12} className="mt-3 pt-3 shadow ">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Nombre fiscal</th>
                                <th>CIF</th>
                                <th>Nombre administrador</th>
                                <th></th>
                            </tr>
                        </thead>
                        {resultadosBusqueda.map((cliente) => (
                            <tbody key={cliente.id}>
                                <tr>
                                    <td>{cliente.nombre_fiscal}</td>
                                    <td>{cliente.nif}</td>
                                    <td>{cliente.administrador}</td>
                                    <td>
                                        <Button className="btn btn-success m-1 shadow" size="sm" href={"/verCliente/" + cliente.id}>Seleccionar</Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </Row>
            <Button className="m-5 align-items-center justify-content-center" variant="primary" href="/nuevoCliente">
                Crear nuevo Cliente
            </Button>
        </Container>
    );
};

export default TablaClientes;
