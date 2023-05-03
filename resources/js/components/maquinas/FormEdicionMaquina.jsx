import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormEdicionMaquina({ children }) {
    const { maquina, subfamilias, marcas, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        id: maquina.id,
        descripcion: maquina.descripcion,
        referencia: maquina.referencia,
        url_manual: maquina.url_manual ,
        url_ficha: maquina.url_ficha ,
        url_imagen: maquina.url_imagen ,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        put(
            "/editarMaquina/" + maquina.id,
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
                <Col className="">
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 mt-3 ms-3 mb-0">Editar máquina</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs="12" sm="6" md="1">
                                        <FloatingLabel label="ID" className="mb-2">
                                            <Form.Control size="sm" aria-label="id de la familia" type="text" name="id" value={data.id} disabled />
                                            {errors.id && (<div className="alert alert-danger">{errors.id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="REFERENCIA" className="mb-2">
                                            <Form.Control size="sm" aria-label="referencia de la máquina" type="text" name="referencia" value={data.referencia}
                                                onChange={(e) =>
                                                    setData("referencia", e.target.value)
                                                } />
                                            {errors.referencia && (<div className="alert alert-danger">{errors.referencia}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="9">
                                        <FloatingLabel label="ARTÍCULO" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción del artículo" type="text" name="descripcion" value={data.descripcion}
                                                onChange={(e) =>
                                                    setData("descripcion", e.target.value)
                                                } />
                                            {errors.descripcion && (<div className="alert alert-danger">{errors.descripcion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Manual:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="manual de la máquina" type="file" name="url_manual"
                                            onChange={(e) =>
                                                setData("url_manual", e.target.files[0])
                                            } />
                                        {errors.url_manual && (<div className="alert alert-danger">{errors.url_manual}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Ficha:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="ficha de la máquina" type="file" name="url_ficha" 
                                            onChange={(e) =>
                                                setData("url_ficha", e.target.files[0])
                                            } />
                                        {errors.url_ficha && (<div className="alert alert-danger">{errors.url_ficha}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="imagen de la máquina" type="file" name="url_imagen"
                                            onChange={(e) =>
                                                setData("url_imagen", e.target.files[0])
                                            } />
                                        {errors.url_imagen && (<div className="alert alert-danger">{errors.url_imagen}</div>)}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow" variant="success" onClick={handleSubmit} aria-label="Guardar registro">Guardar registro</Button>
                            <Button className="m-3 shadow" variant="secondary" href={"/maquinas"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
