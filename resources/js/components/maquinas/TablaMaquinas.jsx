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

export default function TablaSubFamilias() {
    const { maquinas,  flash } = usePage().props;
    const { delete: destroy } = useForm();
    // retorna un componente "Tooltip" de Bootstrap que muestra el mensaje  cuando el usuario coloca el cursor sobre un botón
    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Añadir nueva máquina
        </Tooltip>
    );
    const renderTooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Modificar máquina
        </Tooltip>
    );
    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Borrar máquina
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
                                <th>Subfamilia</th>
                                <th>Referencia</th>
                                <th>Marca</th>
                                <th>Artículo</th>
                                <th>Stock</th>
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
                                    <td>{maquina.inventario}</td>
                                    <td>{maquina.url_manual}</td>
                                    <td>{maquina.ur_ficha}</td>
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
                                                    "/editarMaquina/" +  maquina.id
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
                                                onClick={() => handleDeleteClick(maquina.id)}
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
                    href="/nuevaMaquina"
                    as="button"
                    className="iconoSuma h3 border-0 bi bi-plus-square text-success m-1"
                />
            </OverlayTrigger>
        </>
    );
}
