import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { Row, Col, Form, Button, Card, FloatingLabel, Container } from "react-bootstrap";

export default function FormEdicionMaquina({ children }) {
    const { serie, flash } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, put, processing, errors } = useForm({
        id: serie.id,
        horometro: serie.horometro,
        hora_inicio: serie.hora_inicio,
        numero_serie: serie.numero_serie,
        disponible: serie.disponible
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        put(
            "/editarSerie/" + serie.id,
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
                                    Editar serie
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row> 
                                <Col xs="12" sm="6" md="1">
                                        <FloatingLabel
                                            label="ID"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="id de la serie"
                                                type="text"
                                                name="id"
                                                value={data.id}
                                                disabled
                                            />
                                            {errors.id && (
                                                <div className="alert alert-danger">
                                                    {errors.id}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>                                   
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel
                                            label="NUMERO SERIE"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="numero de serie"
                                                type="text"
                                                name="numero_serie"
                                                value={data.numero_serie}
                                                onChange={(e) =>
                                                    setData(
                                                        "numero_serie",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.numero_serie && (
                                                <div className="alert alert-danger">
                                                    {errors.numero_serie}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                    <FloatingLabel
                                            label="HOROMETRO"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                aria-label="incluye horometro"
                                                as="select"
                                                name="horometro"
                                                value={data.horometro}
                                                onChange={(e) =>
                                                    setData(
                                                        "horometro",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione opción:
                                                </option>
                                                <option value="1">
                                                    Incluido
                                                </option>
                                                <option value="0">
                                                    NO incluido
                                                </option>
                                            </Form.Select>
                                            {errors.horometro && (
                                                <div className="alert alert-danger">
                                                    {errors.horometro}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="12" sm="6" md="4">
                                    <FloatingLabel
                                            label="DISPONIBILIDAD"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                aria-label="Dispònibilidad de la máuqina"
                                                as="select"
                                                name="disponible"
                                                value={data.disponible}
                                                onChange={(e) =>
                                                    setData(
                                                        "disponible",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione la opción:
                                                </option>
                                                <option value="1">
                                                    Disponible
                                                </option>
                                                <option value="0">
                                                    NO disponible
                                                </option>
                                            </Form.Select>
                                            {errors.disponible && (
                                                <div className="alert alert-danger">
                                                    {errors.disponible}
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
                                aria-label="Guardar registro"
                            >
                                Guardar registro
                            </Button>
                            <Button
                                className="m-3 shadow"
                                variant="secondary"
                                href={"/series"}
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
