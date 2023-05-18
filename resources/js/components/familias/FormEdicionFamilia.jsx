import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function FormNuevaFamilia({ children }) {
    const { familia, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        id: familia.id,
        nombre: familia.nombre,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        put(
            "/editarFamilia/" + familia.id,
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
                <FlashMessage success={flash.success} error={flash.error} />
                <Col className="">
                    <Card className="shadow rounded">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 mt-3 ms-3 mb-0">Editar familia</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={3}>
                                        <FloatingLabel label="ID" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la familia" type="text" name="id" value={data.id} disabled />
                                            {errors.nombre && (<div className="alert alert-danger">{errors.nombre}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel label="NOMBRE" className="mb-2">
                                            <Form.Control size="sm" aria-label="nombre de la familia" type="text" name="nombre" value={data.nombre}
                                                onChange={(e) =>
                                                    setData("nombre", e.target.value)
                                                } />
                                            {errors.nombre && (<div className="alert alert-danger">{errors.nombre}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow btn-lg" variant="success" onClick={handleSubmit} aria-label="Guardar registro">Guardar registro</Button>
                            <Button className="m-3 shadow btn-lg" variant="secondary" href={"/familias"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
