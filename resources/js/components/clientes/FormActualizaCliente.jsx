import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import FlashMessage from "../partials/FlashMessage";

export default function FormActualizaCliente() {
    const { clientes, flash, auth } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, delete: destroy, processing, errors, } = useForm({
        nombre_fiscal: clientes.nombre_fiscal,
        nif: clientes.nif,
        nombre_comercial: clientes.nombre_comercial,
        url_escrituras: clientes.url_escrituras || '',
        url_cif: clientes.url_cif || '',
        anotaciones: clientes.anotaciones || '',
    });
    console.log(data)
    function handleSubmit(e) {
        e.preventDefault();
        // Verificar si se adjuntó el archivo url_escrituras
        if (data.url_escrituras instanceof File) {
            post(`/editarCliente/${clientes.id}`, {
                onSuccess: () => {
                    console.log(data);
                },
                data: data,});
        } else {
            // Si no se adjuntó el archivo url_escrituras, eliminar la propiedad del objeto de datos
            delete data.url_escrituras;
            post(`/editarCliente/${clientes.id}`, {
                onSuccess: () => {
                    console.log(data);
                },
                data: data,});
        }
        // Verificar si se adjuntó el archivo url_cif
        if (data.url_cif instanceof File) {
            post(`/editarCliente/${clientes.id}`, {
                onSuccess: () => {
                    console.log(data);
                },
                data: data,});
        } else {
            // Si no se adjuntó el archivo url_cif, eliminar la propiedad del objeto de datos
            delete data.url_cif;
            post(`/editarCliente/${clientes.id}`, {
                onSuccess: () => {
                    console.log(data);
                },
                data: data,});
        }
    }
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
            <FlashMessage success={flash.success} error={flash.error} />
            <Row>
                <Col xs="12" sm="12" md="12">
                    <p className="h1 mt-3">Modificación Cliente</p>
                    <Card className="shadow rounded">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h2"> Cliente {clientes.id}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="align-items-center">
                                    <Col xs="12" sm="12" md="12">
                                        <FloatingLabel label="NOMBRE FISCAL" className="mb-2">
                                            <Form.Control aria-label="nombre fiscal" type="text" name="nombre_fiscal" placeholder="Introduce el nombre fiscal" value={data.nombre_fiscal}
                                                onChange={(e) =>
                                                    setData("nombre_fiscal", e.target.value)
                                                } />
                                            {errors.nombre_fiscal && (<div className="alert alert-danger"> {errors.nombre_fiscal}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="12" md="4">
                                        <FloatingLabel label="NUM IDENTIFICACIÓN FISCAL" className="mb-2">
                                            <Form.Control aria-label="numero de identificación fiscal" type="text" name="nif" placeholder="Introduce el número de identificación fiscal" value={data.nif}
                                                onChange={(e) =>
                                                    setData("nif", e.target.value)
                                                } />
                                            {errors.nif && (<div className="alert alert-danger">{errors.nif}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="12" md="8">
                                        <FloatingLabel label="NOMBRE COMERCIAL" className="mb-2">
                                            <Form.Control aria-label="nombre comercial" type="text" name="nombre_comercial" placeholder="Introduce el nombre comercial" value={data.nombre_comercial}
                                                onChange={(e) =>
                                                    setData("nombre_comercial", e.target.value)
                                                } />
                                            {errors.nombre_comercial && (<div className="alert alert-danger">{errors.nombre_comercial}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="12" md="12">
                                        <FloatingLabel label="OBSERVACIONES" className="mb-2">
                                            <Form.Control as="textarea" rows={5} aria-label=" url_cif" name="anotaciones" placeholder="" value={data.anotaciones}
                                                onChange={(e) =>
                                                    setData("anotaciones", e.target.value)
                                                }></Form.Control>
                                        </FloatingLabel>
                                    </Col>
                                    <hr></hr>
                                    <p className="h4 mb-1">Documentación</p>
                                    <Row>
                                        <Col className="mb-3">
                                            <Button variant='dark' className="ms-3 shadow">
                                                {data.url_escrituras ? (
                                                    <a className="btn btn-dark" href={data.url_escrituras} target="_blank">
                                                        <i className="bi bi-file-earmark-pdf-fill text-success"></i> Escrituras</a>
                                                ) : (
                                                    <a className="btn btn-dark">
                                                        <i className="bi-exclamation-triangle-fill text-danger"></i>  Escrituras</a>
                                                )}
                                            </Button>
                                            <Button variant='dark' className="ms-3 shadow">
                                                {data.url_cif ? (
                                                    <a className="btn btn-dark" href={data.url_cif} target="_blank">
                                                        <i className="bi bi-file-earmark-pdf-fill text-success"></i> CIF</a>
                                                ) : (
                                                    <a className="btn btn-dark">
                                                        <i className="bi-exclamation-triangle-fill text-danger"></i>   CIF</a>
                                                )}
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Col xs="12" sm="12" md="6">
                                        <Form.Label className="mb-1">Escrituras:</Form.Label>
                                        <Form.Control aria-label="url escrituras" type="file" size="sm" name="url_escrituras"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_escrituras", file ? file : clientes.url_escrituras)
                                            }
                                            } />
                                        {errors.url_escrituras && (<div className="alert alert-danger"> {errors.url_escrituras}</div>)}
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <Form.Label className="mb-1">CIF de la empresa:</Form.Label>
                                        <Form.Control aria-label=" url_cif" type="file" size="sm" name="url_cif"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_cif", file ? file : clientes.url_cif)
                                            }
                                            } />
                                        {errors.url_cif && (<div className="alert alert-danger">{errors.url_cif}</div>)}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-2 shadow btn-lg" variant="success" onClick={handleSubmit} aria-label="Modificar los datos del cliente">Guardar registro</Button>
                            {auth.user.rol == true ? (
                                <>
                                    <Button className="m-3 shadow btn-lg" type="submit" variant="danger" aria-label="Eliminar los datos del cliente" onClick={() => handleDeleteClick(clientes.id)}>Eliminar</Button>
                                    <ModalConfirmacion
                                        show={showConfirmDeleteModal}
                                        onHide={() => {
                                            setIdToDelete(null);
                                            setShowConfirmDeleteModal(false);
                                        }}
                                        onConfirm={(urlAccion, idRegistro) => {
                                            destroy(`${urlAccion}/${idRegistro}`, {
                                                onSuccess: () => {
                                                    console.log("registro eliminado");
                                                },
                                            });
                                        }}
                                        title="¡ADVERTENCIA!"
                                        message="Se va a proceder a eliminar los datos de forma definitiva. ¿Está seguro que desea continuar?"
                                        urlAccion="/eliminarCliente"
                                        idRegistro={idToDelete} variant={'danger'} text={'Eliminar'} />
                                </>
                            ) : null}

                            <Button className="m-3 shadow btn-lg" variant="secondary" href={"/verCliente/" + clientes.id} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
