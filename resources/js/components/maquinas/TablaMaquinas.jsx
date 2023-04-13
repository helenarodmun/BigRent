import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Col,
    Container,
    Modal,
    Table,
} from "react-bootstrap";
import TipInfo from "../partials/TipInfo";

export default function TablaSubFamilias() {
    const { maquinas,  flash } = usePage().props;
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
        destroy(
            `/eliminarMaquina/${idToDelete}`,
            {
                onSuccess: () => {
                    console.log("registro eliminado");
                },
            },
        );
        setIdToDelete(null); // Resetea el valor de idToDelete después de eliminar el registro
            setShowConfirmDeleteModal(false);
        }
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
                            <tbody className="">
                                <tr key={maquina.id}>
                                    <td>{maquina.subfamilia.descripcion}</td>
                                    <td>{maquina.referencia}</td> 
                                    <td>{maquina.marca}</td>
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
