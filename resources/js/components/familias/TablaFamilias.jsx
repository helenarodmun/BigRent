import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Col,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip,
} from "react-bootstrap";

export default function TablaDirecciones() {
    const { familias,  flash } = usePage().props;
    const { delete: destroy } = useForm();
    // retorna un componente "Tooltip" de Bootstrap que muestra el mensaje  cuando el usuario coloca el cursor sobre un botón
    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Añadir nueva familia
        </Tooltip>
    );
    const renderTooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Modificar familia
        </Tooltip>
    );
    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Borrar familia
        </Tooltip>
    );
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
            `/eliminarFamilia/${idToDelete}`,
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
        <>       
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
                        {familias.map((familia) => (
                            <tbody className="">
                                <tr key={familia.id}>
                                    <td>{familia.id}</td>
                                    <td>{familia.nombre}</td>
                                    <td>
                                        {/* OverlayTrigger envuelve el botón y la herramienta de información sobre herramientas y 
                            muestra la herramienta de información cuando el usuario pasa el cursor sobre el botón */}
                                        <OverlayTrigger
                                            placement="bottom" // coloca la herramienta de información sobre herramientas debajo del botón
                                            delay={{ show: 250, hide: 400 }} // establece un retraso antes de que se muestre la herramienta de información sobre herramientas
                                            overlay={renderTooltipEdit} // especifica qué función se usa para renderizar la herramienta de información sobre herramientas
                                        >
                                            <Link
                                                method="get"
                                                href={
                                                    "/editaFamilia/" +
                                                    familia.id
                                                }
                                                as="button"
                                                className="h5 border-0 bi bi-pencil-square text-primary m-1"
                                            />
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipDelete}
                                        >
                                            <button
                                                onClick={() => handleDeleteClick(familia.id)}
                                                as="button"
                                                className="h5 border-0 bi bi-trash3 text-danger m-1"
                                            />
                                        </OverlayTrigger>
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
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAdd}
            >
                <Link
                    method="get"
                    href="/nuevaFamilia"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </OverlayTrigger>
        </>
    );
}
