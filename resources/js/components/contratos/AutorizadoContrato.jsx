import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {  Col, Table } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function TablaEdicionAutorizados() {
    const { cliente } = usePage().props;
    return (
        <>
            <Col className="shadow">
                <p className="h4 m-3">Autorizados</p>
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
                                    <Link
                                        method="get"
                                        href=''
                                        as="button"
                                        className="h5 border-0 bi bi-check-circle text-success m-1"
                                    />
                                    </TipInfo>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
            </Col>
        </>
    );
}