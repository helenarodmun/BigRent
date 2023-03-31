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

export default function TablaEdicionTelefonos() {
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
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
    };
    // Esta función es llamada cuando se confirma la eliminación. Hace una petición al servidor para eliminar el registro y cierra el Modal de confirmación.
    const handleDelete = () => {
        if (idToDelete !== null) {
            destroy(`/eliminarTelefono/${idToDelete}`, {
                onSuccess: () => {
                    console.log("registro eliminado");
                },
            });
            setIdToDelete(null); // Resetea el valor de idToDelete después de eliminar el registro
            setShowConfirmDeleteModal(false);
        }
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
                            <th></th>
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
                                           onClick={() => handleDeleteClick(telefonos.id)}
                                            as="button"
                                            className="h5 border-0 bi bi-trash3 text-danger m-1"
                                        />
                                    </OverlayTrigger>
                                    <Modal
                                        show={showConfirmDeleteModal}
                                        onHide={() => {
                                            setIdToDelete(null); // Resetea el valor de idToDelete si se cierra el Modal
                                            setShowConfirmDeleteModal(
                                                false
                                            );
                                        }}
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
                                                onClick={() => {
                                                    setIdToDelete(null); // Resetea el valor de idToDelete si se cancela la eliminación
                                                    setShowConfirmDeleteModal(
                                                        false
                                                    );
                                                }}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={handleDelete}
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
