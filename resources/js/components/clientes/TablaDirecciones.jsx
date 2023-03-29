import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Table } from "react-bootstrap";

export default function TablaDirecciones({ children }) {
    const { direcciones, clientes, flash } = usePage().props;
    console.log(direcciones);
    // useForm es un helper diseñado para formularios
    const { data } = useForm({
        direccion: direcciones.direccion,
        cp: direcciones.cp,
        localidad: direcciones.localidad,
        municipio: direcciones.municipio,
        provincia: direcciones.provincia,
        predeterminada: direcciones.predeterminada,
    });
    return (
        <div>
            {flash.message && <div class="alert">{flash.message}</div>}
            {children}

            <div>
                <Col className="mt-3 pt-3 shadow p-3 ">
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
                                <th>Código Postal</th>
                                <th>Municipio</th>
                                <th>Provincia</th>
                                <th>Dirección predeterminada</th>
                            </tr>
                        </thead>
                        {direcciones.map((direcciones) => (
                            <tbody>
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
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </div>
        </div>
    );
}
