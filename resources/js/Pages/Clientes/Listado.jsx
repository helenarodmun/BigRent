import { usePage, Link } from "@inertiajs/react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import TablaClientes from "../../components/clientes/TablaClientes";
import MensajesFlash from "../../components/partials/MensajesFlash";
import NavBar from "../../components/partials/NavBar";

export default function Index() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <MensajesFlash></MensajesFlash>
                <TablaClientes></TablaClientes>
            </div>
        </>
    );
}
