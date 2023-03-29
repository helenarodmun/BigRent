import { usePage } from "@inertiajs/react";
import React from "react";
import { Col, Container } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";
import MensajesFlash from "../../components/partials/MensajesFlash";
import NavBar from "../../components/partials/NavBar";

export default function FichaCliente() {
    const { flash } = usePage().props;

    return (
        <>
            <NavBar></NavBar>
            <MensajesFlash></MensajesFlash>
            <div className="update-container">
                <Container fluid className="form-container">
                    <CardCliente />
                </Container>
                <Container fluid className="tables-container">
                    <div className="table-container">
                        <TablaDirecciones></TablaDirecciones>
                    </div>
                    <div className="table-container">
                        <TablaTelefonos></TablaTelefonos>
                    </div>
                </Container>
            </div>
        </>
    );
}
