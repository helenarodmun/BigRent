import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Col, Container, Table, } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";

export default function TablaFamilias() {
    const { familias, flash } = usePage().props;
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
        <Container>
            <Col className="shadow">
                <Table striped bordered hover className="shadow" size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    {familias.map((familia) => (
                        <tbody key={familia.id}>
                            <tr>
                                <td>{familia.id}</td>
                                <td>{familia.nombre}</td>
                                <td>
                                    <TipInfo content='Modificar familia' direction='left' >
                                        <Link method="get" href={"/editarFamilia/" + familia.id} as="button" className="h5 border-0 bi bi-pencil-square text-primary m-1" />
                                    </TipInfo>
                                    <TipInfo content='Eliminar familia' direction='left' >
                                        <button onClick={() => handleDeleteClick(familia.id)} as="button" className="h5 border-0 bi bi-trash3 text-danger m-1" />
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
                                        urlAccion="/eliminarFamilia"
                                        idRegistro={idToDelete} variant={'danger'} text={'Eliminar'}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Col>
            <TipInfo content='Añadir nueva familia' direction='right' >
                <Link method="get" href="/nuevaFamilia" as="button" className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1" />
            </TipInfo>
        </Container>
    );
}
