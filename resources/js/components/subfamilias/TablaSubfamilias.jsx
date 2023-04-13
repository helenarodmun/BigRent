import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Col,
    Container,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";
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
    // Esta función es llamada cuando se confirma la eliminación. Hace una petición al servidor para eliminar el registro y cierra el Modal de confirmación.
    const handleDelete = () => {
         if (idToDelete !== null) {
        destroy(
            `/eliminarSubfamilia/${idToDelete}`,
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
