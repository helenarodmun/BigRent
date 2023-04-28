import { Link, usePage } from "@inertiajs/react";
import { Col, Table, Button } from "react-bootstrap";
import React from "react";
import TipInfo from "../partials/TipInfo";

export default function TablaAutorizados() {
    const { autorizados } = usePage().props;
    return (
        <>
            <Col className="shadow">
                <Col className="pt-3 shadow p-3 ">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Observaciones</th>
                                <th>Archivo </th>
                            </tr>
                        </thead>
                        {autorizados.map((autorizado) => (
                            <tbody key={autorizado.id}>
                                <tr>
                                    <td>{autorizado.nombre_persona_autorizada}</td>
                                    <td>{autorizado.dni}</td>
                                    <td>{autorizado.notas}</td>
                                    <td><a className="btn btn-dark" href={autorizado.url_dni} target="_blank">DNI</a></td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </Col>
        </>
    );
}