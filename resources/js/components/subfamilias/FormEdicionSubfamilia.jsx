import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormNuevaSubFamilia({ children }) {
    const { subfamilia, flash } = usePage().props;
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
                <div align="center">
                    <Col sm={10}>
                        {flash.errorCreacion && (
                            <div class="alert alert-danger" role={"alert"}>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" ><span aria-hidden="true">&times;</span></button>{flash.errorCreacion}
                            </div>)}
                    </Col>
                </div>
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
                                    <Col sm={3}>
                                        <FloatingLabel label="ID" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la familia" type="text" name="id" value={data.id} disabled />
                                            {errors.id && (<div className="alert alert-danger">{errors.id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel label="DESCRIPCIÓN" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción de la subfamilia" type="text" name="descripcion" value={data.descripcion}
                                                onChange={(e) => setData("descripcion", e.target.value)
                                                } />
                                            {errors.descripcion && (<div className="alert alert-danger">{errors.descripcion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel label="PRECIO POR DÍA" className="mb-2">
                                            <Form.Control size="sm" aria-label="precio de alquiler por día" type="text" name="precio_dia" value={data.precio_dia}
                                                onChange={(e) => setData("precio_dia", e.target.value)
                                                } />
                                            {errors.precio_dia && (<div className="alert alert-danger">{errors.precio_dia}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
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
                            <Button className="m-3 shadow" variant="success" onClick={handleSubmit} aria-label="Guardar registro">Guardar registro</Button>
                            <Button className="m-3 shadow" variant="secondary" href={"/familias"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
