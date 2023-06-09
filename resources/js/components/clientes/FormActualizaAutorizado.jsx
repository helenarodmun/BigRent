import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaAutorizado({ children }) {
    const { autorizado, cliente } = usePage().props;
    console.log(autorizado);
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        nombre_persona_autorizada: autorizado.nombre_persona_autorizada,
        dni: autorizado.dni,
        notas: autorizado.notas || '',
        url_dni: autorizado.url_dni || '',
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        if (data.url_dni instanceof File) {
            // Si `url_dni` es un archivo, ejecuta la petición con el archivo adjunto
            post(
                `/editarAutorizado/${autorizado.id}`,
                {
                    onSuccess: () => { console.log(data); },
                    data: data,
                }
            );
        } else {
            // Si `url_dni` no es un archivo, elimínalo del objeto de datos antes de enviarlo
            delete data.url_dni;
            post(
                `/editarAutorizado/${autorizado.id}`,
                {
                    onSuccess: () => { console.log(data); },
                    data: data,
                }
            );
        }
    }
    return (
        <>
            <div className="align-items-center justify-content-center accesibilidad-texto">
                <Col className="">
                    <Card className="shadow rounded">
                        <Card.Header>
                            <Card.Title>
                                <p className="h2">Cliente {cliente.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={9}>
                                        <FloatingLabel label="NOMBRE PERSONA AUTORIZADA" className="mb-3">
                                            <Form.Control aria-label="Nombre persona autorizada" type="text" name="nombre_persona_autorizada" value={data.nombre_persona_autorizada}
                                                onChange={(e // si cambia el valor se seteara el valor nuevo en el constructor
                                                ) => setData("nombre_persona_autorizada", e.target.value)
                                                } />
                                            {errors.nombre_persona_autorizada && (
                                                <div className="alert alert-danger">{errors.nombre_persona_autorizada}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel label="DNI" className="mb-3">
                                            <Form.Control aria-label="dni persona autorizada" type="text" name="dni" value={data.dni}
                                                onChange={(e) => setData("dni", e.target.value)} />
                                            {errors.dni && (
                                                <div className="alert alert-danger">{errors.dni}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={12}>
                                        <FloatingLabel label="OBSERVACIONES" className="mb-3">
                                            <Form.Control aria-label="dnobservaciones" type="text" name="notas" value={data.notas}
                                                onChange={(e) => setData("notas", e.target.value)} />
                                            {errors.notas && (
                                                <div className="alert alert-danger"> {errors.notas}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Row>
                                        <Col className="mb-3">
                                        <Button variant='dark' className="ms-3 shadow">
                                            {autorizado.url_dni ? (
                                                <a className="btn btn-dark" href={autorizado.url_dni} target="_blank">
                                                    <i className="bi bi-file-earmark-pdf-fill text-success"></i> DNI
                                                </a>
                                            ) : (
                                                <a className="btn btn-dark" >
                                                    <i className="bi-exclamation-triangle-fill text-danger"></i>    DNI
                                                </a>
                                            )}
                                        </Button>
                                        </Col>
                                    </Row>
                                    <Col xs="12" sm="6" md="6">
                                        <Form.Label>Archivo DNI:</Form.Label>
                                        <Form.Control
                                            size="sm" aria-label="url dni" type="file" name="url_dni" 
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_dni", file ? file : autorizado.url_dni)
                                                } }/>
                                        {errors.url_dni && (
                                            <div className="alert alert-danger">{errors.url_dni}</div>)}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer >
                            <Button className="m-3 shadow btn-lg" variant="success" onClick={handleSubmit} aria-label="Guardar nuevo autorizado">Guardar registro</Button>
                            <Button className="m-3 shadow btn-lg" variant="secondary" href={'/editarCliente/' + cliente.id} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        </>
    );
}
