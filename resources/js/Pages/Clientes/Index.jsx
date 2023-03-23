import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import TablaClientes from "../../components/clientes/TablaClientes";

export default function Index() {
    return (
        <>
            <Container>
                <TablaClientes></TablaClientes>
            </Container>
        </>
    );
}
