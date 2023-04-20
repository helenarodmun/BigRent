import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Col,
    Container,
    Table,
} from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import TipInfo from "../partials/TipInfo";

export default function TablaSubFamilias() {
    const { subfamilias,  flash } = usePage().props;
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
                                <th>Familia</th>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Precio / semana</th>
                                <th>Precio /día</th>
                                <th>Importe fianza</th>
                                <th></th>
                            </tr>
                        </thead>
                        {subfamilias.map((subfamilia) => (
                            <tbody className="">
                                <tr key={subfamilia.id}>
                                    <td>{subfamilia.familia.nombre}</td>
                                    <td>{subfamilia.id}</td> 
                                    <td>{subfamilia.descripcion}</td>
                                    <td>{subfamilia.precio_semana}</td>
                                    <td>{subfamilia.precio_dia}</td>
                                    <td>{subfamilia.fianza}</td>
                                    <td>
                                       <TipInfo content='Modificar subfamilia' direction='left'>
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarSubfamilia/" +  subfamilia.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </TipInfo>
                                        <TipInfo content='Borrar subfamilia' direction='left'>
                                            <button
                                                onClick={() => handleDeleteClick(subfamilia.id)}
                                                as="button"
                                                className="h5 border-0 bi bi-trash3 text-danger m-1"
                                            />
                                        </TipInfo>
                                        <ModalConfirmacion
                                            show={showConfirmDeleteModal}
                                            onHide={() => {
                                                setIdToDelete(null);
                                                setShowConfirmDeleteModal(false);
                                            }}
                                            onConfirm={(urlAccion,idRegistro) => {
                                                destroy(
                                                    `${urlAccion}/${idRegistro}`,
                                                    {
                                                        onSuccess: () => {
                                                            console.log( "registro eliminado");
                                                        },
                                                    }
                                                );
                                            }}
                                            title="¡ADVERTENCIA!"
                                            message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                            urlAccion="/eliminarSubfamilia"
                                            idRegistro={idToDelete}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
            </Col>
            <TipInfo content='Añadir nueva subfamilia' direction='right'>
                <Link
                    method="get"
                    href="/nuevaSubfamilia"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </Container>
    );
}
