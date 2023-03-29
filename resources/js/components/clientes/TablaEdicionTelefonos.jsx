import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Col,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";
import { Modal } from "react-bootstrap";

export default function TablaTelefonos() {
    const { telefonos, clientes } = usePage().props;

    const { delete: destroy } = useForm();
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
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmDeleteModal(true);
    };
    const handleDelete = (id) => {
        destroy(
            `/eliminarTelefono/${id}`,
            {
                onSuccess: () => {
                    console.log("registro eliminado");
                },
            },
            id
        );
        setShowConfirmDeleteModal(false);
    };
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
                            <th>Vía de comunicación</th>
                            <th>Contacto</th>
                            <th>Persona de contacto</th>
                        </tr>
                    </thead>
                    {telefonos.map((telefonos) => (
                        <tbody>
                            <tr key={telefonos.id}>
                                {telefonos.via_comunicacion == 'T' ? (
                                    <td>Teléfono</td>
                                ):(
                                    <td>Email</td>
                                )}
                                <td>{telefonos.contacto}</td>
                                {telefonos.tipo == 'T' ? (
                                    <td>Titular</td>
                                ):(
                                    <td>Autorizado</td>
                                )}
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
                                        <button
                                            onClick={handleDeleteClick}
                                            as="button"
                                            className="h5 border-0 bi bi-trash3 text-danger m-1"
                                        />
                                    </OverlayTrigger>
                                    <Modal
                                        show={showConfirmDeleteModal}
                                        onHide={() =>
                                            setShowConfirmDeleteModal(false)
                                        }
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                ¡ADVERTENCIA!
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Se va a proceder a eliminar los
                                            datos de forma definitiva.
                                            <br />
                                            ¿Está seguro que desea continuar?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    setShowConfirmDeleteModal(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    handleDelete(telefonos.id);
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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
