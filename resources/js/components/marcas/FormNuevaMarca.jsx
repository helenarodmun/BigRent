import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function FormNuevaMarca({ children }) {
    const { flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        denominacion: "",
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        post(
            "/nuevaMarca",
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
                                <p className="h3 mt-3 ms-3 mb-0">Creación de nueva marca</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={3}>
                                        <FloatingLabel label="NOMBRE" className="mb-2">
                                            <Form.Control size="sm" aria-label="nombre de la marca" type="text" name="denominacion" value={data.denominacion}
                                                onChange={(e) =>
                                                    setData("denominacion", e.target.value)
                                                } />
                                            {errors.denominacion && (<div className="alert alert-danger">{errors.denominacion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow btn-lg" variant="success" onClick={handleSubmit} aria-label="Guardar nueva marca">Guardar registro</Button>
                            <Button className="m-3 shadow btn-lg" variant="secondary" href={"/marcas"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
