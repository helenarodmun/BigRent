import { Link, usePage } from "@inertiajs/react";
import {
    Col,
    Container,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";

export default function TablaTelefonos() {
    const { telefonos, clientes } = usePage().props;
    console.log(clientes);
    // retorna un componente "Tooltip" de Bootstrap que muestra el mensaje  cuando el usuario coloca el cursor sobre un botón
    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Añadir nuevo contacto
        </Tooltip>
    );
    const renderTooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Modificar contacto
        </Tooltip>
    );
    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Borrar contacto
        </Tooltip>
    );
    return (
        <div>
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
                            <th>Teléfono</th>
                            <th>Correo electrónico</th>
                        </tr>
                    </thead>
                    {telefonos.map((telefonos) => (
                        <tbody>
                            <tr key={telefonos.id}>
                                <td>{telefonos.telefono}</td>
                                <td>{telefonos.email}</td>
                                <td>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipEdit}
                                    >
                                        <Link
                                            href={
                                                "/editarTelefono/" +
                                                telefonos.id
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
                                                "/eliminarTelefono/" +
                                                telefonos.id
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
            </Col>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAdd}
            >
                <Link
                    method="get"
                    href={"/nuevoTelefono/" + clientes.id}
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </OverlayTrigger>
        </div>
    );
}
