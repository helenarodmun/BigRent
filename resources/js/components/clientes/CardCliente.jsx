import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Card,
    Col,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";

export default function CardCliente({ children }) {
    const { cliente, flash, tipo } = usePage().props;
    // useForm es un helper diseñado para formularios
    const { data } = useForm({
        nombre_fiscal: cliente.nombre_fiscal,
        nif: cliente.nif,
        nombre_comercial: cliente.nombre_comercial,
        tipo_cliente: tipo.tipo,
        administrador: cliente.administrador,
        dni_administrador: cliente.dni_administrador,
        url_escrituras: cliente.url_escrituras,
        url_dni_administrador: cliente.url_dni_administrador,
        url_cif: cliente.url_cif,
        anotaciones: cliente.anotaciones,
    });
    //se guarda en una variable de estado el id del cliente, que se establecer´`a cuando el usuario haga clic en el icono de la papelera
    const [clienteId, setClienteId] = useState(null);
    return (
        <div>
              <div align="center">
            <Col sm={10}>
                {flash.creacion && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.creacion}
                    </div>
                )}
            </Col>
        </div>
            <p className="h3 m-3 mb-0">Ficha cliente</p>
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-warning bg-opacity-50">
                            <Card.Title>
                                <p className="h3 m-0">
                                    <small className="ms-2">
                                        <small>{cliente.id} - </small>
                                    </small>
                                    {data.nombre_fiscal}
                                </p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="NIF"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="numero de identificación fiscal"
                                                name="nif"
                                                value={data.nif}
                                                disabled
                                                readonly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="NOMBRE COMERCIAL"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="nombre comercial"
                                                name="nombre_comercial"
                                                value={data.nombre_comercial}
                                                disabled
                                                readonly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <FloatingLabel
                                            label="ADMINISTRADOR"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="Administrador de la empresa"
                                                name="administrador"
                                                value={data.administrador}
                                                disabled
                                                readonly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="NIF"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="dni del administrador"
                                                name="dni_administrador"
                                                value={data.dni_administrador}
                                                disabled
                                                readonly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={4}>
                                        <FloatingLabel
                                            label="TIPO"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="tipo de cliente"
                                                name="tipo_cliente"
                                                value={data.tipo_cliente}
                                                disabled
                                                readonly
                                            ></Form.Control>
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={12}>
                                        <FloatingLabel
                                            label="OBSERVACIONES"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                value={data.anotaciones}
                                                disabled
                                            ></Form.Control>
                                        </FloatingLabel>
                                    </Col>
                                    <p className="h4">Documentación</p>
                                    <Col sm={4}>
                                        <Form.Label>Escrituras:</Form.Label>
                                        <Form.Control
                                            aria-label="url escrituras"
                                            name="url_escrituras"
                                            value={data.url_escrituras}
                                            disabled
                                            readonly
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>
                                            DNI Administrador:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label="url dni administrador"
                                            name="url_dni_administrador"
                                            value={data.url_dni_administrador}
                                            disabled
                                            readonly
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Label>
                                            CIF de la empresa:
                                        </Form.Label>
                                        <Form.Control
                                            aria-label=" url_cif"
                                            name="url_cif"
                                            value={data.url_cif}
                                            disabled
                                            readonly
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                size="lg"
                                type="submit"
                                className="m-3 shadow"
                                variant="primary"
                                method="get"
                                href={"/editarCliente/" + cliente.id}
                                aria-label="Modificar los datos del cliente"
                            >
                                {" "}
                                Editar cliente
                            </Button>
                            <Button
                                size="lg"
                                className="m-3 shadow"
                                variant="secondary"
                                href={"/clientes"}
                                aria-label="Volver a la vista anterior"
                            >
                                Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                    <div class="d-grid gap-2">  
            <Button variant="btn btn-outline-warning btn-lg m-5" method='get' href={"/nuevoContrato/" + cliente.id}><strong>Contratar alquiler</strong></Button>
            </div>
                </Col>
            </Row>
        </div>
    );
}
