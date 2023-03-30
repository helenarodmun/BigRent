import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormNuevaFamilia({ children }) {
    const { flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        nombre: "",
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        post(
            "/nuevaFamilia/",
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
                <div align="center">
                    <Col sm={10}>
                        {flash.errorCreacion && (
                            <div class="alert alert-danger" role={"alert"}>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {flash.errorCreacion}
                            </div>
                        )}
                    </Col>
                </div>
                <Col className="">
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 mt-3 ms-3 mb-0">
                                    Creación de nueva familia
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="NOMBRE"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="nombre de la familia"
                                                type="text"
                                                name="nombre"
                                                value={data.nombre}
                                                onChange={(e) =>
                                                    setData(
                                                        "nombre",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.nombre && (
                                                <div className="alert alert-danger">
                                                    {errors.nombre}
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
                                aria-label="Guardar nueva familia"
                            >
                                Guardar registro
                            </Button>
                            <Button
                                className="m-3 shadow"
                                variant="secondary"
                                href={"/familias"}
                                aria-label="Volver a la vista anterior"
                            >
                                Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
