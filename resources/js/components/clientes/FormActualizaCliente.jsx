import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";

export default function FormActualizaCliente({ children }) {
    const { clientes, flash } = usePage().props;
    // Estado local para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    // useForm es un helper diseñado para formularios
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        nombre_fiscal: clientes.nombre_fiscal,
        nif: clientes.nif,
        nombre_comercial: clientes.nombre_comercial,
        tipo: clientes.tipo,
        administrador: clientes.administrador,
        dni_administrador: clientes.dni_administrador,
        url_escrituras: clientes.url_escrituras,
        url_dni_administrador: clientes.url_dni_administrador,
        url_cif: clientes.url_cif,
        anotaciones: clientes.anotaciones,
    });
    // Función que se ejecuta cuando se envía el formulario
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        put(
            `/editarCliente/${clientes.id}`,
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );
        setIsSubmitting(false);
    }
    // Función para manejar la eliminación del cliente
    function handleSubmitDelete(e) {
        e.preventDefault();
        setIsSubmitting(true);
        // Llamar a la función delete() para enviar una solicitud DELETE al servidor y eliminar el cliente
        destroy(
            `/eliminarCliente/${clientes.id}`,
            {
                onSuccess: () => {
                    console.log(data);
                },
            },
            data
        );
        setIsSubmitting(false);
    }
    return (
        <>
            {flash.message && <div className="alert">{flash.message}</div>}
            {children}
            <Col>
                <Card className="shadow">
                    <Card.Header>
                        <Card.Title>
                            <p className="h2"> Cliente {clientes.id}</p>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="align-items-center">
                                <Col sm={12}>
                                    <FloatingLabel
                                        label="NOMBRE FISCAL"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            aria-label="nombre fiscal"
                                            type="text"
                                            name="nombre_fiscal"
                                            placeholder="Introduce el nombre fiscal"
                                            value={data.nombre_fiscal}
                                            onChange={(
                                                e // si cambia el valor se seteara el valor nuevo en el constructor
                                            ) =>
                                                setData(
                                                    "nombre_fiscal",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.nombre_fiscal && (
                                            <div className="alert alert-danger">
                                                {errors.nombre_fiscal}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={4}>
                                    <FloatingLabel
                                        label="NUM IDENTIFICACIÓN FISCAL"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            aria-label="numero de identificación fiscal"
                                            type="text"
                                            name="nif"
                                            placeholder="Introduce el número de identificación fiscal"
                                            value={data.nif}
                                            onChange={(e) =>
                                                setData("nif", e.target.value)
                                            }
                                        />
                                        {errors.nif && (
                                            <div className="alert alert-danger">
                                                {errors.nif}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={8}>
                                    <FloatingLabel
                                        label="NOMBRE COMERCIAL"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            aria-label="nombre comercial"
                                            type="text"
                                            name="nombre_comercial"
                                            placeholder="Introduce el nombre comercial"
                                            value={data.nombre_comercial}
                                            onChange={(e) =>
                                                setData(
                                                    "nombre_comercial",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.nombre_comercial && (
                                            <div className="alert alert-danger">
                                                {errors.nombre_comercial}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={9}>
                                    <FloatingLabel
                                        label="ADMINISTRADOR"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            aria-label="Administrador de la empresa"
                                            type="text"
                                            name="administrador"
                                            placeholder="Introduce el nombre del administrador de la empresa"
                                            value={data.administrador}
                                            onChange={(e) =>
                                                setData(
                                                    "administrador",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.administrador && (
                                            <div className="alert alert-danger">
                                                {errors.administrador}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={3}>
                                    <FloatingLabel label="NIF" className="mb-3">
                                        <Form.Control
                                            aria-label="dni del administrador"
                                            type="text"
                                            name="dni_administrador"
                                            placeholder="Introduce el DNI del administrador de la empresa"
                                            value={data.dni_administrador}
                                            onChange={(e) =>
                                                setData(
                                                    "dni_administrador",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.dni_administrador && (
                                            <div className="alert alert-danger">
                                                {errors.dni_administrador}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={5}>
                                    <FloatingLabel
                                        label="TIPO"
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            aria-label="tipo de cliente"
                                            as="select"
                                            name="tipo"
                                            value={data.tipo}
                                            onChange={(e) =>
                                                setData("tipo", e.target.value)
                                            }
                                        >
                                            <option disabled>
                                                Escoja el tipo de cliente ...
                                            </option>
                                            <option></option>
                                            <option value="Empresa">
                                                Empresa
                                            </option>
                                            <option value="Autónomo/Particular">
                                                Autónomo/Particular
                                            </option>
                                            <option value="Organismo/Institución">
                                                Organismo/Institución
                                            </option>
                                            <option value="Asociación">
                                                Asociación
                                            </option>
                                        </Form.Select>
                                        {errors.tipo && (
                                            <div className="alert alert-danger">
                                                {errors.tipo}
                                            </div>
                                        )}
                                    </FloatingLabel>
                                </Col>
                                <Col sm={12}>
                                    <FloatingLabel
                                        label="OBSERVACIONES"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            aria-label=" url_cif"
                                            name="anotaciones"
                                            placeholder=""
                                            value={data.anotaciones}
                                            onChange={(e) =>
                                                setData(
                                                    "anotaciones",
                                                    e.target.value
                                                )
                                            }
                                        ></Form.Control>
                                    </FloatingLabel>
                                </Col>
                                <p className="h3">Documentación</p>
                                <Col sm={6}>
                                    <Form.Label>Escrituras:</Form.Label>
                                    <Form.Control
                                        aria-label="url escrituras"
                                        type="file"
                                        size="sm"
                                        name="url_escrituras"
                                        placeholder=""
                                        value={data.url_escrituras}
                                        onChange={(e) =>
                                            setData(
                                                "url_escrituras",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.url_escrituras && (
                                        <div className="alert alert-danger">
                                            {errors.url_escrituras}
                                        </div>
                                    )}
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>DNI Administrador:</Form.Label>
                                    <Form.Control
                                        aria-label="url dni administrador"
                                        type="file"
                                        size="sm"
                                        name="url_dni_administrador"
                                        placeholder=""
                                        value={data.url_dni_administrador}
                                        onChange={(e) =>
                                            setData(
                                                "url_dni_administrador",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.url_dni_administrador && (
                                        <div className="alert alert-danger">
                                            {errors.url_dni_administrador}
                                        </div>
                                    )}
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>CIF de la empresa:</Form.Label>
                                    <Form.Control
                                        aria-label=" url_cif"
                                        type="file"
                                        size="sm"
                                        name="url_cif"
                                        placeholder=""
                                        value={data.url_cif}
                                        onChange={(e) =>
                                            setData("url_cif", e.target.value)
                                        }
                                    />
                                    {errors.url_cif && (
                                        <div className="alert alert-danger">
                                            {errors.url_cif}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className="m-3 shadow"
                            variant="primary"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            aria-label="Modificar los datos del cliente"
                        >
                            {isSubmitting ? "Guardando..." : "Guardar cambios"}
                        </Button>
                        <Button
                            className="m-3 shadow"
                            type="submit"
                            variant="danger"
                            disabled={isSubmitting}
                            aria-label="Eliminar los datos del cliente"
                            onClick={handleSubmitDelete}
                        >
                            {isSubmitting
                                ? "Eliminando..."
                                : "Eliminar registro"}
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    );
}
