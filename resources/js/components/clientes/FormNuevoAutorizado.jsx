import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    FloatingLabel,
} from "react-bootstrap";

export default function FormAutorizado() {
    const { flash, cliente } = usePage().props;    
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        nombre_persona_autorizada: "",
        dni: "",
        telefono1: "",
        telefono2: "",
        anotaciones: "",
        url_dni: ""     
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();        
        post(
            "/nuevoAutorizado/"+ cliente.id,
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );                
    }

    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
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
                <p className="h3 mt-3 ms-3 mb-0">Creación de nuevo autorizado de {cliente.nombre_fiscal}</p>
                <Row>
                <Col className="">
                    <Card className="shadow">
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="NOMBRE COMPLETO"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="nombre_persona_autorizada"
                                                type="text"
                                                name="nombre_persona_autorizada"
                                                placeholder="Introduce el nombre de la persona autorizada"
                                                value={data.nombre_persona_autorizada}
                                                onChange={(
                                                    e // si cambia el valor se seteara el valor nuevo en el constructor
                                                ) =>
                                                    setData(
                                                        "nombre_persona_autorizada",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.nombre_persona_autorizada && (
                                                <div className="alert alert-danger">
                                                    {errors.nombre_persona_autorizada}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="DNI"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="documento nacional de identidad"
                                                type="text"
                                                name="dni"
                                                placeholder="Introduce el número de DNI"
                                                value={data.dni}
                                                onChange={(e) =>
                                                    setData(
                                                        "dni",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.dni && (
                                                <div className="alert alert-danger">
                                                    {errors.dni}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="TELÉFONO 1"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="número teléfono"
                                                type="text"
                                                name="telefono1"
                                                placeholder="Introduce número de teléfono"
                                                value={data.telefono1}
                                                onChange={(e) =>
                                                    setData(
                                                        "telefono1",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.telefono1 && (
                                                <div className="alert alert-danger">
                                                    {errors.telefono1}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="TELÉFONO 2"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                aria-label="número teléfono"
                                                type="text"
                                                name="telefono2"
                                                placeholder="Introduce número de téfono"
                                                value={data.administrador}
                                                onChange={(e) =>
                                                    setData(
                                                        "telefono2",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.telefono2 && (
                                                <div className="alert alert-danger">
                                                    {errors.telefono2}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                  
                                    <Col sm={12}>
                                        <FloatingLabel
                                            label="OBSERVACIONES"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                            size="sm"
                                                as="textarea"
                                                rows={3}
                                                name="anotaciones"
                                                value={data.anotaciones}
                                                onChange={(e) =>
                                                    setData(
                                                        "anotaciones",
                                                        e.target.value
                                                    )
                                                }
                                            ></Form.Control>
                                            {errors.anotaciones && (
                                                <div className="alert alert-danger">
                                                    {errors.anotaciones}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <p className="h3">Documentación</p>
                                    <Col sm={4}>
                                        <Form.Label>DNI:</Form.Label>
                                        <Form.Control
                                        size="sm"
                                            aria-label="documento Nacional de identidad"
                                            type="file"
                                            name="url_dni"
                                            placeholder=""
                                            value={data.url_dni}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "url_dni",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.url_dni && (
                                            <div className="alert alert-danger">
                                                {errors.url_dni}
                                            </div>
                                        )}
                                    </Col>                                   
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                            size='lg'
                                clasName="m-3 shadow"
                                variant="primary"
                                onClick={handleSubmit}
                                aria-label="Guardar nuevo autorizado"
                            >Guardar registro
                            </Button>
                            <Button
                            size='lg'
                                className="m-3 shadow"
                                variant="secondary"
                                href={'/autorizados/'+ cliente.id}
                                aria-label="Volver a la vista anterior"
                            >Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>
        </>
    );
}
