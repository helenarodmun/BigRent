import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Col,
    Container,
    Table,
} from "react-bootstrap";
import ModalEliminacion from "../partials/ModalEliminacion";
import TipInfo from "../partials/TipInfo";

export default function TablaMarcas() {
    const { marcas,  flash } = usePage().props;
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
                                <th>Id</th>
                                <th>Nombre</th>
                                <th></th>
                            </tr>
                        </thead>
                        {marcas.map((marca) => (
                            <tbody className="">
                                <tr key={marca.id}>
                                    <td>{marca.id}</td>
                                    <td>{marca.denominacion}</td>
                                    <td>
                                 <TipInfo content='Modificar marca' direction='left' >
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarMarca/" +  marca.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </TipInfo>
                                        <TipInfo content='Eliminar marca' direction='left' >
                                            <button
                                                onClick={() => handleDeleteClick(marca.id)}
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
                                            urlEliminar="/eliminarMarca"
                                            idRegistro={idToDelete}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
            </Col>
            <TipInfo content='Añadir nueva fmarca' direction='right' >
                <Link
                    method="get"
                    href="/nuevaMarca"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </Container>
    );
}
