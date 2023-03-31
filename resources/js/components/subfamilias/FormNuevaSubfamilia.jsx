import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import {
    Row,
    Col,
    Form,
    Button,
    Card,
    FloatingLabel,
    Container,
} from "react-bootstrap";

export default function FormNuevaSubFamilia({ children }) {
    const { flash, familias } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data, setData, post, processing, errors } = useForm({
        descripcion: "",
        precio_semana: "",
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
                                    Creación de nueva subfamilia
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col xs="12" sm="6" md="2">
                                        <FloatingLabel
                                            label="FAMILIA"
                                            className="mb-2"
                                        >
                                            <Form.Select
                                                size="sm"
                                                aria-label="familia"
                                                as="select"
                                                name="familia_id"
                                                value={data.familia_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "familia_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Seleccione la familia...
                                                </option>
                                                {familias.map((familia) => (
                                              
                                                    <option value={familia.id}>
                                                        {familia.nombre}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.familia_id && (
                                                <div className="alert alert-danger">
                                                    {errors.familia_id}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="DESCRIPCIÓN"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="descripción de la subfamilia"
                                                type="text"
                                                name="descripcion"
                                                value={data.descripcion}
                                                onChange={(e) =>
                                                    setData(
                                                        "descripcion",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.descripcion && (
                                                <div className="alert alert-danger">
                                                    {errors.descripcion}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="PRECIO / SEMANA"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="precio por semana"
                                                type="number"
                                                name="precio_semana"
                                                value={data.nombprecio_semanare}
                                                onChange={(e) =>
                                                    setData(
                                                        "precio_semana",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.precio_semana && (
                                                <div className="alert alert-danger">
                                                    {errors.precio_semana}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="PRECIO / DÍA"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="precio por día"
                                                type="number"
                                                name="precio_dia"
                                                value={data.precio_dia}
                                                onChange={(e) =>
                                                    setData(
                                                        "precio_dia",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.precio_dia && (
                                                <div className="alert alert-danger">
                                                    {errors.precio_dia}
                                                </div>
                                            )}
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="IMPORTE FIANZA"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                size="sm"
                                                aria-label="importe fianza"
                                                type="number"
                                                name="fianza"
                                                value={data.fianza}
                                                onChange={(e) =>
                                                    setData(
                                                        "fianza",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.fianza && (
                                                <div className="alert alert-danger">
                                                    {errors.fianza}
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
                                href={"/subfamilias"}
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
