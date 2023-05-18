import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container, } from "react-bootstrap";
import FlashMessage from "../partials/FlashMessage";

export default function FormNuevaSubFamilia({ children }) {
    const { flash, familias } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        descripcion: "",
        precio_dia: "",
        fianza: "",
        familia_id: ""
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        post(
            "/nuevaSubfamilia",
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
                                <p className="h3 mt-3 ms-3 mb-0">Creación de nueva subfamilia</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="FAMILIA" className="mb-2">
                                            <Form.Select size="sm" aria-label="familia" as="select" name="familia_id" value={data.familia_id}
                                                onChange={(e) => setData("familia_id", e.target.value)
                                                }>
                                                <option>Seleccione la familia...</option>
                                                {familias.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((familia) => (
                                                    <option key={familia.id} value={familia.id}>{familia.nombre}</option>
                                                ))}
                                            </Form.Select>{errors.familia_id && (<div className="alert alert-danger">{errors.familia_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="9">
                                        <FloatingLabel label="DESCRIPCIÓN" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción de la subfamilia" type="text" name="descripcion" value={data.descripcion}
                                                onChange={(e) => setData("descripcion", e.target.value)
                                                } />
                                            {errors.descripcion && (<div className="alert alert-danger">{errors.descripcion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="PRECIO / DÍA" className="mb-2">
                                            <Form.Control size="sm" aria-label="precio por día" type="number" min='1' name="precio_dia" value={data.precio_dia}
                                                onChange={(e) => setData("precio_dia", e.target.value)
                                                } />
                                            {errors.precio_dia && (<div className="alert alert-danger">{errors.precio_dia}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="IMPORTE FIANZA" className="mb-2">
                                            <Form.Control size="sm" aria-label="importe fianza" type="number" min='1'  name="fianza" value={data.fianza}
                                                onChange={(e) => setData("fianza", e.target.value)
                                                } />
                                            {errors.fianza && (<div className="alert alert-danger"> {errors.fianza}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow btn-lg" variant="success" onClick={handleSubmit} aria-label="Guardar nueva familia">Guardar registro</Button>
                            <Button className="m-3 shadow btn-lg" variant="secondary" href={"/subfamilias"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
