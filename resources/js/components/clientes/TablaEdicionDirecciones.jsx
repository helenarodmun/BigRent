import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button, Col, Modal, Table } from "react-bootstrap";
import ModalEliminacion from "../partials/ModalEliminacion";
import Tooltip from "../partials/TipInfo";
export default function TablaEdicionDirecciones() {
    const { direcciones, clientes, flash } = usePage().props;
    const { delete: destroy } = useForm();
    //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
    };
    return (
        <>
            <Col className="shadow">
                {direcciones.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="me-4">
                            No existen direcciones asociadas a este cliente{" "}
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
                                <th>Dirección</th>
                                <th>Localidad</th>
                                <th>CP</th>
                                <th>Municipio</th>
                                <th>Provincia</th>
                                <th>Dirección pred.</th>
                                <th></th>
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
                                        <Tooltip
                                            content="Modificar dirección"
                                            direction="left"
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
                                        </Tooltip>
                                        <Tooltip
                                            content="Borrar dirección"
                                            direction="left"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        direcciones.id
                                                    )
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-trash3 text-danger m-1"
                                            />
                                        </Tooltip>
                                        <ModalEliminacion
                                            show={showConfirmDeleteModal}
                                            onHide={() => {
                                                setIdToDelete(null);
                                                setShowConfirmDeleteModal(false);
                                            }}
                                            onConfirm={(urlEliminar,idRegistro) => {
                                                destroy(
                                                    `${urlEliminar}/${idRegistro}`,
                                                    {
                                                        onSuccess: () => {
                                                            console.log( "registro eliminado");
                                                        },
                                                    }
                                                );
                                            }}
                                            title="¡ADVERTENCIA!"
                                            message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                            urlEliminar="/eliminarDireccion"
                                            idRegistro={idToDelete}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                )}
            </Col>
            <Tooltip content="Añadir nueva dirección" direction="right">
                <Link
                    method="get"
                    href={"/nuevaDireccion/" + clientes.id}
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </Tooltip>
        </>
    );
}
