import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaTelefono({ children }) {
    const { flash, telefonos, clientes } = usePage().props;
    // Estado local para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        telefono: telefonos.telefono,
        email: telefonos.email,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        put(
            `/editarTelefono/${telefonos.id}`,
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );
        setIsSubmitting(false);
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
                                <p className="h2"> Cliente {clientes}</p>
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
                                                aria-label="telefono"
                                                type="text"
                                                name="telefono"
                                                value={data.telefono}
                                                onChange={(
                                                    e // si cambia el valor se seteara el valor nuevo en el constructor
                                                ) =>
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
                                                type="email"
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
                                clasName="m-3 shadow"
                                variant="primary"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                aria-label="Guardar nueva empresa"
                            >
                                {isSubmitting
                                    ? "Guardando..."
                                    : "Guardar Registro"}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        </>
    );
}
