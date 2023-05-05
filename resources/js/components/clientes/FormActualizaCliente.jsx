import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";
import ModalConfirmacion from "../partials/ModalConfirmacion";

export default function FormActualizaCliente() {
    const { clientes, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, delete: destroy, processing, errors, } = useForm({
        nombre_fiscal: clientes.nombre_fiscal,
        nif: clientes.nif,
        nombre_comercial: clientes.nombre_comercial,
        administrador: clientes.administrador,
        dni_administrador: clientes.dni_administrador,
        url_escrituras: null,
        url_dni_administrador: null,
        url_cif: null,
        anotaciones: clientes.anotaciones || '',
    });
    console.log(data)
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();// Crea un objeto FormData para enviar los datos del formulario
        // Agrega los campos correspondientes al formData con el valor de data
        formData.append('nombre_fiscal', data.nombre_fiscal);
        formData.append('nif', data.nif);
        formData.append('nombre_comercial', data.nombre_comercial);
        formData.append('administrador', data.administrador);
        formData.append('dni_administrador', data.dni_administrador);
        // Verificar si se ha seleccionado un archivo para cada campo y agregarlo al formData
        // Si se ha seleccionado un archivo, se agrega al formData, si no se agrega el valor existente de cliente al formData
        if (data.url_escrituras) {
            formData.append('url_escrituras', data.url_escrituras);
        } else {
            formData.append('url_escrituras', clientes.url_escrituras);
        }

        if (data.url_dni_administrador) {
            formData.append('url_dni_administrador', data.url_dni_administrador);
        } else {
            formData.append('url_dni_administrador', clientes.url_dni_administrador);
        }

        if (data.url_cif) {
            formData.append('url_cif', data.url_cif);
        } else {
            formData.append('url_cif', clientes.url_cif);
        }
        post(
            `/editarCliente/${clientes.id}`,
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );
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
            <Row>
            <Col xs="12" sm="12" md="12">
                <p className="h1 mt-3">Modificación Cliente</p>
                <Card className="shadow">
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
                                <Col xs="12" sm="12" md="8">
                                    <FloatingLabel label="ADMINISTRADOR" className="mb-2">
                                        <Form.Control aria-label="Administrador de la empresa" type="text" name="administrador" placeholder="Introduce el nombre del administrador de la empresa" value={data.administrador}
                                            onChange={(e) =>
                                                setData("administrador", e.target.value)
                                            } />
                                        {errors.administrador && (<div className="alert alert-danger">{errors.administrador}</div>)}
                                    </FloatingLabel>
                                </Col>
                                <Col xs="12" sm="12" md="4">
                                    <FloatingLabel label="NIF" className="mb-2">
                                        <Form.Control aria-label="dni del administrador" type="text" name="dni_administrador" placeholder="Introduce el DNI del administrador de la empresa" value={data.dni_administrador}
                                            onChange={(e) =>
                                                setData("dni_administrador", e.target.value)
                                            } />
                                        {errors.dni_administrador && (<div className="alert alert-danger">{errors.dni_administrador} </div>)}
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
                                    <Form.Label className="mb-1">DNI Administrador:</Form.Label>
                                    <Form.Control aria-label="url dni administrador" type="file" size="sm" name="url_dni_administrador"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setData("url_dni_administrador", file ? file : clientes.url_dni_administrador)
                                        }
                                        } />
                                    {errors.url_dni_administrador && (<div className="alert alert-danger">{errors.url_dni_administrador}</div>)}
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
                        <Button className="m-3 shadow btn-lg" variant="secondary" href={"/verCliente/" + clientes.id} aria-label="Volver a la vista anterior">Cancelar</Button>
                    </Card.Footer>
                </Card>
            </Col>
            </Row>
    );
}
