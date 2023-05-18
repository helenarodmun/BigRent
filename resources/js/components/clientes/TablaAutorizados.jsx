import { Link, usePage } from "@inertiajs/react";
import { Col, Table, Button } from "react-bootstrap";
import React from "react";
import TipInfo from "../partials/TipInfo";

export default function TablaAutorizados() {
    const { autorizados } = usePage().props;
    return (
        <>
            <Col className="shadow rounded">
                <Col className="pt-3 shadow p-3 rounded">
                    <Table striped bordered hover className="shadow" size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Autorizado</th>
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
                                    <td>
                                        <Button variant='dark' className="ms-3 shadow">
                                            {autorizado.url_dni ? (
                                                <a className="btn btn-dark" href={autorizado.url_dni} target="_blank">
                                                    <i className="bi bi-file-earmark-pdf-fill text-success"></i> DNI
                                                </a>
                                            ) : (
                                                <a className="btn btn-dark" >
                                                    <i className="bi-exclamation-triangle-fill text-danger"></i>    DNI
                                                </a>
                                            )}
                                        </Button></td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </Col>
        </>
    );
}