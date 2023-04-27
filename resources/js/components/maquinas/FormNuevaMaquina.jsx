import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {Row, Col, Form, Button, Card, FloatingLabel,  Container,} from "react-bootstrap";

export default function FormNuevaMaquina({ children }) {
    const { flash, subfamilias, familias, marcas } = usePage().props;    
    const [selectedFamiliaId, setSelectedFamiliaId] = useState(null); // nuevo estado para la familia seleccionada
    const subfamiliasFiltradas = subfamilias.filter(subfamilia => subfamilia.familia_id === selectedFamiliaId); // subfamilias filtradas por la familia seleccionada
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        marca: "",
        descripcion: "",
        referencia: "",
        url_manual: "",
        url_ficha: "",
        url_imagen:"",
        subfamilia_id: "",
        marca_id: ""
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        post(
            "/nuevaMaquina",
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
                                <p className="h3 mt-3 ms-3 mb-0">
                                    Creación de nueva máquina
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="FAMILIA" className="mb-2">
                                            <Form.Select size="sm" aria-label="familia" as="select" name="familia_id" value={selectedFamiliaId} // actualizado con el nuevo estado
                                                onChange={(e) => {
                                                    setData("familia_id", e.target.value);
                                                    setSelectedFamiliaId(parseInt(e.target.value)); // actualiza el nuevo estado
                                                  }}>
                                                <option>Seleccione la familia...</option>
                                                {familias.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((familia) => (                                              
                                                    <option value={familia.id}>{familia.nombre}</option>
                                                ))}
                                            </Form.Select>
                                            {errors.familia_id && (<div className="alert alert-danger"> {errors.familia_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="SUBFAMILIA" className="mb-2">
                                            <Form.Select size="sm" aria-label="subfamilia" as="select" name="subfamilia_id" value={data.subfamilia_id}
                                                onChange={(e) =>
                                                    setData("subfamilia_id", e.target.value)
                                                }>
                                                <option>Seleccione la subfamilia...</option>
                                                {subfamiliasFiltradas // muestra solo las subfamilias filtradas
                                                .sort((a, b) => a.descripcion.localeCompare(b.descripcion)).map((subfamilia) => (
                                              <option value={subfamilia.id}>{subfamilia.descripcion}</option>
                                                ))}
                                            </Form.Select>
                                            {errors.subfamilia_id && (<div className="alert alert-danger">{errors.subfamilia_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="3">
                                        <FloatingLabel label="MARCA" className="mb-2">
                                            <Form.Select size="sm" aria-label="marca" as="select" name="marca_id" value={data.marca_id}
                                                onChange={(e) =>
                                                    setData("marca_id", e.target.value)
                                                }>
                                                <option>Seleccione la marca...</option>
                                                {marcas.sort((a, b) => a.denominacion.localeCompare(b.denominacion)).map((marca) => (
                                              <option value={marca.id}>{marca.denominacion}</option>
                                                ))}
                                            </Form.Select>
                                            {errors.marca_id && (<div className="alert alert-danger">{errors.marca_id}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel label="REFERENCIA" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción de la subfamilia" type="text" name="referencia" value={data.referencia}
                                                onChange={(e) =>
                                                    setData("referencia", e.target.value)
                                                }/>
                                            {errors.referencia && (<div className="alert alert-danger">{errors.referencia}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="10">
                                        <FloatingLabel label="ARTÍCULO" className="mb-2">
                                            <Form.Control size="sm" aria-label="descripción de la máquina" type="text" name="descripcion" value={data.descripcion}
                                                onChange={(e) =>
                                                    setData("descripcion", e.target.value)
                                                }/>
                                            {errors.descripcion && (<div className="alert alert-danger">{errors.descripcion}</div>)}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Manual:</Form.Label>
                                        <Form.Control
                                         className="mb-2" size="sm" aria-label="manual de la máquina" type="file" name="url_manual" value={data.url_manual}
                                            onChange={(e) =>
                                                setData("url_manual", e.target.value)
                                            }/>
                                        {errors.url_manual && (<div className="alert alert-danger">{errors.url_manual}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Ficha:</Form.Label>
                                        <Form.Control className="mb-2" size="sm" aria-label="ficha de la máquina" type="file" name="url_ficha" value={data.url_ficha}
                                            onChange={(e) =>
                                                setData("url_ficha", e.target.value)
                                            }/>
                                        {errors.url_ficha && (<div className="alert alert-danger">{errors.url_ficha}</div>)}
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control className="mb-2"  size="sm" aria-label="imagen" type="file" name="url_imagen" value={data.url_imagen}
                                            onChange={(e) =>
                                                setData("url_imagen", e.target.value)
                                            }/>
                                        {errors.url_ficha && (<div className="alert alert-danger">{errors.url_imagen}</div>)}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button className="m-3 shadow" variant="success" onClick={handleSubmit} aria-label="Guardar nueva maquina">Guardar registro</Button>
                            <Button className="m-3 shadow" variant="secondary" href={"/maquinas"} aria-label="Volver a la vista anterior">Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Container>
        </>
    );
}
