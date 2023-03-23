import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Col,
    Container,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";
import FormDirecciones from "./FormDirecciones";

export default function TablaDirecciones() {
    const { direcciones, clientes } = usePage().props;
    // retorna un componente "Tooltip" de Bootstrap que muestra el mensaje  cuando el usuario coloca el cursor sobre un botón
    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Añadir nueva direción
        </Tooltip>
    );
    const renderTooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Modificar dirección
        </Tooltip>
    );
    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Borrar dirección
        </Tooltip>
    );
    return (
        <>
            <Col className="shadow">
                {direcciones.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p>No existen direcciones asociadas a este cliente </p>
                        <Button
                            className="btn btn-primary"
                            method="get"
                            href={"/nuevaDireccion/" + clientes.id}
                        >
                            Agregar dirección
                        </Button>
                    </div>
                ) : (
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
                                        {/* OverlayTrigger envuelve el botón y la herramienta de información sobre herramientas y 
                            muestra la herramienta de información cuando el usuario pasa el cursor sobre el botón */}
                                        <OverlayTrigger
                                            placement="bottom" // coloca la herramienta de información sobre herramientas debajo del botón
                                            delay={{ show: 250, hide: 400 }} // establece un retraso antes de que se muestre la herramienta de información sobre herramientas
                                            overlay={renderTooltipEdit} // especifica qué función se usa para renderizar la herramienta de información sobre herramientas
                                        >
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarDireccion/" +
                                                    direcciones.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipDelete}
                                        >
                                            <Link
                                                method="delete"
                                                href={
                                                    "/eliminarDireccion/" +
                                                    direcciones.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-trash3 text-danger m-1"
                                            />
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                )}
            </Col>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAdd}
            >
                <Link
                    method="get"
                    href={"/nuevaDireccion/" + clientes.id}
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </OverlayTrigger>
        </>
    );
}
