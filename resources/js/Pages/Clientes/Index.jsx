import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";


export default function Index() {
    const { clientes } = usePage().props;
    function myDate(fechaHora) {
        return dayjs(fechaHora).locale("es").format("DD MMMM YYYY - HH:mm:ss");
    }

    return (
        <>
            <Container className="accesibilidad-texto">
                {/* {flash.viaje && (
                    <div class="alert alert-success" role={"alert"}>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {flash.cliente}
                    </div>
                )} */}
                <Row>
                    <h1 className="m-5">Empresas</h1>
                    {clientes.map((cliente) => (
                        <Col
                            key={cliente.id}
                            md={6}
                            className="mt-3 pt-3 shadow  p-3 "
                        >
                            <Card className="shadow">
                                <Card.Header className="h3">
                                    Nombre Fiscal: {cliente.nombre_fiscal}
                                    <br />
                                    Nombre comercial: {cliente.nombre_comercial}
                                </Card.Header>
                                <Card.Body>
                                    <span>
                                        Nif: {cliente.nif}
                                    </span>
                                    <br />
                                    <span>
                                        Aministrador: {cliente.administrador}
                                    </span>
                                    <br />
                                    <span>                                       
                                        DNI Administrador: {cliente.dni_administrador}
                                    </span>
                                    <br />
                                    <Button
                                        size="lg"
                                        className="btn btn-success  m-3 shadow"
                                        href={"/update/" + cliente.id}
                                    >
                                        Modifica el viaje
                                    </Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                  
                                    Fecha de creación:{" "}
                                   
                                    {" - "}
                                    {myDate(cliente.updated_at)}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}