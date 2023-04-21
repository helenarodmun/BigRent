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
    const { maquinas,  flash } = usePage().props;
    console.log(maquinas)
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
                                <th>Subfamilia</th>
                                <th>Referencia</th>
                                <th>Marca</th>
                                <th>Artículo</th>
                                <th>Manual</th>
                                <th>Ficha</th>
                                <th></th>
                            </tr>
                        </thead>
                        {maquinas.map((maquina) => (
                            <tbody key={maquina.id}>
                                <tr>
                                    <td>{maquina.subfamilia.descripcion}</td>
                                    <td>{maquina.referencia}</td> 
                                    <td>{maquina.marca.denominacion}</td>
                                    <td>{maquina.descripcion}</td>
                                    <td>{maquina.url_manual}</td>
                                    <td>{maquina.ur_ficha}</td>
                                    <td>
                                     <TipInfo content='Modificar máquina' direction='left'>
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarMaquina/" +  maquina.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </TipInfo>
                                        <TipInfo content='Borrar máquina' direction='left'>
                                            <button
                                                onClick={() => handleDeleteClick(maquina.id)}
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
                                            urlAccion="/eliminarMaquina"
                                            idRegistro={idToDelete}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
            </Col>
            <TipInfo content='Añadir nueva máquina' direction='left'>
                <Link
                    method="get"
                    href="/nuevaMaquina"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </Container>
    );
}
