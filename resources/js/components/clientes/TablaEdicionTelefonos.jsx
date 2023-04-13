import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {  Col, Table } from "react-bootstrap";
import ModalEliminacion from "../partials/ModalEliminacion";
import TipInfo from "../partials/TipInfo";
export default function TablaEdicionTelefonos() {
    const { telefonos, clientes } = usePage().props;
    const { delete: destroy } = useForm();

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null); // Nuevo estado para almacenar la id del registro a eliminar
    //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
    const handleDeleteClick = (id) => {
        setShowConfirmDeleteModal(true);
        setIdToDelete(id); // Se establece la id del registro a eliminar
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
                                {telefonos.via_comunicacion == "T" ? (
                                    <td>Teléfono</td>
                                ) : (
                                    <td>Email</td>
                                )}
                                <td>{telefonos.contacto}</td>
                                {telefonos.tipo == "T" ? (
                                    <td>Titular</td>
                                ) : (
                                    <td>Autorizado</td>
                                )}
                                <td>
                                    <TipInfo
                                        content="Modificar contacto"
                                        direction="left"
                                    >
                                        <Link
                                            href={
                                                "/editarTelefono/" +
                                                telefonos.id
                                            }
                                            as="button"
                                            className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                        />
                                    </TipInfo>
                                    <TipInfo
                                        content="Borrar contacto"
                                        direction="left"
                                    >
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(telefonos.id)
                                            }
                                            as="button"
                                            className="h5 border-0 bi bi-trash3 text-danger m-1"
                                        />
                                    </TipInfo>
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
                                            urlEliminar="/eliminarTelefono"
                                            idRegistro={idToDelete}
                                        />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Col>
            <TipInfo content="Añadir nuevo contacto" direction="right">
                <Link
                    method="get"
                    href={"/nuevoTelefono/" + clientes.id}
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </div>
    );
}
