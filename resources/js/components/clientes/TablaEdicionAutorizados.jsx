import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Table } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
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
    return (
        <>
            <Col className="shadow">
                <h1 className="m-3">Autorizados</h1>
                <Table striped bordered hover className="shadow" size="sm" responsive>
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
                        <tbody key={autorizado.id} className="">
                            <tr key={autorizado.id}>
                                <td>{autorizado.nombre_persona_autorizada}</td>
                                <td>{autorizado.dni}</td>
                                <td>{autorizado.notas}</td>
                                <td>{autorizado.url_dni}</td>
                                <td>
                                    <TipInfo content="Modificar autorizado" direction="left">
                                        <Link method="get" href={"/editarAutorizado/" + autorizado.id} as="button" className="h5 border-0 bi bi-pencil-square text-primary m-1" />
                                    </TipInfo>
                                    <TipInfo content="Borrar autorizado" direction="left">
                                        <button onClick={() => handleDeleteClick(autorizado.id)} as="button" className="h5 border-0 bi bi-trash3 text-danger m-1" />
                                    </TipInfo>
                                    <ModalConfirmacion show={showConfirmDeleteModal}
                                        onHide={() => {
                                            setIdToDelete(null);
                                            setShowConfirmDeleteModal(false);
                                        }}
                                        onConfirm={(urlAccion, idRegistro) => {
                                            destroy(
                                                `${urlAccion}/${idRegistro}`,
                                                {
                                                    onSuccess: () => {
                                                        console.log("registro eliminado");
                                                    },
                                                }
                                            );
                                        }}
                                        title="¡ADVERTENCIA!"
                                        message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                        urlAccion="/eliminarAutorizado"
                                        idRegistro={idToDelete} variant={'danger'} text={'Eliminar'}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Col>
            <TipInfo content="Añadir nuevo autorizado" direction="right">
                <Link method="get" href={"/nuevoAutorizado/" + clientes.id} as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
            </TipInfo>
        </>
    );
}
