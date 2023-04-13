import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button, Col, Modal, Table } from "react-bootstrap";
import TipInfo from "../partials/TipInfo";
export default function TablaEdicionAutorizados() {
    const { autorizados, clientes, flash } = usePage().props;
    const { delete: destroy } = useForm();
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
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
            destroy(`/eliminarAutorizado/${idToDelete}`, {
                onSuccess: () => {
                    console.log("registro eliminado");
                },
            });
            setIdToDelete(null); // Resetea el valor de idToDelete después de eliminar el registro
            setShowConfirmDeleteModal(false);
        }
    };
    return (
        <>
            <Col className="shadow">
                <h1 className="m-3">Autorizados</h1>
                {autorizados.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="me-4">
                            No existen personas autorizadas asociadas a este
                            cliente{" "}
                        </p>
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
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Observaciones</th>
                                <th>Archivo DNI</th>
                                <th></th>
                            </tr>
                        </thead>
                        {autorizados.map((autorizado) => (
                            <tbody className="">
                                <tr key={autorizado.id}>
                                    <td>
                                        {autorizado.nombre_persona_autorizada}
                                    </td>
                                    <td>{autorizado.dni}</td>
                                    <td>{autorizado.notas}</td>
                                    <td>{autorizado.url_dni}</td>
                                    <td>
                                        <TipInfo
                                            content="Modificar autorizado"
                                            direction="left"
                                        >
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarAutorizado/" +
                                                    autorizado.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </TipInfo>
                                        <TipInfo
                                            content="Borrar autorizado"
                                            direction="left"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        autorizado.id
                                                    )
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-trash3 text-danger m-1"
                                            />
                                        </TipInfo>
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
                                                ¿Está seguro que desea
                                                continuar?
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
                )}
            </Col>
            <TipInfo content="Añadir nuevo autorizado" direction="right">
                <Link
                    method="get"
                    href={"/nuevoAutorizado/" + clientes.id}
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </>
    );
}
