import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import TablaClientes from "../../components/clientes/TablaClientes";
import NavBar from "../../components/partials/NavBar";

export default function Index() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <TablaClientes></TablaClientes>
            </div>
        </>
    );
}
