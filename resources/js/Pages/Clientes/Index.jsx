import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import TablaClientes from "../../components/clientes/TablaClientes";

export default function Index() {
    return (
        <>
            <Container>
            <p className="h1 mt-3">Listado clientes</p>
                <TablaClientes></TablaClientes>
            </Container>
        </>
    );
}
