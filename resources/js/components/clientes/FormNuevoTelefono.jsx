import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaDireccion({ children }) {
    const { flash, cliente } = usePage().props;
    console.log(cliente);
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        telefono: "",
        email: "",
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        post(
            "/nuevoTelefono/" + cliente.id,
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
            <div className="align-items-center justify-content-center accesibilidad-texto">
                {flash.message && <div class="alert">{flash.message}</div>}
                {children}
                <Col className="">
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title>
                                <p className="h2">
                                    Cliente {cliente.nombre_fiscal}
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={2}>
                                        <FloatingLabel
                                            label="TELÉFONO"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="teléfono"
                                                type="text"
                                                name="telefono"
                                                value={data.telefono}
                                                onChange={(e) =>
                                                    setData(
                                                        "telefono",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.telefono && (
                                                <div className="alert alert-danger">
                                                    {errors.telefono}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="CORREO ELECTRÓNICO"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="correo electrónico"
                                                type="text"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <div className="alert alert-danger">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                className="m-3 shadow"
                                variant="success"
                                onClick={handleSubmit}
                                aria-label="Guardar nueva teléfono"
                            >Guardar registro
                            </Button>
                            <Button
                                className="m-3 shadow"
                                variant="secondary"
                                href={'/editarCliente/' + cliente.id}
                                aria-label="Volver a la vista anterior"
                            >Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        </>
    );
}
