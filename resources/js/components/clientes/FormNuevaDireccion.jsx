import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaDireccion({ children }) {
    const { flash, cliente } = usePage().props;
    console.log(cliente);
    // Estado local para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        direccion: "",
        cp: "",
        localidad: "",
        municipio: "",
        provincia: "",
        predeterminada: "",
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        post(
            "/nuevaDireccion/" + cliente.id,
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
                                <p className="h2">
                                    Cliente {cliente.nombre_fiscal}
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="DIRECCIÓN"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="dirección"
                                                type="text"
                                                name="direccion"
                                                value={data.direccion}
                                                onChange={(
                                                    e // si cambia el valor se seteara el valor nuevo en el constructor
                                                ) =>
                                                    setData(
                                                        "direccion",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.direccion && (
                                                <div className="alert alert-danger">
                                                    {errors.direccion}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={2}>
                                        <FloatingLabel
                                            label="CÓDIGO POSTAL"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="codigo postal"
                                                type="text"
                                                name="cp"
                                                value={data.cp}
                                                onChange={(e) =>
                                                    setData(
                                                        "cp",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.cp && (
                                                <div className="alert alert-danger">
                                                    {errors.cp}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={6}>
                                        <FloatingLabel
                                            label="LOCALIDAD"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="localidad"
                                                type="text"
                                                name="localidad"
                                                value={data.localidad}
                                                onChange={(e) =>
                                                    setData(
                                                        "localidad",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.localidad && (
                                                <div className="alert alert-danger">
                                                    {errors.localidad}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={4}>
                                        <FloatingLabel
                                            label="MUNICIPIO"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="Municipio"
                                                type="text"
                                                name="municipio"
                                                value={data.municipio}
                                                onChange={(e) =>
                                                    setData(
                                                        "municipio",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.municipio && (
                                                <div className="alert alert-danger">
                                                    {errors.municipio}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="PROVINCIA"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                aria-label="provincia"
                                                type="text"
                                                name="provincia"
                                                value={data.provincia}
                                                onChange={(e) =>
                                                    setData(
                                                        "provincia",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.provincia && (
                                                <div className="alert alert-danger">
                                                    {errors.provincia}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="TIPO DIRECCIÓN"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                aria-label="tipo de dirección"
                                                as="select"
                                                name="predeterminada"
                                                value={data.predeterminada}
                                                onChange={(e) =>
                                                    setData(
                                                        "predeterminada",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione tipo de
                                                    dirección...
                                                </option>
                                                <option value="1">
                                                    Dirección de la empresa
                                                </option>
                                                <option value="0">
                                                    Dirección del alquiler
                                                </option>
                                            </Form.Select>
                                            {errors.predeterminada && (
                                                <div className="alert alert-danger">
                                                    {errors.predeterminada}
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
                                aria-label="Guardar nueva direccion"
                            >
                                {isSubmitting
                                    ? "Guardando..."
                                    : "Guardar dirección"}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </div>
        </>
    );
}
