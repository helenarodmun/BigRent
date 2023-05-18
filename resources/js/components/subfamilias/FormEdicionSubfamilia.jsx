import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function FormNuevaSubFamilia({ children }) {
    const { subfamilia, familia, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        id: subfamilia.id,
        descripcion: subfamilia.descripcion,
        precio_dia: subfamilia.precio_dia,
        fianza: subfamilia.fianza
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        put(
            "/editarSubfamilia/" + subfamilia.id,
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
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 mt-3 ms-3 mb-0">Editar subfamilia</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs="12" sm="6" md="1">
                                        <FloatingLabel label="ID" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la familia" type="text" name="id" value={data.id} disabled />                                           
                                        </FloatingLabel>
                                    </Col> <Col xs="12" sm="6" md="5">
                                        <FloatingLabel label="Família" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la familia" type="text" name="id" value={familia.nombre} disabled />                                           
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="6">
                                        <FloatingLabel label="DESCRIPCIÓN" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción de la subfamilia" type="text" name="descripcion" value={data.descripcion}
                                                onChange={(e) => setData("descripcion", e.target.value)
                                                } />
                                            {errors.descripcion && (<div className="alert alert-danger">{errors.descripcion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="PRECIO POR DÍA" className="mb-2">
                                            <Form.Control size="sm" aria-label="precio de alquiler por día" type="text" name="precio_dia" value={data.precio_dia}
                                                onChange={(e) => setData("precio_dia", e.target.value)
                                                } />
                                            {errors.precio_dia && (<div className="alert alert-danger">{errors.precio_dia}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="IMPORTE FIANZA" className="mb-2">
                                            <Form.Control size="sm" aria-label="dimporte de la fianza" type="text" name="fianza" value={data.fianza}
                                                onChange={(e) => setData("fianza", e.target.value)
                                                } />
                                            {errors.fianza && (<div className="alert alert-danger">{errors.fianza}</div>)}
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
