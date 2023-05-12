import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormNuevaMarca({ children }) {
    const { marca, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        id: marca.id,
        denominacion: marca.denominacion,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        put(
            "/editarMarca/" + marca.id,
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
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>{flash.errorCreacion}
                            </div>)}
                    </Col>
                </div>
                <Col className="">
                    <Card className="shadow rounded">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 mt-3 ms-3 mb-0"> Editar marca</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col sm={3}>
                                        <FloatingLabel label="ID" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la marca" type="text" name="id" value={data.id} disabled />
                                            {errors.id && (<div className="alert alert-danger">{errors.id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel label="NOMBRE" className="mb-2">
                                            <Form.Control size="sm" aria-label="nombre de la marca" type="text" name="denominacion" value={data.denominacion}
                                                onChange={(e) => setData("denominacion", e.target.value)} />
                                            {errors.denominacion && (<div className="alert alert-danger">{errors.denominacion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow" variant="success" onClick={handleSubmit} aria-label="Guardar registro" >Guardar registro</Button>
                            <Button className="m-3 shadow" variant="secondary" href={"/marcas"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
