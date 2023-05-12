import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormEdicionMaquina({ children }) {
    const { maquina, subfamilias, marcas, flash } = usePage().props;
    console.log(maquina)
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        id: maquina.id,
        descripcion: maquina.descripcion,
        referencia: maquina.referencia,
        url_manual: null,
        url_ficha: null,
        url_imagen: null,
        subfamilia_id: maquina.subfamilia_id,
        marca_id: maquina.marca_id
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();// Evita que se envíe el formulario de manera convencional
        const formData = new FormData();// Crea un objeto FormData para enviar los datos del formulario
        // Agrega los campos correspondientes al formData con el valor de data
        formData.append('id', data.id);
        formData.append('descripcion', data.descripcion);
        formData.append('referencia', data.referencia);

        // Verificar si se ha seleccionado un archivo para cada campo y agregarlo al formData
        // Si se ha seleccionado un archivo, se agrega al formData, si no se agrega el valor existente de maquina al formData
        if (data.url_manual) {
            formData.append('url_manual', data.url_manual);
        } else {
            formData.append('url_manual', maquina.url_manual);
        }
        if (data.url_ficha) {
            formData.append('url_ficha', data.url_ficha);
        } else {
            formData.append('url_ficha', maquina.url_ficha);
        }
        if (data.url_imagen) {
            formData.append('url_imagen', data.url_imagen);
        } else {
            formData.append('url_imagen', maquina.url_imagen);
        }
        post(
            "/editarMaquina/" + maquina.id,// URL a la que se enviará la solicitud POST
            {
                onSuccess: () => {
                    console.log(formData);
                },
            },
            formData
        );
    }
    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
                <Col className="">
                    <Card className="shadow rounded">
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
                                        <Form.Control className="mb-2" size="sm" aria-label="ficha de la máquina" type="file" name="url_manual"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_manual", file ? file : maquina.url_manual);
                                            }}
                                        />
                                        {errors.url_manual && (<div className="alert alert-danger">{errors.url_manual}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Ficha:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="ficha de la máquina" type="file" name="url_ficha"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_ficha", file ? file : maquina.url_ficha);
                                            }} />
                                        {errors.url_ficha && (<div className="alert alert-danger">{errors.url_ficha}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="imagen de la máquina" type="file" name="url_imagen"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData("url_imagen", file ? file : maquina.url_imagen)
                                            }} />
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
