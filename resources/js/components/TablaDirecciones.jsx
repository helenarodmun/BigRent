import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Modal, Table } from "react-bootstrap";
import FormDirecciones from "./FormDirecciones";

export default function TablaDirecciones() {
    const { direcciones } = usePage().props;
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingDireccion, setEditingDireccion] = useState(null);
    const handleEdit = (id) => {
        const direccion = direcciones.find((d) => d.id === id);
        setEditingDireccion(direccion);
        setShowEditModal(true);
    };

    return (
        <div>
            <Col sm={12} className="mt-3 pt-3 shadow p-3 ">
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

            <>
                <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editar dirección</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormDirecciones
                            direccion={editingDireccion}
                            onSuccess={() => setShowEditModal(false)}
                        />
                    </Modal.Body>
                </Modal>
            </>
        </div>
    );
}
