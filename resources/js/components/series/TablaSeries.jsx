import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Col,
    Container,
    Table,
} from "react-bootstrap";
import ModalEliminacion from "../partials/ModalEliminacion";
import TipInfo from "../partials/TipInfo";

export default function TablaSubFamilias() {
    const { series, tiendas, flash } = usePage().props;
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
                                <th>Máquina</th>
                                <th>Número serie</th>
                                <th>Horometro</th>
                                <th>Hora inicio</th>
                                <th>Disponible</th>
                                <th></th>
                            </tr>
                        </thead>
                        {series.map((serie) => (                           
                            <tbody className="">
                                <tr key={serie.id}>
                                    <td>{serie.maquina.descripcion}</td>
                                    <td>{serie.numero_serie}</td> 
                                    {serie.horometro === 0 ? (
                                        <td><strong>NO</strong></td>
                                    ) : (
                                        <td><strong>SÍ</strong></td>
                                    )}
                                    <td>{serie.hora_inicio}</td>
                                    {serie.disponible === 0 ? (
                                        <td className="text-danger"><strong>NO</strong></td>
                                    ) : (
                                        <td className="text-success"><strong>SÍ</strong></td>
                                    )}
                                    <td>
                                      <TipInfo content='Modificar serie' direction='left'>
                                            <Link
                                                method="get"
                                                href={
                                                    "/editarSerie/" +  serie.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </TipInfo>
                                        <TipInfo content='Borrar serie' direction='left'>
                                            <button
                                                onClick={() => handleDeleteClick(serie.id)}
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
                                            urlEliminar="/eliminarSerie"
                                            idRegistro={idToDelete}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
            </Col>
            <TipInfo content='Añadir nueva serie' direction='right'>
                <Link
                    method="get"
                    href="/nuevaSerie"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </TipInfo>
        </Container>
    );
}
