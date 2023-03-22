import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Modal, Table } from "react-bootstrap";
import FormDirecciones from "./FormDirecciones";

export default function TablaDirecciones() {
    const { direcciones } = usePage().props;


    return (
        <>
            <Col className="shadow">
                <Table
                    striped
                    bordered
                    hover
                    className="shadow"
                    size="sm"
                    responsive
                >
                    <thead>
                        <tr>
                            <th>Dirección</th>
                            <th>Localidad</th>
                            <th>CP</th>
                            <th>Municipio</th>
                            <th>Provincia</th>
                            <th>Dirección pred.</th>
                        </tr>
                    </thead>
                    {direcciones.map((direcciones) => (
                        <tbody className="">
                            <tr key={direcciones.id}>
                                <td>{direcciones.direccion}</td>
                                <td>{direcciones.localidad}</td>
                                <td>{direcciones.cp}</td>
                                <td>{direcciones.municipio}</td>
                                <td>{direcciones.provincia}</td>
                                {direcciones.predeterminada == 0 ? (
                                    <td>No</td>
                                ) : (
                                    <td>Sí</td>
                                )}
                                <td>
                                    <Link
                                        method="get"
                                        href={
                                            "/editarDireccion/" + direcciones.id
                                        }
                                        as="button"
                                        className="bi bi-pencil-square text-success m-1"
                                    />
                                    <Link
                                        method="delete"
                                        href={
                                            "/eliminarDireccion/" +
                                            direcciones.id
                                        }
                                        as="button"
                                        className="bi bi-trash3 text-danger m-1"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Col>
        </>
    );
}
