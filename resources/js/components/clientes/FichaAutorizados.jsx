import { usePage, Link, useForm } from "@inertiajs/react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import React, { useState } from "react";


export default function FichaAutorizados() {
    const { flash, cliente, autorizados } = usePage().props;
    console.log(cliente)
      //estado  y una función para actualizarlo llamada que controla la visualización de modal de confirmación.
      const { delete: destroy } = useForm();
      const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
      //función es llamada cuando se hace clic en el botón de eliminar, la cual establece el valor de showConfirmDeleteModal en true.
          const handleDeleteClick = () => {
              setShowConfirmDeleteModal(true);
          };
          // Esta función es llamada cuando se confirma la eliminación. Hace una petición al servidor para eliminar el registro y cierra el Modal de confirmación.
          const handleDelete = (id) => {
              destroy(
                  `/eliminarAutorizado/${id}`,
                  {
                      onSuccess: () => {
                          console.log("registro eliminado");
                      },
                  },
                  id
              );
              setShowConfirmDeleteModal(false);
          };
    return (
        <>
            <Container className="">
                {flash.mensaje && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.mensaje}
                    </div>
                )}                
                <h1 className="m-3">Autorizados</h1>
                <Button
                className="m-3 align-items-center justify-content-center shadow"
                variant="success"
                href={"/nuevoAutorizado/" + cliente.id}
            >
                Agregar autorizado
            </Button>
                 {autorizados.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="me-4">No existen personas autorizadas asociadas a este cliente </p><br/>
                    
                    </div>
                ) : (
                <Row>
                    {autorizados.map((autorizado) => (
                        <Col
                            key={autorizado.id}
                            md={6}
                            className="mt-3 pt-3 shadow  p-3 "
                        >
                            <Card className="shadow">
                                <Card.Header className="h3">
                                    Nombre: {autorizado.nombre}
                                    <br />
                                    DNI: {autorizado.dni}
                                </Card.Header>
                                <Card.Body>
                                    <span>
                                        Teléfono - 1: {autorizado.telefono1}
                                    </span>
                                    <br />
                                    <span>
                                        Teléfono - 2: {autorizado.telefono2}
                                    </span>
                                    <br />
                                    <span>
                                        Observaciones: {autorizado.anotaciones}
                                    </span>
                                    <br />
                                    <span>
                                        Documento DNI: {autorizado.url_dni}
                                    </span>
                                    <br />
                                </Card.Body>
                                <Card.Footer className="text-muted">                               
                                            <Button
                                            className="m-3 shadow"
                                            variant="primary"
                                                method="get"
                                                href={
                                                    "/editarAutorizado/" +
                                                    autorizado.id
                                                }
                                             
                                            >Modificar</Button>
                                            <Button
                                                onClick={handleDeleteClick}
                                                as="button"
                                                className="m-3 shadow"
                                                variant='danger'
                                            >Eliminar</Button>
                                        <Modal
                                            show={showConfirmDeleteModal}
                                            onHide={() =>
                                                setShowConfirmDeleteModal(false)
                                            }
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
                                                    onClick={() =>
                                                        setShowConfirmDeleteModal(
                                                            false
                                                        )
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        handleDelete(
                                                            autorizado.id
                                                        );
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
                )}
            </Container>
        </>
    );
}