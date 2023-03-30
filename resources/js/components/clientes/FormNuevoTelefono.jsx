import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaDireccion({ children }) {
    const { cliente } = usePage().props;
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
                                <Row>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="CONTACTO"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="datos de contacto"
                                                type="text"
                                                name="contacto"
                                                value={data.contacto}
                                                onChange={(e) =>
                                                    setData(
                                                        "contacto",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.contacto && (
                                                <div className="alert alert-danger">
                                                    {errors.contacto}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="TIPO DE CONTACTO"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                                size="sm"
                                                aria-label="vía de comunicación"
                                                as="select"
                                                name="via_comunicacion"
                                                value={data.via_comunicacion}
                                                onChange={(e) =>
                                                    setData(
                                                        "via_comunicacion",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione tipo de
                                                    contacto...
                                                </option>
                                                <option value="T">
                                                    Teléfono
                                                </option>
                                                <option value="C">
                                                    Correo electrónico
                                                </option>
                                            </Form.Select>
                                            {errors.via_comunicacion && (
                                                <div className="alert alert-danger">
                                                    {errors.via_comunicacion}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="PERSONA DE CONTACTO"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                                size="sm"
                                                aria-label="persona de contacto"
                                                as="select"
                                                name="tipo"
                                                value={data.tipo}
                                                onChange={(e) =>
                                                    setData(
                                                        "tipo",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione la persona de
                                                    contacto...
                                                </option>
                                                <option value="T">
                                                    Titular
                                                </option>
                                                <option value="A">
                                                    Autorizado
                                                </option>
                                            </Form.Select>
                                            {errors.tipo && (
                                                <div className="alert alert-danger">
                                                    {errors.tipo}
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
                            >
                                Guardar registro
                            </Button>
                            <Button
                                className="m-3 shadow"
                                variant="secondary"
                                href={"/editarCliente/" + cliente.id}
                                aria-label="Volver a la vista anterior"
                            >
                                Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        </>
    );
}
