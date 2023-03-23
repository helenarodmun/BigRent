import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
    Table,
} from "react-bootstrap";

export default function CardCliente({ children }) {
    const { clientes, direcciones, telefonos, flash } = usePage().props;

    // useForm es un helper diseñado para formularios
    const { data } = useForm({
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
    //se guarda en una variable de estado el id del cliente, que se establecer´`a cuando el usuario haga clic en el icono de la papellera
    const [clienteId, setClienteId] = useState(null);
    return (
        <Container>
            {flash.message && <div class="alert">{flash.message}</div>}
            {children}
            
            <p className="h3 m-3 mb-0">Ficha cliente</p>
            <Row>
                <Col sm={10} >
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title>
                                <p className="h3 m-0" ><small className="ms-2"><small>{clientes.id} - </small></small>{data.nombre_fiscal}</p>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="align-items-center">
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="número de identificación fiscal"
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
                                    <Col sm={3}>
                                        <FloatingLabel
                                            label="TIPO"
                                            className="mb-2"
                                        >
                                            <Form.Control
                                                aria-label="tipo de cliente"
                                                name="tipo"
                                                value={data.tipo}
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
                            <Container>
                                <Col sm={12} className="mt-3 pt-3 shadow p-3 ">
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        className="shadow"
                                        size="sm"
                                        responsive
                                    >
                                        <thead>
                                            <tr>
                                                <th>Dirección</th>
                                                <th>Localidad</th>
                                                <th>Código Postal</th>
                                                <th>Municipio</th>
                                                <th>Provincia</th>
                                                <th>
                                                    Dirección predeterminada
                                                </th>
                                            </tr>
                                        </thead>
                                        {direcciones.map((direcciones) => (
                                            <tbody>
                                                <tr key={direcciones.id}>
                                                    <td>
                                                        {direcciones.direccion}
                                                    </td>
                                                    <td>
                                                        {direcciones.localidad}
                                                    </td>
                                                    <td>{direcciones.cp}</td>
                                                    <td>
                                                        {direcciones.municipio}
                                                    </td>
                                                    <td>
                                                        {direcciones.provincia}
                                                    </td>
                                                    {direcciones.predeterminada ==
                                                    0 ? (
                                                        <td>No</td>
                                                    ) : (
                                                        <td>Sí</td>
                                                    )}
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>
                                </Col>
                                <Col sm={12} className="mt-3 pt-3 shadow p-3 ">
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        className="shadow"
                                        responsive
                                    >
                                        <thead>
                                            <tr>
                                                <th>Telefono</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        {telefonos.map((telefonos) => (
                                            <tbody>
                                                <tr key={telefonos.id}>
                                                    <td>
                                                        {telefonos.telefono}
                                                    </td>
                                                    <td>{telefonos.email}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>
                                </Col>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                            size='lg'
                                type="submit"
                                className="m-3 shadow"
                                variant="primary"
                                method="get"
                                href={"/editarCliente/" + clientes.id}
                                aria-label="Modificar los datos del cliente"
                            >
                                {" "}
                                Editar cliente
                            </Button>
                            <Button
                            size='lg'
                                className="m-3 shadow"
                                variant="secondary"
                                href={'/clientes'}
                                aria-label="Volver a la vista anterior"
                            >Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
