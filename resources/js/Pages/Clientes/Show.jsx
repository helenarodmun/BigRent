import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, FormControl } from "react-bootstrap";

export default function Update(props) {
    
    const { clientes } = usePage().props;

    // useForm es un helper diseñado para formularios
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        nombre_fiscal: clientes.nombre_fiscal,
        nif: clientes.nif,
        nombre_comercial: clientes.nombre_comercial,
        tipo: clientes.tipo,
        administrador: clientes.administrador,
        dni_administrador: clientes.dni_administrador,
        url_escrituras: clientes.url_escrituras,
        url_dni_administrador: clientes.url_dni_administrador,
        url_cif: clientes.url_cif,
        anotaciones: clientes.anotaciones
    });

    return (
        <>
            <Container className="align-items-center justify-content-center accesibilidad-texto">
                {/* {flash.message && (
          <div class="alert">{flash.message}</div>
        )}
        {children} */}
                <Row className="shadow">
                    <Col sm={8} className="mt-3 pt-3 shadow p-3 ">
                        <Card className="shadow">
                            <Card.Header>
                                <Card.Title>
                                    <p className="h2">{data.nombre_fiscal}</p>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>

                                    <Form.Group>
                                        <Form.Label>NIF:</Form.Label>
                                        <Form.Control
                                            aria-label="numero de identificación fiscal"
                                            type="text"
                                            name="nif"
                                            placeholder="Introduce el número de identificación fiscal"
                                            value={data.nif}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Nombre Comercial:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label="nombre comercial"
                                            type="text"
                                            name="nombre_comercial"
                                            placeholder="Introduce el nombre comercial"
                                            value={data.nombre_comercial}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Administrador:</Form.Label>
                                        <Form.Control
                                            aria-label="Administrador de la empresa"
                                            type="text"
                                            name="administrador"
                                            placeholder="Introduce el nombre del administrador de la empresa"
                                            value={data.administrador}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            DNI Administrador:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label="dni del administrador"
                                            type="text"
                                            name="dni_administrador"
                                            placeholder="Introduce el DNI del administrador de la empresa"
                                            value={data.dni_administrador}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Tipo de cliente:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label="tipo de cliente"
                                            type="text"
                                            name="tipo"
                                            value={data.tipo}
                                            disabled
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    <p className="h3">Documentación</p>
                                    <Form.Group>
                                        <Form.Label>Escrituras:</Form.Label>
                                        <Form.Control
                                            aria-label="url escrituras"
                                            type="text"
                                            name="url_escrituras"
                                            placeholder=""
                                            value={data.url_escrituras}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            DNI Administrador:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label="url dni administrador"
                                            type="text"
                                            name="url_dni_administrador"
                                            placeholder=""
                                            value={data.url_dni_administrador}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            CIF de la empresa:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label=" url_cif"
                                            type="text"
                                            name="url_cif"
                                            placeholder=""
                                            value={data.url_cif}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Observaciones:
                                        </Form.Label>
                                        <Form.Control as='textarea' rows={5} disabled ></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    type="submit"
                                    className='m-3 shadow'
                                    variant="warning"
                                    size='lg'
                                    method='get'
                                    href={"/editarCliente/"+ clientes.id}
                                    aria-label="Modificar los datos del cliente"
                                > Editar cliente
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
